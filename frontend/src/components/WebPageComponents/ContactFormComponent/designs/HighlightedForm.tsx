import React from 'react';
import { Formik, Form, Field } from 'formik';
import BaseButton from '../../../BaseButton';
import BaseIcon from '../../../BaseIcon';
import * as icon from '@mdi/js';
import { ContactFormDesigns } from '../../designs';
import FormField from '../../../../components/FormField';
import { useAppSelector, useAppDispatch } from '../../../../stores/hooks';
const HighlightedForm = ({ mainText, subTitle, onSubmit, design }) => {
  const corners = useAppSelector((state) => state.style.corners);
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);

  return (
    <div className='p-8 lg:py-24 lg:px-0 mx-auto container'>
      <div
        className={`${corners !== 'rounded-full' ? corners : 'rounded-3xl'} ${
          design === ContactFormDesigns.HIGHLIGHTED_DIVERSITY
            ? 'bg-blue-700 bg-opacity-25 '
            : 'bg-blue-700'
        }  p-12 mb-16`}
      >
        <div className='grid md:grid-cols-2 gap-12'>
          <div
            className={`${
              design === ContactFormDesigns.HIGHLIGHTED_DIVERSITY
                ? 'text-black'
                : ' text-white  '
            } `}
          >
            <h2 className='mb-6 text-3xl font-bold'>{mainText}</h2>
            <p className='mb-10 font-light text-base'>{subTitle}</p>
            <div className='space-y-2'>
              <p
                className={` ${
                  design === ContactFormDesigns.SIMPLE_CLEAN_DIVERSITY
                    ? `${textSecondary}`
                    : ''
                } flex items-center`}
              >
                <BaseIcon
                  className={`mr-2`}
                  w='w-5'
                  h='h-5'
                  size={48}
                  path={icon.mdiPhoneOutline}
                />
                +1XXX XXXX XXX
              </p>
              <p className='flex items-center'>
                <BaseIcon
                  className={`mr-2`}
                  w='w-5'
                  h='h-5'
                  size={48}
                  path={icon.mdiEmailOutline}
                />
                <a href='mailto:krystsinavaida@gmail.com'>
                  krystsinavaida@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div>
            <Formik
              initialValues={{
                email: '',
                subject: '',
                message: '',
              }}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form
                  className={` ${bgColor} space-y-6 p-8 ${
                    corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
                  } `}
                >
                  <FormField websiteBg>
                    <Field
                      name='email'
                      type='email'
                      placeholder='Email'
                      required
                      className=''
                    />
                  </FormField>

                  <FormField websiteBg>
                    <Field
                      name='subject'
                      type='text'
                      placeholder='Subject'
                      required
                      className=''
                    />
                  </FormField>

                  <FormField websiteBg>
                    <Field
                      name='message'
                      as='textarea'
                      placeholder='Message'
                      required
                      className=''
                    />
                  </FormField>

                  <BaseButton
                    type='submit'
                    color='info'
                    className='w-1/2 md:w-1/4  text-sm mt-4'
                    label={isSubmitting ? 'Sending...' : 'Contact Us'}
                    disabled={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightedForm;
