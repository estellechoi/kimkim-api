import AppLogo from '@/components/AppLogo';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
  return (
    <main role="main" className="flex flex-col items-center gap-y-20 min-h-screen pt-app_header_height pb-page_bottom">
      <AppLogo size="lg" />

      <span className="flex items-baseline gap-x-2">
        <span className="Font_caption_sm">Visit us at</span>
        <a className="inline Font_body_sm hover:text-semantic_info hover:underline" href="https://kimkim.app">
          https://kimkim.app
        </a>
      </span>
    </main>
  );
};

export default Home;
