import React from 'react';
import BaseIcon from '../../../BaseIcon';
import * as icon from '@mdi/js';

const IconsTop = ({
  features,
  projectName,
  withBg,
  iconsColor,
  mainText,
  subTitle,
  textSecondary,
  websiteSectionStyle,
}) => (
  <div className={``}>
    <div className='container p-8 lg:px-0 py-24 mx-auto'>
      <div className='text-center '>
        <h2 className='text-3xl font-bold'> {mainText}</h2>
        <p className={`text-md  mx-auto  mt-4`}>{subTitle}</p>
      </div>

      <div className='flex flex-wrap mx-4'>
        {features.map((feature: any, index) => (
          <div key={index} className='w-full sm:w-1/2 md:w-1/3 px-4 mt-8'>
            <div className='flex justify-center mb-2'>
              <BaseIcon
                className={`${iconsColor}`}
                w='w-16'
                h='h-16'
                size={48}
                path={icon[feature.icon] ? icon[feature.icon] : icon.mdiLeaf}
              />
            </div>
            <div className='text-center'>
              <h4 className='text-xl md:text-2xl font-medium'>
                {feature.name.replace(/\${projectName}/g, projectName)}
              </h4>
              <p className={`  mt-4`}>
                {feature.description.replace(/\${projectName}/g, projectName)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default IconsTop;
