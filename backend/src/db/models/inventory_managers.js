const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const inventory_managers = sequelize.define(
    'inventory_managers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  inventory_managers.associate = (db) => {
    db.inventory_managers.belongsToMany(db.medicine_vouchers, {
      as: 'medicine_vouchers',
      foreignKey: {
        name: 'inventory_managers_medicine_vouchersId',
      },
      constraints: false,
      through: 'inventory_managersMedicine_vouchersMedicine_vouchers',
    });

    db.inventory_managers.belongsToMany(db.medicine_vouchers, {
      as: 'medicine_vouchers_filter',
      foreignKey: {
        name: 'inventory_managers_medicine_vouchersId',
      },
      constraints: false,
      through: 'inventory_managersMedicine_vouchersMedicine_vouchers',
    });

    db.inventory_managers.belongsToMany(db.transactions, {
      as: 'transactions',
      foreignKey: {
        name: 'inventory_managers_transactionsId',
      },
      constraints: false,
      through: 'inventory_managersTransactionsTransactions',
    });

    db.inventory_managers.belongsToMany(db.transactions, {
      as: 'transactions_filter',
      foreignKey: {
        name: 'inventory_managers_transactionsId',
      },
      constraints: false,
      through: 'inventory_managersTransactionsTransactions',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.inventory_managers.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.inventory_managers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.inventory_managers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return inventory_managers;
};
