import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/patient_records/patient_recordsSlice';
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

const Patient_recordsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { patient_records } = useAppSelector((state) => state.patient_records);

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
        <title>{getPageTitle('View patient_records')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View patient_records')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/patient_records/patient_records-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PatientName</p>
            <p>{patient_records?.patient_name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patient_records?.medical_history}
            />
          </FormField>

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
                    {patient_records.prescriptions &&
                      Array.isArray(patient_records.prescriptions) &&
                      patient_records.prescriptions.map((item: any) => (
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
              {!patient_records?.prescriptions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{patient_records?.organizations?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Prescriptions PatientRecord
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
                    {patient_records.prescriptions_patient_record &&
                      Array.isArray(
                        patient_records.prescriptions_patient_record,
                      ) &&
                      patient_records.prescriptions_patient_record.map(
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
              {!patient_records?.prescriptions_patient_record?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/patient_records/patient_records-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Patient_recordsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PATIENT_RECORDS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Patient_recordsView;
