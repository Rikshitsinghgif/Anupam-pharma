// components/FAQ/FAQAccordion.js
import React, { useState } from 'react';

const FAQAccordion = ({
  faqs,
  projectName,
  textSecondary,
  corners,
  borders,
  mainText,
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className='mx-auto container p-8 lg:py-24 lg:px-0'>
        <div className='flex flex-col '>
          <div className='pb-14 text-center'>
            <h2 className='text-3xl lg:text-3xl  font-semibold lg:ffont-bold leading-9'>
              {mainText}
            </h2>
          </div>

          <div className='w-full'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border ${
                  corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
                }  border-2 mb-8 p-6 ${
                  openIndex === index ? 'border-blue-700' : borders
                }`}
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleFAQ(index)}
                >
                  <h3
                    className={` ${
                      openIndex === index ? 'text-blue-700' : ''
                    } text-base font-semibold`}
                  >
                    {faq.question.replace(/\${projectName}/g, projectName)}
                  </h3>
                  <span className='text-2xl text-blue-700'>
                    {openIndex === index ? '−' : '+'}
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={` ${textSecondary} mt-4 `}>
                    <p>{faq.answer.replace(/\${projectName}/g, projectName)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
