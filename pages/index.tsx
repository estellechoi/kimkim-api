import AppLogo from '@/components/AppLogo';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
  return (
    <main role="main" className="flex flex-col items-center gap-y-20 min-h-screen pt-app_header_height pb-page_bottom">
      <AppLogo size="lg" />

      <span>
        Visit us at{' '}
        <a className="inline hover:text-semantic_info hover:underline" href="https://kimkim.app">
          https://kimkim.app
        </a>
      </span>
    </main>
  );
};

export default Home;
