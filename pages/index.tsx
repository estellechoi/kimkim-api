import AppLogo from '@/components/AppLogo';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
  return (
    <main role="main" className="flex flex-col items-center gap-y-20 min-h-screen pt-app_header_height pb-page_bottom">
      <AppLogo size="lg" className="mt-14" />

      <span className="flex items-baseline gap-x-3">
        <span className="Font_caption_sm">Visit KimKim at</span>
        <a className="inline Font_body_sm hover:text-semantic_info hover:underline" href="https://kimkim.app">
          https://kimkim.app
        </a>
      </span>
    </main>
  );
};

export default Home;
