import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import drug_interactionsSlice from './drug_interactions/drug_interactionsSlice';
import inventory_managersSlice from './inventory_managers/inventory_managersSlice';
import medicine_vouchersSlice from './medicine_vouchers/medicine_vouchersSlice';
import patient_recordsSlice from './patient_records/patient_recordsSlice';
import pharmacistsSlice from './pharmacists/pharmacistsSlice';
import prescriptionsSlice from './prescriptions/prescriptionsSlice';
import transactionsSlice from './transactions/transactionsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import organizationsSlice from './organizations/organizationsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    drug_interactions: drug_interactionsSlice,
    inventory_managers: inventory_managersSlice,
    medicine_vouchers: medicine_vouchersSlice,
    patient_records: patient_recordsSlice,
    pharmacists: pharmacistsSlice,
    prescriptions: prescriptionsSlice,
    transactions: transactionsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    organizations: organizationsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
