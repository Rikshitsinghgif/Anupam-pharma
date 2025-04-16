import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View organizations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/organizations/organizations-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.users_organizations &&
                      Array.isArray(organizations.users_organizations) &&
                      organizations.users_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.users_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Drug_interactions organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>DrugName</th>

                      <th>InteractionDetails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.drug_interactions_organizations &&
                      Array.isArray(
                        organizations.drug_interactions_organizations,
                      ) &&
                      organizations.drug_interactions_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/drug_interactions/drug_interactions-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='drug_name'>{item.drug_name}</td>

                            <td data-label='interaction_details'>
                              {item.interaction_details}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.drug_interactions_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Inventory_managers organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.inventory_managers_organizations &&
                      Array.isArray(
                        organizations.inventory_managers_organizations,
                      ) &&
                      organizations.inventory_managers_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/inventory_managers/inventory_managers-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.inventory_managers_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Medicine_vouchers organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VoucherNumber</th>

                      <th>Amount</th>

                      <th>TransactionDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.medicine_vouchers_organizations &&
                      Array.isArray(
                        organizations.medicine_vouchers_organizations,
                      ) &&
                      organizations.medicine_vouchers_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/medicine_vouchers/medicine_vouchers-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='voucher_number'>
                              {item.voucher_number}
                            </td>

                            <td data-label='amount'>{item.amount}</td>

                            <td data-label='transaction_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.transaction_date,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.medicine_vouchers_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Patient_records organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PatientName</th>

                      <th>MedicalHistory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.patient_records_organizations &&
                      Array.isArray(
                        organizations.patient_records_organizations,
                      ) &&
                      organizations.patient_records_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/patient_records/patient_records-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='patient_name'>
                              {item.patient_name}
                            </td>

                            <td data-label='medical_history'>
                              {item.medical_history}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.patient_records_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Pharmacists organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.pharmacists_organizations &&
                      Array.isArray(organizations.pharmacists_organizations) &&
                      organizations.pharmacists_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/pharmacists/pharmacists-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.pharmacists_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Prescriptions organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PrescriptionCode</th>

                      <th>IssueDate</th>

                      <th>ExpiryDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.prescriptions_organizations &&
                      Array.isArray(
                        organizations.prescriptions_organizations,
                      ) &&
                      organizations.prescriptions_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/prescriptions/prescriptions-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='prescription_code'>
                              {item.prescription_code}
                            </td>

                            <td data-label='issue_date'>
                              {dataFormatter.dateTimeFormatter(item.issue_date)}
                            </td>

                            <td data-label='expiry_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.expiry_date,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.prescriptions_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Transactions organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TransactionID</th>

                      <th>Amount</th>

                      <th>TransactionDate</th>

                      <th>PaymentDetails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.transactions_organizations &&
                      Array.isArray(organizations.transactions_organizations) &&
                      organizations.transactions_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/transactions/transactions-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='transaction_id'>
                              {item.transaction_id}
                            </td>

                            <td data-label='amount'>{item.amount}</td>

                            <td data-label='transaction_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.transaction_date,
                              )}
                            </td>

                            <td data-label='payment_details'>
                              {item.payment_details}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.transactions_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
