import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/prescriptions/prescriptionsSlice';
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

const PrescriptionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { prescriptions } = useAppSelector((state) => state.prescriptions);

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
        <title>{getPageTitle('View prescriptions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View prescriptions')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/prescriptions/prescriptions-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PrescriptionCode</p>
            <p>{prescriptions?.prescription_code}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Pharmacist</p>

            <p>{prescriptions?.pharmacist?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PatientRecord</p>

            <p>{prescriptions?.patient_record?.patient_name ?? 'No data'}</p>
          </div>

          <FormField label='IssueDate'>
            {prescriptions.issue_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  prescriptions.issue_date
                    ? new Date(
                        dayjs(prescriptions.issue_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No IssueDate</p>
            )}
          </FormField>

          <FormField label='ExpiryDate'>
            {prescriptions.expiry_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  prescriptions.expiry_date
                    ? new Date(
                        dayjs(prescriptions.expiry_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No ExpiryDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{prescriptions?.organizations?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/prescriptions/prescriptions-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PrescriptionsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PRESCRIPTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PrescriptionsView;
