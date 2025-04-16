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
} from '../../stores/drug_interactions/drug_interactionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditDrug_interactions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    drug_name: '',

    interaction_details: '',

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { drug_interactions } = useAppSelector(
    (state) => state.drug_interactions,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { drug_interactionsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: drug_interactionsId }));
  }, [drug_interactionsId]);

  useEffect(() => {
    if (typeof drug_interactions === 'object') {
      setInitialValues(drug_interactions);
    }
  }, [drug_interactions]);

  useEffect(() => {
    if (typeof drug_interactions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = drug_interactions[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [drug_interactions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: drug_interactionsId, data }));
    await router.push('/drug_interactions/drug_interactions-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit drug_interactions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit drug_interactions'}
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
              <FormField label='DrugName'>
                <Field name='drug_name' placeholder='DrugName' />
              </FormField>

              <FormField label='InteractionDetails' hasTextareaHeight>
                <Field
                  name='interaction_details'
                  as='textarea'
                  placeholder='InteractionDetails'
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
                    router.push('/drug_interactions/drug_interactions-list')
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

EditDrug_interactions.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DRUG_INTERACTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDrug_interactions;
