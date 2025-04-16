const db = require('../models');
const Users = db.users;

const DrugInteractions = db.drug_interactions;

const InventoryManagers = db.inventory_managers;

const MedicineVouchers = db.medicine_vouchers;

const PatientRecords = db.patient_records;

const Pharmacists = db.pharmacists;

const Prescriptions = db.prescriptions;

const Transactions = db.transactions;

const Organizations = db.organizations;

const DrugInteractionsData = [
  {
    drug_name: 'Aspirin',

    interaction_details: 'Jean Baptiste Lamarck',

    // type code here for "relation_one" field
  },

  {
    drug_name: 'Ibuprofen',

    interaction_details: 'Lynn Margulis',

    // type code here for "relation_one" field
  },

  {
    drug_name: 'Paracetamol',

    interaction_details: 'Frederick Gowland Hopkins',

    // type code here for "relation_one" field
  },

  {
    drug_name: 'Amoxicillin',

    interaction_details: 'Ludwig Boltzmann',

    // type code here for "relation_one" field
  },
];

const InventoryManagersData = [
  {
    name: 'Alice Green',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Robert White',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Jessica Black',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'David Wilson',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const MedicineVouchersData = [
  {
    voucher_number: 'MV001',

    amount: 13.03,

    transaction_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    voucher_number: 'MV002',

    amount: 23.73,

    transaction_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    voucher_number: 'MV003',

    amount: 55.86,

    transaction_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    voucher_number: 'MV004',

    amount: 30.85,

    transaction_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },
];

const PatientRecordsData = [
  {
    patient_name: 'Tom Hanks',

    medical_history: 'Gustav Kirchhoff',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    patient_name: 'Emma Watson',

    medical_history: 'Ludwig Boltzmann',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    patient_name: 'Chris Evans',

    medical_history: 'William Harvey',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    patient_name: 'Scarlett Johansson',

    medical_history: 'Anton van Leeuwenhoek',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const PharmacistsData = [
  {
    name: 'John Doe',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Jane Smith',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Emily Johnson',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Michael Brown',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const PrescriptionsData = [
  {
    prescription_code: 'RX123456',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    issue_date: new Date(Date.now()),

    expiry_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    prescription_code: 'RX654321',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    issue_date: new Date(Date.now()),

    expiry_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    prescription_code: 'RX112233',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    issue_date: new Date(Date.now()),

    expiry_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    prescription_code: 'RX445566',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    issue_date: new Date(Date.now()),

    expiry_date: new Date(Date.now()),

    // type code here for "relation_one" field
  },
];

const TransactionsData = [
  {
    transaction_id: 'TX001',

    amount: 21.84,

    transaction_date: new Date(Date.now()),

    payment_details: 'John von Neumann',

    // type code here for "relation_one" field
  },

  {
    transaction_id: 'TX002',

    amount: 58.22,

    transaction_date: new Date(Date.now()),

    payment_details: 'Paul Ehrlich',

    // type code here for "relation_one" field
  },

  {
    transaction_id: 'TX003',

    amount: 82.53,

    transaction_date: new Date(Date.now()),

    payment_details: 'Rudolf Virchow',

    // type code here for "relation_one" field
  },

  {
    transaction_id: 'TX004',

    amount: 42.36,

    transaction_date: new Date(Date.now()),

    payment_details: 'Antoine Laurent Lavoisier',

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Trofim Lysenko',
  },

  {
    name: 'Trofim Lysenko',
  },

  {
    name: 'Claude Bernard',
  },

  {
    name: 'Ernst Mayr',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }
}

async function associateDrugInteractionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DrugInteraction0 = await DrugInteractions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DrugInteraction0?.setOrganization) {
    await DrugInteraction0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DrugInteraction1 = await DrugInteractions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DrugInteraction1?.setOrganization) {
    await DrugInteraction1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DrugInteraction2 = await DrugInteractions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DrugInteraction2?.setOrganization) {
    await DrugInteraction2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DrugInteraction3 = await DrugInteractions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DrugInteraction3?.setOrganization) {
    await DrugInteraction3.setOrganization(relatedOrganization3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateInventoryManagerWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InventoryManager0 = await InventoryManagers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (InventoryManager0?.setOrganization) {
    await InventoryManager0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InventoryManager1 = await InventoryManagers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (InventoryManager1?.setOrganization) {
    await InventoryManager1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InventoryManager2 = await InventoryManagers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (InventoryManager2?.setOrganization) {
    await InventoryManager2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InventoryManager3 = await InventoryManagers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (InventoryManager3?.setOrganization) {
    await InventoryManager3.setOrganization(relatedOrganization3);
  }
}

async function associateMedicineVoucherWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const MedicineVoucher0 = await MedicineVouchers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MedicineVoucher0?.setOrganization) {
    await MedicineVoucher0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const MedicineVoucher1 = await MedicineVouchers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MedicineVoucher1?.setOrganization) {
    await MedicineVoucher1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const MedicineVoucher2 = await MedicineVouchers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MedicineVoucher2?.setOrganization) {
    await MedicineVoucher2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const MedicineVoucher3 = await MedicineVouchers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MedicineVoucher3?.setOrganization) {
    await MedicineVoucher3.setOrganization(relatedOrganization3);
  }
}

// Similar logic for "relation_many"

async function associatePatientRecordWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientRecord0 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PatientRecord0?.setOrganization) {
    await PatientRecord0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientRecord1 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PatientRecord1?.setOrganization) {
    await PatientRecord1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientRecord2 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PatientRecord2?.setOrganization) {
    await PatientRecord2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientRecord3 = await PatientRecords.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PatientRecord3?.setOrganization) {
    await PatientRecord3.setOrganization(relatedOrganization3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associatePharmacistWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Pharmacist0 = await Pharmacists.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Pharmacist0?.setOrganization) {
    await Pharmacist0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Pharmacist1 = await Pharmacists.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Pharmacist1?.setOrganization) {
    await Pharmacist1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Pharmacist2 = await Pharmacists.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Pharmacist2?.setOrganization) {
    await Pharmacist2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Pharmacist3 = await Pharmacists.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Pharmacist3?.setOrganization) {
    await Pharmacist3.setOrganization(relatedOrganization3);
  }
}

async function associatePrescriptionWithPharmacist() {
  const relatedPharmacist0 = await Pharmacists.findOne({
    offset: Math.floor(Math.random() * (await Pharmacists.count())),
  });
  const Prescription0 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Prescription0?.setPharmacist) {
    await Prescription0.setPharmacist(relatedPharmacist0);
  }

  const relatedPharmacist1 = await Pharmacists.findOne({
    offset: Math.floor(Math.random() * (await Pharmacists.count())),
  });
  const Prescription1 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Prescription1?.setPharmacist) {
    await Prescription1.setPharmacist(relatedPharmacist1);
  }

  const relatedPharmacist2 = await Pharmacists.findOne({
    offset: Math.floor(Math.random() * (await Pharmacists.count())),
  });
  const Prescription2 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Prescription2?.setPharmacist) {
    await Prescription2.setPharmacist(relatedPharmacist2);
  }

  const relatedPharmacist3 = await Pharmacists.findOne({
    offset: Math.floor(Math.random() * (await Pharmacists.count())),
  });
  const Prescription3 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Prescription3?.setPharmacist) {
    await Prescription3.setPharmacist(relatedPharmacist3);
  }
}

async function associatePrescriptionWithPatient_record() {
  const relatedPatient_record0 = await PatientRecords.findOne({
    offset: Math.floor(Math.random() * (await PatientRecords.count())),
  });
  const Prescription0 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Prescription0?.setPatient_record) {
    await Prescription0.setPatient_record(relatedPatient_record0);
  }

  const relatedPatient_record1 = await PatientRecords.findOne({
    offset: Math.floor(Math.random() * (await PatientRecords.count())),
  });
  const Prescription1 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Prescription1?.setPatient_record) {
    await Prescription1.setPatient_record(relatedPatient_record1);
  }

  const relatedPatient_record2 = await PatientRecords.findOne({
    offset: Math.floor(Math.random() * (await PatientRecords.count())),
  });
  const Prescription2 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Prescription2?.setPatient_record) {
    await Prescription2.setPatient_record(relatedPatient_record2);
  }

  const relatedPatient_record3 = await PatientRecords.findOne({
    offset: Math.floor(Math.random() * (await PatientRecords.count())),
  });
  const Prescription3 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Prescription3?.setPatient_record) {
    await Prescription3.setPatient_record(relatedPatient_record3);
  }
}

async function associatePrescriptionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Prescription0 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Prescription0?.setOrganization) {
    await Prescription0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Prescription1 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Prescription1?.setOrganization) {
    await Prescription1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Prescription2 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Prescription2?.setOrganization) {
    await Prescription2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Prescription3 = await Prescriptions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Prescription3?.setOrganization) {
    await Prescription3.setOrganization(relatedOrganization3);
  }
}

async function associateTransactionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction0 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Transaction0?.setOrganization) {
    await Transaction0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction1 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Transaction1?.setOrganization) {
    await Transaction1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction2 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Transaction2?.setOrganization) {
    await Transaction2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction3 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Transaction3?.setOrganization) {
    await Transaction3.setOrganization(relatedOrganization3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await DrugInteractions.bulkCreate(DrugInteractionsData);

    await InventoryManagers.bulkCreate(InventoryManagersData);

    await MedicineVouchers.bulkCreate(MedicineVouchersData);

    await PatientRecords.bulkCreate(PatientRecordsData);

    await Pharmacists.bulkCreate(PharmacistsData);

    await Prescriptions.bulkCreate(PrescriptionsData);

    await Transactions.bulkCreate(TransactionsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateDrugInteractionWithOrganization(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateInventoryManagerWithOrganization(),

      await associateMedicineVoucherWithOrganization(),

      // Similar logic for "relation_many"

      await associatePatientRecordWithOrganization(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associatePharmacistWithOrganization(),

      await associatePrescriptionWithPharmacist(),

      await associatePrescriptionWithPatient_record(),

      await associatePrescriptionWithOrganization(),

      await associateTransactionWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('drug_interactions', null, {});

    await queryInterface.bulkDelete('inventory_managers', null, {});

    await queryInterface.bulkDelete('medicine_vouchers', null, {});

    await queryInterface.bulkDelete('patient_records', null, {});

    await queryInterface.bulkDelete('pharmacists', null, {});

    await queryInterface.bulkDelete('prescriptions', null, {});

    await queryInterface.bulkDelete('transactions', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
