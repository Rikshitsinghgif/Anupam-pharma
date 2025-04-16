import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/inventory_managers/inventory_managersSlice';
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

const Inventory_managersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { inventory_managers } = useAppSelector(
    (state) => state.inventory_managers,
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
        <title>{getPageTitle('View inventory_managers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View inventory_managers')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/inventory_managers/inventory_managers-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{inventory_managers?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>MedicineVouchers</p>
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
                    {inventory_managers.medicine_vouchers &&
                      Array.isArray(inventory_managers.medicine_vouchers) &&
                      inventory_managers.medicine_vouchers.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!inventory_managers?.medicine_vouchers?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Transactions</p>
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
                    {inventory_managers.transactions &&
                      Array.isArray(inventory_managers.transactions) &&
                      inventory_managers.transactions.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!inventory_managers?.transactions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{inventory_managers?.organizations?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/inventory_managers/inventory_managers-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Inventory_managersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_INVENTORY_MANAGERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Inventory_managersView;
