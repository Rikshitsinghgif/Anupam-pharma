const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const patient_records = sequelize.define(
    'patient_records',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      patient_name: {
        type: DataTypes.TEXT,
      },

      medical_history: {
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

  patient_records.associate = (db) => {
    db.patient_records.belongsToMany(db.prescriptions, {
      as: 'prescriptions',
      foreignKey: {
        name: 'patient_records_prescriptionsId',
      },
      constraints: false,
      through: 'patient_recordsPrescriptionsPrescriptions',
    });

    db.patient_records.belongsToMany(db.prescriptions, {
      as: 'prescriptions_filter',
      foreignKey: {
        name: 'patient_records_prescriptionsId',
      },
      constraints: false,
      through: 'patient_recordsPrescriptionsPrescriptions',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.patient_records.hasMany(db.prescriptions, {
      as: 'prescriptions_patient_record',
      foreignKey: {
        name: 'patient_recordId',
      },
      constraints: false,
    });

    //end loop

    db.patient_records.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.patient_records.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.patient_records.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return patient_records;
};
