const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Patient_recordsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.create(
      {
        id: data.id || undefined,

        patient_name: data.patient_name || null,
        medical_history: data.medical_history || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await patient_records.setOrganizations(data.organizations || null, {
      transaction,
    });

    await patient_records.setPrescriptions(data.prescriptions || [], {
      transaction,
    });

    return patient_records;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const patient_recordsData = data.map((item, index) => ({
      id: item.id || undefined,

      patient_name: item.patient_name || null,
      medical_history: item.medical_history || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const patient_records = await db.patient_records.bulkCreate(
      patient_recordsData,
      { transaction },
    );

    // For each item created, replace relation files

    return patient_records;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const patient_records = await db.patient_records.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.patient_name !== undefined)
      updatePayload.patient_name = data.patient_name;

    if (data.medical_history !== undefined)
      updatePayload.medical_history = data.medical_history;

    updatePayload.updatedById = currentUser.id;

    await patient_records.update(updatePayload, { transaction });

    if (data.organizations !== undefined) {
      await patient_records.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    if (data.prescriptions !== undefined) {
      await patient_records.setPrescriptions(data.prescriptions, {
        transaction,
      });
    }

    return patient_records;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of patient_records) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of patient_records) {
        await record.destroy({ transaction });
      }
    });

    return patient_records;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.findByPk(id, options);

    await patient_records.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await patient_records.destroy({
      transaction,
    });

    return patient_records;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.findOne(
      { where },
      { transaction },
    );

    if (!patient_records) {
      return patient_records;
    }

    const output = patient_records.get({ plain: true });

    output.prescriptions_patient_record =
      await patient_records.getPrescriptions_patient_record({
        transaction,
      });

    output.prescriptions = await patient_records.getPrescriptions({
      transaction,
    });

    output.organizations = await patient_records.getOrganizations({
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
        model: db.organizations,
        as: 'organizations',
      },

      {
        model: db.prescriptions,
        as: 'prescriptions',
        required: false,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.patient_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_records',
            'patient_name',
            filter.patient_name,
          ),
        };
      }

      if (filter.medical_history) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_records',
            'medical_history',
            filter.medical_history,
          ),
        };
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

      if (filter.prescriptions) {
        const searchTerms = filter.prescriptions.split('|');

        include = [
          {
            model: db.prescriptions,
            as: 'prescriptions_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        prescription_code: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
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
      const { rows, count } = await db.patient_records.findAndCountAll(
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
          Utils.ilike('patient_records', 'patient_name', query),
        ],
      };
    }

    const records = await db.patient_records.findAll({
      attributes: ['id', 'patient_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['patient_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.patient_name,
    }));
  }
};
