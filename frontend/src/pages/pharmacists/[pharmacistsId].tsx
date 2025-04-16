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

import { update, fetch } from '../../stores/pharmacists/pharmacistsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPharmacists = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    prescriptions: [],

    patient_records: [],

    drug_interactions: [],

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { pharmacists } = useAppSelector((state) => state.pharmacists);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { pharmacistsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: pharmacistsId }));
  }, [pharmacistsId]);

  useEffect(() => {
    if (typeof pharmacists === 'object') {
      setInitialValues(pharmacists);
    }
  }, [pharmacists]);

  useEffect(() => {
    if (typeof pharmacists === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = pharmacists[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [pharmacists]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: pharmacistsId, data }));
    await router.push('/pharmacists/pharmacists-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pharmacists')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit pharmacists'}
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

              <FormField label='Prescriptions' labelFor='prescriptions'>
                <Field
                  name='prescriptions'
                  id='prescriptions'
                  component={SelectFieldMany}
                  options={initialValues.prescriptions}
                  itemRef={'prescriptions'}
                  showField={'prescription_code'}
                ></Field>
              </FormField>

              <FormField label='PatientRecords' labelFor='patient_records'>
                <Field
                  name='patient_records'
                  id='patient_records'
                  component={SelectFieldMany}
                  options={initialValues.patient_records}
                  itemRef={'patient_records'}
                  showField={'patient_name'}
                ></Field>
              </FormField>

              <FormField label='DrugInteractions' labelFor='drug_interactions'>
                <Field
                  name='drug_interactions'
                  id='drug_interactions'
                  component={SelectFieldMany}
                  options={initialValues.drug_interactions}
                  itemRef={'drug_interactions'}
                  showField={'drug_name'}
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
                  onClick={() => router.push('/pharmacists/pharmacists-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPharmacists.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PHARMACISTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPharmacists;
