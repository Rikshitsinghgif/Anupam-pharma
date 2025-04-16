import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'pharmaceutical website';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const faqs = [
    {
      question: 'How can I contact ${projectName} support?',
      answer:
        'You can reach our support team via the contact form on this page. We are available 24/7 to assist you with any inquiries or issues.',
    },
    {
      question: 'What services does ${projectName} offer?',
      answer:
        '${projectName} provides a range of services including prescription management, inventory control, and secure payment processing to streamline pharmaceutical operations.',
    },
    {
      question: 'Is there a demo available for ${projectName}?',
      answer:
        'Yes, we offer a demo version of ${projectName} so you can explore its features and see how it can benefit your operations before making a commitment.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize data security with advanced encryption and secure access controls, ensuring all sensitive information is protected and compliant with industry standards.',
    },
    {
      question: 'Can ${projectName} integrate with other systems?',
      answer:
        'Yes, ${projectName} is designed to integrate seamlessly with various third-party systems, including accounting and shipping services, for a cohesive workflow.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us | Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or support. Our team is here to assist you with all your pharmaceutical management needs. Contact us today!`}
        />
      </Head>
      <WebSiteHeader projectName={'pharmaceutical website'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'pharmaceutical website'}
          image={['Customer service team ready']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Reach out to ${projectName} and let us assist you in optimizing your pharmaceutical operations.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'pharmaceutical website'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'pharmaceutical website'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Team ready to assist you']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need support? Contact us anytime, and our team will respond promptly to assist you with your pharmaceutical management needs.`}
        />
      </main>
      <WebSiteFooter projectName={'pharmaceutical website'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
