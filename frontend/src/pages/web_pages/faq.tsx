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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is a comprehensive pharmaceutical management solution designed to streamline operations. It offers features like prescription management, inventory control, and secure payment processing to enhance efficiency.',
    },
    {
      question: "How can ${projectName} improve my pharmacy's operations?",
      answer:
        'By automating routine tasks and providing real-time data, ${projectName} helps reduce errors, improve accuracy, and save time, allowing you to focus on patient care.',
    },
    {
      question: 'Is my data secure with ${projectName}?',
      answer:
        'Yes, we prioritize data security with advanced encryption and secure access controls, ensuring all sensitive information is protected and compliant with industry standards.',
    },
    {
      question: 'Can I customize ${projectName} to fit my needs?',
      answer:
        'Absolutely! ${projectName} is highly customizable, allowing you to tailor its features to meet the specific requirements of your pharmacy or organization.',
    },
    {
      question: 'What kind of support does ${projectName} offer?',
      answer:
        'We provide 24/7 customer support via email and phone. Our dedicated team is ready to assist you with any questions or issues you may encounter.',
    },
    {
      question: 'Does ${projectName} offer integration with other systems?',
      answer:
        'Yes, ${projectName} is designed to integrate seamlessly with various third-party systems, including accounting and shipping services, for a cohesive workflow.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`FAQ | Your Questions Answered about ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, services, and how we can assist you in optimizing your pharmaceutical operations.`}
        />
      </Head>
      <WebSiteHeader projectName={'pharmaceutical website'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'pharmaceutical website'}
          image={['Customer support answering questions']}
          mainText={`Get Answers with ${projectName} FAQ`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, services, and how we can support your pharmaceutical operations.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'pharmaceutical website'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'pharmaceutical website'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Support team ready to help']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions? Contact us anytime, and our team will respond promptly to assist you with your pharmaceutical management needs.`}
        />
      </main>
      <WebSiteFooter projectName={'pharmaceutical website'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
