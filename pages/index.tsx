import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import MobileApp from '@/components/_layouts/MobileApp'
import WebApp from '@/components/_layouts/WebApp'
import { ScheduledMealProvider } from '@/providers/ScheduledMealContext'
import { MealProvider } from '@/providers/MealContext'
import FontFaceObserver from 'fontfaceobserver';

export default function Home() {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const font = new FontFaceObserver('FugazOne');
    const font2 = new FontFaceObserver('Galada');
    font.load().then(() => {
      setFontLoaded(true);
  });
    font2.load().then(() => {
      setFontLoaded(true);
  });
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  if (!fontLoaded) {
    return <></>;
}
  return (
    <ScheduledMealProvider>
      <MealProvider>
        <div style={{height: '96vh'  }}>
          {
            isMobile ?
            <MobileApp/>
            :
            <WebApp/>
          }
        </div>
      </MealProvider>
    </ScheduledMealProvider>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
    };
  },
});
