'use client';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { SEO } from '../next-seo.config';
import SentryErrorBoundary from '@/components/SentryErrorBoundary';
import Fallback from '@/components/Fallback';

const MyApp = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <title>KimKim</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#000" />
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      </Head>

      <NextSeo {...SEO} />

      <SentryErrorBoundary fallbackComponent={Fallback}>
        <Suspense>
          <Component />
        </Suspense>
      </SentryErrorBoundary>
    </>
  );
};

export default MyApp;
