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
} from '../../stores/inventory_managers/inventory_managersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditInventory_managers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    medicine_vouchers: [],

    transactions: [],

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { inventory_managers } = useAppSelector(
    (state) => state.inventory_managers,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { inventory_managersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: inventory_managersId }));
  }, [inventory_managersId]);

  useEffect(() => {
    if (typeof inventory_managers === 'object') {
      setInitialValues(inventory_managers);
    }
  }, [inventory_managers]);

  useEffect(() => {
    if (typeof inventory_managers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = inventory_managers[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [inventory_managers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: inventory_managersId, data }));
    await router.push('/inventory_managers/inventory_managers-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit inventory_managers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit inventory_managers'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='MedicineVouchers' labelFor='medicine_vouchers'>
                <Field
                  name='medicine_vouchers'
                  id='medicine_vouchers'
                  component={SelectFieldMany}
                  options={initialValues.medicine_vouchers}
                  itemRef={'medicine_vouchers'}
                  showField={'voucher_number'}
                ></Field>
              </FormField>

              <FormField label='Transactions' labelFor='transactions'>
                <Field
                  name='transactions'
                  id='transactions'
                  component={SelectFieldMany}
                  options={initialValues.transactions}
                  itemRef={'transactions'}
                  showField={'transaction_id'}
                ></Field>
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
                    router.push('/inventory_managers/inventory_managers-list')
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

EditInventory_managers.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_INVENTORY_MANAGERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditInventory_managers;
