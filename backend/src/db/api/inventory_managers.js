const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Inventory_managersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inventory_managers = await db.inventory_managers.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await inventory_managers.setOrganizations(data.organizations || null, {
      transaction,
    });

    await inventory_managers.setMedicine_vouchers(
      data.medicine_vouchers || [],
      {
        transaction,
      },
    );

    await inventory_managers.setTransactions(data.transactions || [], {
      transaction,
    });

    return inventory_managers;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const inventory_managersData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const inventory_managers = await db.inventory_managers.bulkCreate(
      inventory_managersData,
      { transaction },
    );

    // For each item created, replace relation files

    return inventory_managers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const inventory_managers = await db.inventory_managers.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    updatePayload.updatedById = currentUser.id;

    await inventory_managers.update(updatePayload, { transaction });

    if (data.organizations !== undefined) {
      await inventory_managers.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    if (data.medicine_vouchers !== undefined) {
      await inventory_managers.setMedicine_vouchers(data.medicine_vouchers, {
        transaction,
      });
    }

    if (data.transactions !== undefined) {
      await inventory_managers.setTransactions(data.transactions, {
        transaction,
      });
    }

    return inventory_managers;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inventory_managers = await db.inventory_managers.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of inventory_managers) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of inventory_managers) {
        await record.destroy({ transaction });
      }
    });

    return inventory_managers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inventory_managers = await db.inventory_managers.findByPk(
      id,
      options,
    );

    await inventory_managers.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await inventory_managers.destroy({
      transaction,
    });

    return inventory_managers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const inventory_managers = await db.inventory_managers.findOne(
      { where },
      { transaction },
    );

    if (!inventory_managers) {
      return inventory_managers;
    }

    const output = inventory_managers.get({ plain: true });

    output.medicine_vouchers = await inventory_managers.getMedicine_vouchers({
      transaction,
    });

    output.transactions = await inventory_managers.getTransactions({
      transaction,
    });

    output.organizations = await inventory_managers.getOrganizations({
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
        model: db.medicine_vouchers,
        as: 'medicine_vouchers',
        required: false,
      },

      {
        model: db.transactions,
        as: 'transactions',
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
          [Op.and]: Utils.ilike('inventory_managers', 'name', filter.name),
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

      if (filter.medicine_vouchers) {
        const searchTerms = filter.medicine_vouchers.split('|');

        include = [
          {
            model: db.medicine_vouchers,
            as: 'medicine_vouchers_filter',
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
                        voucher_number: {
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

      if (filter.transactions) {
        const searchTerms = filter.transactions.split('|');

        include = [
          {
            model: db.transactions,
            as: 'transactions_filter',
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
                        transaction_id: {
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
      const { rows, count } = await db.inventory_managers.findAndCountAll(
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
          Utils.ilike('inventory_managers', 'name', query),
        ],
      };
    }

    const records = await db.inventory_managers.findAll({
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
