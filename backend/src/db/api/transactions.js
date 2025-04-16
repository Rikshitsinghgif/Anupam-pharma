const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TransactionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.create(
      {
        id: data.id || undefined,

        transaction_id: data.transaction_id || null,
        amount: data.amount || null,
        transaction_date: data.transaction_date || null,
        payment_details: data.payment_details || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await transactions.setOrganizations(data.organizations || null, {
      transaction,
    });

    return transactions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const transactionsData = data.map((item, index) => ({
      id: item.id || undefined,

      transaction_id: item.transaction_id || null,
      amount: item.amount || null,
      transaction_date: item.transaction_date || null,
      payment_details: item.payment_details || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const transactions = await db.transactions.bulkCreate(transactionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return transactions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const transactions = await db.transactions.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.transaction_id !== undefined)
      updatePayload.transaction_id = data.transaction_id;

    if (data.amount !== undefined) updatePayload.amount = data.amount;

    if (data.transaction_date !== undefined)
      updatePayload.transaction_date = data.transaction_date;

    if (data.payment_details !== undefined)
      updatePayload.payment_details = data.payment_details;

    updatePayload.updatedById = currentUser.id;

    await transactions.update(updatePayload, { transaction });

    if (data.organizations !== undefined) {
      await transactions.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    return transactions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of transactions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of transactions) {
        await record.destroy({ transaction });
      }
    });

    return transactions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.findByPk(id, options);

    await transactions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await transactions.destroy({
      transaction,
    });

    return transactions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.findOne(
      { where },
      { transaction },
    );

    if (!transactions) {
      return transactions;
    }

    const output = transactions.get({ plain: true });

    output.organizations = await transactions.getOrganizations({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.transaction_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'transactions',
            'transaction_id',
            filter.transaction_id,
          ),
        };
      }

      if (filter.payment_details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'transactions',
            'payment_details',
            filter.payment_details,
          ),
        };
      }

      if (filter.amountRange) {
        const [start, end] = filter.amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.transaction_dateRange) {
        const [start, end] = filter.transaction_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            transaction_date: {
              ...where.transaction_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            transaction_date: {
              ...where.transaction_date,
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
      const { rows, count } = await db.transactions.findAndCountAll(
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
          Utils.ilike('transactions', 'transaction_id', query),
        ],
      };
    }

    const records = await db.transactions.findAll({
      attributes: ['id', 'transaction_id'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['transaction_id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.transaction_id,
    }));
  }
};
