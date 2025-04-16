import React from 'react';
import { FaqDesigns } from '../../designs';

const FAQSplitList = ({
  faqs,
  projectName,
  textSecondary,
  borders,
  mainText,
  websiteSectionStyle,
  design,
}) => (
  <div
    className={`${
      design === FaqDesigns.SPLIT_LIST_DIVERSITY
        ? 'bg-blue-700 '
        : `bg-blue-700 bg-opacity-25`
    } `}
  >
    <div
      className={`mx-auto container p-16 lg:py-24 lg:px-0  ${
        design === FaqDesigns.SPLIT_LIST_DIVERSITY
          ? ' text-white '
          : ' text-black'
      }`}
    >
      <div className='flex flex-col '>
        <div className=' pb-14'>
          <h2 className='text-3xl font-semibold lg:font-bold leading-9'>
            {mainText}
          </h2>
        </div>

        <div className='w-full'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b last:border-none  ${
                design === FaqDesigns.SPLIT_LIST_DIVERSITY
                  ? borders
                  : 'border-neutral-900/10'
              }   py-4 flex justify-between`}
            >
              <div className='w-full md:w-1/2'>
                <h3 className='text-base font-semibold '>
                  {faq.question.replace(/\${projectName}/g, projectName)}
                </h3>
              </div>

              <div className='w-full md:w-1/2'>
                <p
                  className={`${
                    design === FaqDesigns.SPLIT_LIST_DIVERSITY
                      ? ``
                      : `${textSecondary}`
                  } `}
                >
                  {faq.answer.replace(/\${projectName}/g, projectName)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FAQSplitList;
