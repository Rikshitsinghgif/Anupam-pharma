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

import { update, fetch } from '../../stores/prescriptions/prescriptionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPrescriptionsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    prescription_code: '',

    pharmacist: null,

    patient_record: null,

    issue_date: new Date(),

    expiry_date: new Date(),

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { prescriptions } = useAppSelector((state) => state.prescriptions);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof prescriptions === 'object') {
      setInitialValues(prescriptions);
    }
  }, [prescriptions]);

  useEffect(() => {
    if (typeof prescriptions === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = prescriptions[el]),
      );
      setInitialValues(newInitialVal);
    }
  }, [prescriptions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/prescriptions/prescriptions-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit prescriptions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit prescriptions'}
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
                  options={initialValues.pharmacist}
                  itemRef={'pharmacists'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='PatientRecord' labelFor='patient_record'>
                <Field
                  name='patient_record'
                  id='patient_record'
                  component={SelectField}
                  options={initialValues.patient_record}
                  itemRef={'patient_records'}
                  showField={'patient_name'}
                ></Field>
              </FormField>

              <FormField label='IssueDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.issue_date
                      ? new Date(
                          dayjs(initialValues.issue_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, issue_date: date })
                  }
                />
              </FormField>

              <FormField label='ExpiryDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.expiry_date
                      ? new Date(
                          dayjs(initialValues.expiry_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, expiry_date: date })
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

EditPrescriptionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PRESCRIPTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPrescriptionsPage;
