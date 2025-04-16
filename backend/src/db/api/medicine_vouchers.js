const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Medicine_vouchersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const medicine_vouchers = await db.medicine_vouchers.create(
      {
        id: data.id || undefined,

        voucher_number: data.voucher_number || null,
        amount: data.amount || null,
        transaction_date: data.transaction_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await medicine_vouchers.setOrganizations(data.organizations || null, {
      transaction,
    });

    return medicine_vouchers;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const medicine_vouchersData = data.map((item, index) => ({
      id: item.id || undefined,

      voucher_number: item.voucher_number || null,
      amount: item.amount || null,
      transaction_date: item.transaction_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const medicine_vouchers = await db.medicine_vouchers.bulkCreate(
      medicine_vouchersData,
      { transaction },
    );

    // For each item created, replace relation files

    return medicine_vouchers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const medicine_vouchers = await db.medicine_vouchers.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.voucher_number !== undefined)
      updatePayload.voucher_number = data.voucher_number;

    if (data.amount !== undefined) updatePayload.amount = data.amount;

    if (data.transaction_date !== undefined)
      updatePayload.transaction_date = data.transaction_date;

    updatePayload.updatedById = currentUser.id;

    await medicine_vouchers.update(updatePayload, { transaction });

    if (data.organizations !== undefined) {
      await medicine_vouchers.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    return medicine_vouchers;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const medicine_vouchers = await db.medicine_vouchers.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of medicine_vouchers) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of medicine_vouchers) {
        await record.destroy({ transaction });
      }
    });

    return medicine_vouchers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const medicine_vouchers = await db.medicine_vouchers.findByPk(id, options);

    await medicine_vouchers.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await medicine_vouchers.destroy({
      transaction,
    });

    return medicine_vouchers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const medicine_vouchers = await db.medicine_vouchers.findOne(
      { where },
      { transaction },
    );

    if (!medicine_vouchers) {
      return medicine_vouchers;
    }

    const output = medicine_vouchers.get({ plain: true });

    output.organizations = await medicine_vouchers.getOrganizations({
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

      if (filter.voucher_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'medicine_vouchers',
            'voucher_number',
            filter.voucher_number,
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
      const { rows, count } = await db.medicine_vouchers.findAndCountAll(
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
          Utils.ilike('medicine_vouchers', 'voucher_number', query),
        ],
      };
    }

    const records = await db.medicine_vouchers.findAll({
      attributes: ['id', 'voucher_number'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['voucher_number', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.voucher_number,
    }));
  }
};
