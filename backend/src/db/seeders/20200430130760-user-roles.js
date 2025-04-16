const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('PharmacyDirector'),
        name: 'Pharmacy Director',
        createdAt,
        updatedAt,
      },

      {
        id: getId('LeadPharmacist'),
        name: 'Lead Pharmacist',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SeniorInventoryManager'),
        name: 'Senior Inventory Manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('PharmacyTechnician'),
        name: 'Pharmacy Technician',
        createdAt,
        updatedAt,
      },

      {
        id: getId('InventoryClerk'),
        name: 'Inventory Clerk',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'drug_interactions',
      'inventory_managers',
      'medicine_vouchers',
      'patient_records',
      'pharmacists',
      'prescriptions',
      'transactions',
      'roles',
      'permissions',
      'organizations',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('CREATE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('DELETE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('UPDATE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('CREATE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('UPDATE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('DELETE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('CREATE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('UPDATE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('DELETE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('UPDATE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('CREATE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('DELETE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('UPDATE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('DELETE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('CREATE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('DELETE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('UPDATE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('READ_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('UPDATE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('DELETE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('READ_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('UPDATE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('CREATE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('READ_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('UPDATE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('DELETE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('READ_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('READ_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('UPDATE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyDirector'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadPharmacist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorInventoryManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PharmacyTechnician'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('InventoryClerk'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DRUG_INTERACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DRUG_INTERACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_INVENTORY_MANAGERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_INVENTORY_MANAGERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MEDICINE_VOUCHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MEDICINE_VOUCHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PATIENT_RECORDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PATIENT_RECORDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PHARMACISTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PHARMACISTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PHARMACISTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PRESCRIPTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PRESCRIPTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TRANSACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TRANSACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TRANSACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_DRUG_INTERACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_DRUG_INTERACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_DRUG_INTERACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_DRUG_INTERACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_INVENTORY_MANAGERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_INVENTORY_MANAGERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_INVENTORY_MANAGERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_INVENTORY_MANAGERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_MEDICINE_VOUCHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_MEDICINE_VOUCHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_MEDICINE_VOUCHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_MEDICINE_VOUCHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PATIENT_RECORDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PATIENT_RECORDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PATIENT_RECORDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PATIENT_RECORDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PHARMACISTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PHARMACISTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PHARMACISTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PHARMACISTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PRESCRIPTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PRESCRIPTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PRESCRIPTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PRESCRIPTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_TRANSACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_TRANSACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_TRANSACTIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_TRANSACTIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ORGANIZATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ORGANIZATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ORGANIZATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ORGANIZATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'PharmacyDirector',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'LeadPharmacist',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
