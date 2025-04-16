import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/medicine_vouchers/medicine_vouchersSlice';
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

const Medicine_vouchersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { medicine_vouchers } = useAppSelector(
    (state) => state.medicine_vouchers,
  );

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
        <title>{getPageTitle('View medicine_vouchers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View medicine_vouchers')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/medicine_vouchers/medicine_vouchers-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>VoucherNumber</p>
            <p>{medicine_vouchers?.voucher_number}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Amount</p>
            <p>{medicine_vouchers?.amount || 'No data'}</p>
          </div>

          <FormField label='TransactionDate'>
            {medicine_vouchers.transaction_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  medicine_vouchers.transaction_date
                    ? new Date(
                        dayjs(medicine_vouchers.transaction_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No TransactionDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{medicine_vouchers?.organizations?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/medicine_vouchers/medicine_vouchers-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Medicine_vouchersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_MEDICINE_VOUCHERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Medicine_vouchersView;
