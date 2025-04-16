import React from 'react';

const LargeNumbers = ({
  features,
  projectName,
  withBg,
  iconsColor,
  mainText,
  subTitle,
  textSecondary,
  websiteSectionStyle,
}) => (
  <div className={`${withBg ? `bg-blue-700 bg-opacity-25` : ''}`}>
    <div className='container p-8 lg:px-0 py-24 mx-auto'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold'> {mainText}</h2>
        <p className={` text-md  mx-auto  mt-4 `}>{subTitle}</p>
      </div>

      <div className='flex flex-wrap mx-4'>
        {features.map((feature: any, index) => (
          <div
            key={index}
            className='w-full sm:w-1/2 md:w-1/3 p-4 mt-8 relative'
          >
            <div className='flex justify-center mb-2'>
              <div className='relative'>
                <span
                  className={`${
                    withBg ? '' : `${iconsColor}`
                  } opacity-70 text-7xl font-bold absolute inset-0 flex items-center justify-center`}
                >
                  {index + 1}
                </span>
              </div>
            </div>
            <div className='text-center relative'>
              <h4 className={`  text-xl md:text-2xl font-medium relative z-10`}>
                {feature.name.replace(/\${projectName}/g, projectName)}
              </h4>
              <p className={`mt-4 relative z-10`}>
                {feature.description.replace(/\${projectName}/g, projectName)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LargeNumbers;
