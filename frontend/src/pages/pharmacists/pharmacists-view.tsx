import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/pharmacists/pharmacistsSlice';
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

const PharmacistsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pharmacists } = useAppSelector((state) => state.pharmacists);

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
        <title>{getPageTitle('View pharmacists')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View pharmacists')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/pharmacists/pharmacists-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{pharmacists?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Prescriptions</p>
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
                    {pharmacists.prescriptions &&
                      Array.isArray(pharmacists.prescriptions) &&
                      pharmacists.prescriptions.map((item: any) => (
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
                            {dataFormatter.dateTimeFormatter(item.expiry_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!pharmacists?.prescriptions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>PatientRecords</p>
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
                    {pharmacists.patient_records &&
                      Array.isArray(pharmacists.patient_records) &&
                      pharmacists.patient_records.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/patient_records/patient_records-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='patient_name'>{item.patient_name}</td>

                          <td data-label='medical_history'>
                            {item.medical_history}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!pharmacists?.patient_records?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>DrugInteractions</p>
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
                    {pharmacists.drug_interactions &&
                      Array.isArray(pharmacists.drug_interactions) &&
                      pharmacists.drug_interactions.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!pharmacists?.drug_interactions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{pharmacists?.organizations?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Prescriptions Pharmacist</p>
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
                    {pharmacists.prescriptions_pharmacist &&
                      Array.isArray(pharmacists.prescriptions_pharmacist) &&
                      pharmacists.prescriptions_pharmacist.map((item: any) => (
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
                            {dataFormatter.dateTimeFormatter(item.expiry_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!pharmacists?.prescriptions_pharmacist?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/pharmacists/pharmacists-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PharmacistsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PHARMACISTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PharmacistsView;
