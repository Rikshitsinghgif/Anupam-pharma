const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Drug_interactionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const drug_interactions = await db.drug_interactions.create(
      {
        id: data.id || undefined,

        drug_name: data.drug_name || null,
        interaction_details: data.interaction_details || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await drug_interactions.setOrganizations(data.organizations || null, {
      transaction,
    });

    return drug_interactions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const drug_interactionsData = data.map((item, index) => ({
      id: item.id || undefined,

      drug_name: item.drug_name || null,
      interaction_details: item.interaction_details || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const drug_interactions = await db.drug_interactions.bulkCreate(
      drug_interactionsData,
      { transaction },
    );

    // For each item created, replace relation files

    return drug_interactions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const drug_interactions = await db.drug_interactions.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.drug_name !== undefined) updatePayload.drug_name = data.drug_name;

    if (data.interaction_details !== undefined)
      updatePayload.interaction_details = data.interaction_details;

    updatePayload.updatedById = currentUser.id;

    await drug_interactions.update(updatePayload, { transaction });

    if (data.organizations !== undefined) {
      await drug_interactions.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    return drug_interactions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const drug_interactions = await db.drug_interactions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of drug_interactions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of drug_interactions) {
        await record.destroy({ transaction });
      }
    });

    return drug_interactions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const drug_interactions = await db.drug_interactions.findByPk(id, options);

    await drug_interactions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await drug_interactions.destroy({
      transaction,
    });

    return drug_interactions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const drug_interactions = await db.drug_interactions.findOne(
      { where },
      { transaction },
    );

    if (!drug_interactions) {
      return drug_interactions;
    }

    const output = drug_interactions.get({ plain: true });

    output.organizations = await drug_interactions.getOrganizations({
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

      if (filter.drug_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'drug_interactions',
            'drug_name',
            filter.drug_name,
          ),
        };
      }

      if (filter.interaction_details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'drug_interactions',
            'interaction_details',
            filter.interaction_details,
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
      const { rows, count } = await db.drug_interactions.findAndCountAll(
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
          Utils.ilike('drug_interactions', 'drug_name', query),
        ],
      };
    }

    const records = await db.drug_interactions.findAll({
      attributes: ['id', 'drug_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['drug_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.drug_name,
    }));
  }
};
