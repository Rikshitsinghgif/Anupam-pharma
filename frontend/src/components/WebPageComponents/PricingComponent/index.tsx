import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../../../stores/hooks';
import BaseButton from '../../BaseButton';
import BaseIcon from '../../BaseIcon';
import * as icon from '@mdi/js';

export default function PricingSection({
  projectName,
  withBg = 0,
  features,
  description,
}) {
  const textColor = useAppSelector((state) => state.style.linkColor);
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const borders = useAppSelector((state) => state.style.borders);
  const shadow = useAppSelector((state) => state.style.shadow);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const websiteSectionStyle = useAppSelector(
    (state) => state.style.websiteSectionStyle,
  );
  const navBarItemLabelActiveColorStyle = useAppSelector(
    (state) => state.style.navBarItemLabelActiveColorStyle,
  );
  const asideMenuItemActiveStyle = useAppSelector(
    (state) => state.style.asideMenuItemActiveStyle,
  );
  const corners = useAppSelector((state) => state.style.corners);
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const activeLinkColor = useAppSelector(
    (state) => state.style.activeLinkColor,
  );

  return (
    <section className={` ${withBg ? 'bg-gray-100' : `bg-white`}`}>
      <div className='py-8 px-4 mx-auto lg:py-24 lg:px-0 container'>
        <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-10'>
          <p className={`text-md ${textSecondary}  mx-auto `}>
            Choose the plan that’s right for you
          </p>
          <div className='pt-4 text-3xl font-bold'>Pricing Table</div>
        </div>
        <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
          <div className='flex flex-col p-6 mx-auto max-w-lg  h-full  xl:p-8 '>
            <div className='flex-grow'>
              <h3 className=' text-2xl font-semibold'>Standard</h3>
              <p className='font-light text-sm mb-4'>
                {description['standard']
                  ? description['standard']
                  : 'For solo designer'}
              </p>
              <hr className={`${borders}`} />
              <div>
                <div className='flex  items-start mt-4'>
                  <BaseIcon
                    className={`${iconsColor} mx-0 px-0`}
                    size={24}
                    path={icon.mdiCurrencyUsd}
                  />
                  <p className='mt-1 text-5xl font-bold'>29</p>
                </div>
                <p className={`font-light text-xs ${textSecondary}  mb-4`}>
                  per person, per month
                </p>
              </div>

              <ul
                role='list'
                className={`my-4 space-y-4 text-base font-normal ${textSecondary} text-left`}
              >
                {features.standard.features.map((feature, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <BaseIcon
                      className='text-green-500 mx-0 px-0'
                      size={24}
                      path={icon.mdiCheck}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className='font-light text-sm mt-4'>Limited to</p>
              <ul
                role='list'
                className={`my-4 space-y-4 text-base font-normal ${textSecondary} text-left`}
              >
                {features.standard.limited_features.map((feature, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <BaseIcon
                      className={` mx-0 px-0 ${textSecondary}`}
                      size={24}
                      path={icon.mdiMinus}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BaseButton
              href='/login'
              label='Get Started'
              color='info'
              outline
              className='w-1/2 text-sm mt-4'
            />
          </div>

          <div
            className={`flex flex-col p-6 h-full mx-auto max-w-lg ${shadow} ${
              withBg ? `bg-white` : 'bg-gray-100'
            } ${
              corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
            }  xl:p-8 `}
          >
            <div className='flex-grow'>
              <h3 className=' text-2xl font-semibold'>
                Premium{' '}
                <span
                  className={`${
                    corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
                  } ml-2 bg-blue-600 text-white font-semibold  text-sm p-1 ${navBarItemLabelActiveColorStyle} `}
                >
                  MOST POPULAR
                </span>
              </h3>
              <p className='font-light text-sm mb-4'>
                {description['premium']
                  ? description['premium']
                  : ' For small startup and agency'}
              </p>
              <hr className={`${borders}`} />
              <div>
                <div className='flex  items-start mt-4'>
                  <BaseIcon
                    className={`${iconsColor} mx-0 px-0`}
                    size={24}
                    path={icon.mdiCurrencyUsd}
                  />
                  <p className='mt-1 text-5xl font-bold'>49</p>
                </div>
                <p className={`font-light text-xs  ${textSecondary} mb-4`}>
                  per person, per month
                </p>
              </div>

              <ul
                role='list'
                className={`my-4 space-y-4 text-base font-normal ${textSecondary} text-left`}
              >
                {features.premium.features.map((feature, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <BaseIcon
                      className='text-green-500 mx-0 px-0'
                      size={24}
                      path={icon.mdiCheck}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className='font-light text-sm mt-4'>Also Include</p>

              <ul
                role='list'
                className={`my-4 space-y-4 text-base font-normal ${textSecondary}  text-left`}
              >
                {features.premium.also_included.map((feature, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <BaseIcon
                      className='text-green-500 mx-0 px-0'
                      size={24}
                      path={icon.mdiCheck}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BaseButton
              href='/login'
              label='Get Started'
              color='info'
              className='w-1/2 text-sm mt-4'
            />
          </div>
          <div className='flex flex-col p-6 mx-auto max-w-lg  h-full  xl:p-8 '>
            <div className='flex-grow'>
              <h3 className=' text-2xl text-green-text font-semibold'>
                Business
              </h3>
              <p className='font-light text-green-text text-sm mb-4'>
                {description['business']
                  ? description['business']
                  : ' Custom solution'}
              </p>
              <hr className={`${borders}`} />
              <div>
                <div className='flex  items-start mt-4'>
                  <BaseIcon
                    className={`${iconsColor} mx-0 px-0`}
                    size={24}
                    path={icon.mdiCurrencyUsd}
                  />
                  <p className='mt-1 text-5xl font-bold'>99</p>
                </div>
                <p className={`font-light text-xs  ${textSecondary} mb-4`}>
                  per person, per month
                </p>
              </div>

              <ul
                role='list'
                className={`my-4 space-y-4 text-base font-normal ${textSecondary}  text-left`}
              >
                {features.business.features.map((feature, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <BaseIcon
                      className='text-green-500 mx-0 px-0'
                      size={24}
                      path={icon.mdiCheck}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BaseButton
              href='/login'
              label='Get Started'
              color='info'
              outline
              className='w-1/2 text-sm mt-4'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
