import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/drug_interactions/drug_interactions-list',
    label: 'Drug interactions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiChemicalWeapon ? icon.mdiChemicalWeapon : icon.mdiTable,
    permissions: 'READ_DRUG_INTERACTIONS',
  },
  {
    href: '/inventory_managers/inventory_managers-list',
    label: 'Inventory managers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiWarehouse ? icon.mdiWarehouse : icon.mdiTable,
    permissions: 'READ_INVENTORY_MANAGERS',
  },
  {
    href: '/medicine_vouchers/medicine_vouchers-list',
    label: 'Medicine vouchers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiReceipt ? icon.mdiReceipt : icon.mdiTable,
    permissions: 'READ_MEDICINE_VOUCHERS',
  },
  {
    href: '/patient_records/patient_records-list',
    label: 'Patient records',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountHeart ? icon.mdiAccountHeart : icon.mdiTable,
    permissions: 'READ_PATIENT_RECORDS',
  },
  {
    href: '/pharmacists/pharmacists-list',
    label: 'Pharmacists',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPill ? icon.mdiPill : icon.mdiTable,
    permissions: 'READ_PHARMACISTS',
  },
  {
    href: '/prescriptions/prescriptions-list',
    label: 'Prescriptions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFileDocument ? icon.mdiFileDocument : icon.mdiTable,
    permissions: 'READ_PRESCRIPTIONS',
  },
  {
    href: '/transactions/transactions-list',
    label: 'Transactions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCurrencyUsd ? icon.mdiCurrencyUsd : icon.mdiTable,
    permissions: 'READ_TRANSACTIONS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_ORGANIZATIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/home',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
