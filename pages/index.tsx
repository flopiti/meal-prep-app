import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import MobileApp from '@/components/_layouts/MobileApp'
import WebApp from '@/components/_layouts/WebApp'
import { ScheduledMealProvider } from '@/providers/ScheduledMealContext'
import { MealProvider } from '@/providers/MealContext'
import FontFaceObserver from 'fontfaceobserver';

const Home: React.FC = () => {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    const font = new FontFaceObserver('FugazOne');
    const font2 = new FontFaceObserver('Galada');
  
    Promise.all([font.load(), font2.load()]).then(() => {
      setFontLoaded(true);
    });
  
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);  

  if (!fontLoaded) {
    return <></>;
}
  return (
    <ScheduledMealProvider>
      <MealProvider>
        <main style={{height: '96vh'  }}>
          {
            isMobile ?
            <MobileApp/>
            :
            <WebApp/>
          }
        </main>
      </MealProvider>
    </ScheduledMealProvider>
  )
}

export default Home;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
    };
  },
});
