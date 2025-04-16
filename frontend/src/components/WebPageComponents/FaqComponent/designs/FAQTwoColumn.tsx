import React from 'react';

const FAQTwoColumn = ({ faqs, projectName, textSecondary, mainText }) => (
  <div className={` `}>
    <div className='mx-auto container p-16  lg:py-24 lg:px-0'>
      <div className='flex flex-col  md:flex-row'>
        <div className='w-full md:w-1/3 pb-6 mr-8'>
          <p className='text-base font-semibold text-blue-700'>FAQ</p>
          <h2 className='text-3xl font-bold leading-9'>{mainText}</h2>
        </div>
        <div className='w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8'>
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className='text-xl font-semibold'>
                {faq.question.replace(/\${projectName}/g, projectName)}
              </h3>
              <p className={`${textSecondary}`}>
                {faq.answer.replace(/\${projectName}/g, projectName)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FAQTwoColumn;
