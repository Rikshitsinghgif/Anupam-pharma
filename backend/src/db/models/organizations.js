const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const organizations = sequelize.define(
    'organizations',
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

  organizations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.organizations.hasMany(db.users, {
      as: 'users_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.drug_interactions, {
      as: 'drug_interactions_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.inventory_managers, {
      as: 'inventory_managers_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.medicine_vouchers, {
      as: 'medicine_vouchers_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.patient_records, {
      as: 'patient_records_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.pharmacists, {
      as: 'pharmacists_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.prescriptions, {
      as: 'prescriptions_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.transactions, {
      as: 'transactions_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    //end loop

    db.organizations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.organizations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return organizations;
};
