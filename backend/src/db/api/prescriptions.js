const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PrescriptionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const prescriptions = await db.prescriptions.create(
      {
        id: data.id || undefined,

        prescription_code: data.prescription_code || null,
        issue_date: data.issue_date || null,
        expiry_date: data.expiry_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await prescriptions.setPharmacist(data.pharmacist || null, {
      transaction,
    });

    await prescriptions.setPatient_record(data.patient_record || null, {
      transaction,
    });

    await prescriptions.setOrganizations(data.organizations || null, {
      transaction,
    });

    return prescriptions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const prescriptionsData = data.map((item, index) => ({
      id: item.id || undefined,

      prescription_code: item.prescription_code || null,
      issue_date: item.issue_date || null,
      expiry_date: item.expiry_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const prescriptions = await db.prescriptions.bulkCreate(prescriptionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return prescriptions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const prescriptions = await db.prescriptions.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.prescription_code !== undefined)
      updatePayload.prescription_code = data.prescription_code;

    if (data.issue_date !== undefined)
      updatePayload.issue_date = data.issue_date;

    if (data.expiry_date !== undefined)
      updatePayload.expiry_date = data.expiry_date;

    updatePayload.updatedById = currentUser.id;

    await prescriptions.update(updatePayload, { transaction });

    if (data.pharmacist !== undefined) {
      await prescriptions.setPharmacist(
        data.pharmacist,

        { transaction },
      );
    }

    if (data.patient_record !== undefined) {
      await prescriptions.setPatient_record(
        data.patient_record,

        { transaction },
      );
    }

    if (data.organizations !== undefined) {
      await prescriptions.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    return prescriptions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const prescriptions = await db.prescriptions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of prescriptions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of prescriptions) {
        await record.destroy({ transaction });
      }
    });

    return prescriptions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const prescriptions = await db.prescriptions.findByPk(id, options);

    await prescriptions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await prescriptions.destroy({
      transaction,
    });

    return prescriptions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const prescriptions = await db.prescriptions.findOne(
      { where },
      { transaction },
    );

    if (!prescriptions) {
      return prescriptions;
    }

    const output = prescriptions.get({ plain: true });

    output.pharmacist = await prescriptions.getPharmacist({
      transaction,
    });

    output.patient_record = await prescriptions.getPatient_record({
      transaction,
    });

    output.organizations = await prescriptions.getOrganizations({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userOrganizations = (user && user.organizations?.id) || null;

    if (userOrganizations) {
      if (options?.currentUser?.organizationsId) {
        where.organizationsId = options.currentUser.organizationsId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.pharmacists,
        as: 'pharmacist',

        where: filter.pharmacist
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.pharmacist
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  name: {
                    [Op.or]: filter.pharmacist
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.patient_records,
        as: 'patient_record',

        where: filter.patient_record
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.patient_record
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  patient_name: {
                    [Op.or]: filter.patient_record
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.organizations,
        as: 'organizations',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.prescription_code) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'prescriptions',
            'prescription_code',
            filter.prescription_code,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              issue_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              expiry_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.issue_dateRange) {
        const [start, end] = filter.issue_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            issue_date: {
              ...where.issue_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            issue_date: {
              ...where.issue_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.expiry_dateRange) {
        const [start, end] = filter.expiry_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            expiry_date: {
              ...where.expiry_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            expiry_date: {
              ...where.expiry_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organizations) {
        const listItems = filter.organizations.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationsId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationsId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.prescriptions.findAndCountAll(
        queryOptions,
      );

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('prescriptions', 'prescription_code', query),
        ],
      };
    }

    const records = await db.prescriptions.findAll({
      attributes: ['id', 'prescription_code'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['prescription_code', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.prescription_code,
    }));
  }
};
