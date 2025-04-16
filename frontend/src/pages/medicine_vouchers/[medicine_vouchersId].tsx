import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/medicine_vouchers/medicine_vouchersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditMedicine_vouchers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    voucher_number: '',

    amount: '',

    transaction_date: new Date(),

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { medicine_vouchers } = useAppSelector(
    (state) => state.medicine_vouchers,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { medicine_vouchersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: medicine_vouchersId }));
  }, [medicine_vouchersId]);

  useEffect(() => {
    if (typeof medicine_vouchers === 'object') {
      setInitialValues(medicine_vouchers);
    }
  }, [medicine_vouchers]);

  useEffect(() => {
    if (typeof medicine_vouchers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = medicine_vouchers[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [medicine_vouchers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: medicine_vouchersId, data }));
    await router.push('/medicine_vouchers/medicine_vouchers-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit medicine_vouchers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit medicine_vouchers'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='VoucherNumber'>
                <Field name='voucher_number' placeholder='VoucherNumber' />
              </FormField>

              <FormField label='Amount'>
                <Field type='number' name='amount' placeholder='Amount' />
              </FormField>

              <FormField label='TransactionDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.transaction_date
                      ? new Date(
                          dayjs(initialValues.transaction_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      transaction_date: date,
                    })
                  }
                />
              </FormField>

              <FormField label='organizations' labelFor='organizations'>
                <Field
                  name='organizations'
                  id='organizations'
                  component={SelectField}
                  options={initialValues.organizations}
                  itemRef={'organizations'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/medicine_vouchers/medicine_vouchers-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditMedicine_vouchers.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MEDICINE_VOUCHERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMedicine_vouchers;
