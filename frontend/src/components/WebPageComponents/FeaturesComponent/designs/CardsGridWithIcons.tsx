import React from 'react';
import BaseIcon from '../../../BaseIcon';
import * as icon from '@mdi/js';
import { FeaturesDesigns } from '../../designs';

const CardsGridWithIcons = ({
  features,
  projectName,
  design,
  iconsColor,
  corners,
  mainText,
  subTitle,
  websiteSectionStyle,
  textSecondary,
  borders,
  shadow,
}) => (
  <div className={``}>
    <div className='container p-8 lg:px-0 py-24 mx-auto'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl  font-bold'> {mainText}</h2>
        <p className={` text-md   mx-auto  mt-4 `}>{subTitle}</p>
      </div>

      <div
        className={`grid gap-6 ${
          features.length === 3
            ? 'grid-cols-1 sm:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {features.map((feature: any, index) => (
          <div
            key={index}
            className={`flex flex-col  ${
              design === FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY
                ? 'bg-blue-700 text-white'
                : 'bg-gray-100'
            } p-6 ${
              corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
            }  border ${borders}  h-full`}
          >
            <div className='flex-grow'>
              <h4 className='text-base sm:text-lg md:text-xl font-medium'>
                {feature.name.replace(/\${projectName}/g, projectName)}
              </h4>
              <p className={`  mt-2 text-sm sm:text-base`}>
                {feature.description.replace(/\${projectName}/g, projectName)}
              </p>
            </div>
            <div className='mt-auto flex justify-start'>
              <BaseIcon
                className={`${
                  design === FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY
                    ? ''
                    : `${iconsColor}`
                }`}
                w='w-12 sm:w-16'
                h='h-12 sm:h-16'
                size={48}
                path={icon[feature.icon] ? icon[feature.icon] : icon.mdiLeaf}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CardsGridWithIcons;
