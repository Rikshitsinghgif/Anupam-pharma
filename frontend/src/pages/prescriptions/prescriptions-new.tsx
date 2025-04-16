import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/prescriptions/prescriptionsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  prescription_code: '',

  pharmacist: '',

  patient_record: '',

  issue_date: '',

  expiry_date: '',

  organizations: '',
};

const PrescriptionsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/prescriptions/prescriptions-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    issue_date:
                      moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    expiry_date:
                      moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='PrescriptionCode'>
                <Field
                  name='prescription_code'
                  placeholder='PrescriptionCode'
                />
              </FormField>

              <FormField label='Pharmacist' labelFor='pharmacist'>
                <Field
                  name='pharmacist'
                  id='pharmacist'
                  component={SelectField}
                  options={[]}
                  itemRef={'pharmacists'}
                ></Field>
              </FormField>

              <FormField label='PatientRecord' labelFor='patient_record'>
                <Field
                  name='patient_record'
                  id='patient_record'
                  component={SelectField}
                  options={[]}
                  itemRef={'patient_records'}
                ></Field>
              </FormField>

              <FormField label='IssueDate'>
                <Field
                  type='datetime-local'
                  name='issue_date'
                  placeholder='IssueDate'
                />
              </FormField>

              <FormField label='ExpiryDate'>
                <Field
                  type='datetime-local'
                  name='expiry_date'
                  placeholder='ExpiryDate'
                />
              </FormField>

              <FormField label='organizations' labelFor='organizations'>
                <Field
                  name='organizations'
                  id='organizations'
                  component={SelectField}
                  options={[]}
                  itemRef={'organizations'}
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
                    router.push('/prescriptions/prescriptions-list')
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

PrescriptionsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PRESCRIPTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PrescriptionsNew;
