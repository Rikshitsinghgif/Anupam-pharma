const db = require('../db/models');
const ValidationError = require('./notifications/errors/validation');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * @param {string} permission
 * @param {object} currentUser
 */
async function checkPermissions(permission, currentUser) {
  if (!currentUser) {
    throw new ValidationError('auth.unauthorized');
  }

  const userPermission = currentUser.custom_permissions.find(
    (cp) => cp.name === permission,
  );

  if (userPermission) {
    return true;
  }

  try {
    if (!currentUser.app_role) {
      throw new ValidationError('auth.forbidden');
    }

    const permissions = await currentUser.app_role.getPermissions();

    return !!permissions.find((p) => p.name === permission);
  } catch (e) {
    throw e;
  }
}

module.exports = class SearchService {
  static async search(searchQuery, currentUser, organizationId, globalAccess) {
    try {
      if (!searchQuery) {
        throw new ValidationError('iam.errors.searchQueryRequired');
      }
      const tableColumns = {
        users: ['firstName', 'lastName', 'phoneNumber', 'email'],

        drug_interactions: ['drug_name', 'interaction_details'],

        inventory_managers: ['name'],

        medicine_vouchers: ['voucher_number'],

        patient_records: ['patient_name', 'medical_history'],

        pharmacists: ['name'],

        prescriptions: ['prescription_code'],

        transactions: ['transaction_id', 'payment_details'],

        organizations: ['name'],
      };
      const columnsInt = {
        medicine_vouchers: ['amount'],

        transactions: ['amount'],
      };

      let allFoundRecords = [];

      for (const tableName in tableColumns) {
        if (tableColumns.hasOwnProperty(tableName)) {
          const attributesToSearch = tableColumns[tableName];
          const attributesIntToSearch = columnsInt[tableName] || [];
          const whereCondition = {
            [Op.or]: [
              ...attributesToSearch.map((attribute) => ({
                [attribute]: {
                  [Op.iLike]: `%${searchQuery}%`,
                },
              })),
              ...attributesIntToSearch.map((attribute) =>
                Sequelize.where(
                  Sequelize.cast(
                    Sequelize.col(`${tableName}.${attribute}`),
                    'varchar',
                  ),
                  { [Op.iLike]: `%${searchQuery}%` },
                ),
              ),
            ],
          };

          if (
            !globalAccess &&
            tableName !== 'organizations' &&
            organizationId
          ) {
            whereCondition.organizationId = organizationId;
          }

          const hasPermission = await checkPermissions(
            `READ_${tableName.toUpperCase()}`,
            currentUser,
          );
          if (!hasPermission) {
            continue;
          }

          const foundRecords = await db[tableName].findAll({
            where: whereCondition,
            attributes: [
              ...tableColumns[tableName],
              'id',
              ...attributesIntToSearch,
            ],
          });

          const modifiedRecords = foundRecords.map((record) => {
            const matchAttribute = [];

            for (const attribute of attributesToSearch) {
              if (
                record[attribute]
                  ?.toLowerCase()
                  ?.includes(searchQuery.toLowerCase())
              ) {
                matchAttribute.push(attribute);
              }
            }

            for (const attribute of attributesIntToSearch) {
              const castedValue = String(record[attribute]);
              if (
                castedValue &&
                castedValue.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                matchAttribute.push(attribute);
              }
            }

            return {
              ...record.get(),
              matchAttribute,
              tableName,
            };
          });

          allFoundRecords = allFoundRecords.concat(modifiedRecords);
        }
      }

      return allFoundRecords;
    } catch (error) {
      throw error;
    }
  }
};
