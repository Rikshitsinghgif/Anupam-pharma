const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PharmacistsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pharmacists = await db.pharmacists.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pharmacists.setOrganizations(data.organizations || null, {
      transaction,
    });

    await pharmacists.setPrescriptions(data.prescriptions || [], {
      transaction,
    });

    await pharmacists.setPatient_records(data.patient_records || [], {
      transaction,
    });

    await pharmacists.setDrug_interactions(data.drug_interactions || [], {
      transaction,
    });

    return pharmacists;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const pharmacistsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const pharmacists = await db.pharmacists.bulkCreate(pharmacistsData, {
      transaction,
    });

    // For each item created, replace relation files

    return pharmacists;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const pharmacists = await db.pharmacists.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    updatePayload.updatedById = currentUser.id;

    await pharmacists.update(updatePayload, { transaction });

    if (data.organizations !== undefined) {
      await pharmacists.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    if (data.prescriptions !== undefined) {
      await pharmacists.setPrescriptions(data.prescriptions, { transaction });
    }

    if (data.patient_records !== undefined) {
      await pharmacists.setPatient_records(data.patient_records, {
        transaction,
      });
    }

    if (data.drug_interactions !== undefined) {
      await pharmacists.setDrug_interactions(data.drug_interactions, {
        transaction,
      });
    }

    return pharmacists;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pharmacists = await db.pharmacists.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of pharmacists) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of pharmacists) {
        await record.destroy({ transaction });
      }
    });

    return pharmacists;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pharmacists = await db.pharmacists.findByPk(id, options);

    await pharmacists.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await pharmacists.destroy({
      transaction,
    });

    return pharmacists;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pharmacists = await db.pharmacists.findOne(
      { where },
      { transaction },
    );

    if (!pharmacists) {
      return pharmacists;
    }

    const output = pharmacists.get({ plain: true });

    output.prescriptions_pharmacist =
      await pharmacists.getPrescriptions_pharmacist({
        transaction,
      });

    output.prescriptions = await pharmacists.getPrescriptions({
      transaction,
    });

    output.patient_records = await pharmacists.getPatient_records({
      transaction,
    });

    output.drug_interactions = await pharmacists.getDrug_interactions({
      transaction,
    });

    output.organizations = await pharmacists.getOrganizations({
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

      {
        model: db.patient_records,
        as: 'patient_records',
        required: false,
      },

      {
        model: db.drug_interactions,
        as: 'drug_interactions',
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('pharmacists', 'name', filter.name),
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

      if (filter.patient_records) {
        const searchTerms = filter.patient_records.split('|');

        include = [
          {
            model: db.patient_records,
            as: 'patient_records_filter',
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
                        patient_name: {
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

      if (filter.drug_interactions) {
        const searchTerms = filter.drug_interactions.split('|');

        include = [
          {
            model: db.drug_interactions,
            as: 'drug_interactions_filter',
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
                        drug_name: {
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
      const { rows, count } = await db.pharmacists.findAndCountAll(
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
          Utils.ilike('pharmacists', 'name', query),
        ],
      };
    }

    const records = await db.pharmacists.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
