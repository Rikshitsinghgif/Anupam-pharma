const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const pharmacists = sequelize.define(
    'pharmacists',
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

  pharmacists.associate = (db) => {
    db.pharmacists.belongsToMany(db.prescriptions, {
      as: 'prescriptions',
      foreignKey: {
        name: 'pharmacists_prescriptionsId',
      },
      constraints: false,
      through: 'pharmacistsPrescriptionsPrescriptions',
    });

    db.pharmacists.belongsToMany(db.prescriptions, {
      as: 'prescriptions_filter',
      foreignKey: {
        name: 'pharmacists_prescriptionsId',
      },
      constraints: false,
      through: 'pharmacistsPrescriptionsPrescriptions',
    });

    db.pharmacists.belongsToMany(db.patient_records, {
      as: 'patient_records',
      foreignKey: {
        name: 'pharmacists_patient_recordsId',
      },
      constraints: false,
      through: 'pharmacistsPatient_recordsPatient_records',
    });

    db.pharmacists.belongsToMany(db.patient_records, {
      as: 'patient_records_filter',
      foreignKey: {
        name: 'pharmacists_patient_recordsId',
      },
      constraints: false,
      through: 'pharmacistsPatient_recordsPatient_records',
    });

    db.pharmacists.belongsToMany(db.drug_interactions, {
      as: 'drug_interactions',
      foreignKey: {
        name: 'pharmacists_drug_interactionsId',
      },
      constraints: false,
      through: 'pharmacistsDrug_interactionsDrug_interactions',
    });

    db.pharmacists.belongsToMany(db.drug_interactions, {
      as: 'drug_interactions_filter',
      foreignKey: {
        name: 'pharmacists_drug_interactionsId',
      },
      constraints: false,
      through: 'pharmacistsDrug_interactionsDrug_interactions',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.pharmacists.hasMany(db.prescriptions, {
      as: 'prescriptions_pharmacist',
      foreignKey: {
        name: 'pharmacistId',
      },
      constraints: false,
    });

    //end loop

    db.pharmacists.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.pharmacists.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pharmacists.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pharmacists;
};
