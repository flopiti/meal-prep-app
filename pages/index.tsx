import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import MobileApp from "@/components/_layouts/MobileApp";
import WebApp from "@/components/_layouts/WebApp";
import { MealProvider } from "@/providers/MealContext";
import FontFaceObserver from "fontfaceobserver";
import { SkeletonTheme } from "react-loading-skeleton";

const Home = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    const font = new FontFaceObserver("FugazOne");
    const font2 = new FontFaceObserver("Galada");

    Promise.all([font.load(), font2.load()]).then(() => {
      setTimeout(() => {
        setFontLoaded(true);
      }, 5000);
    });

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <MealProvider>
      <SkeletonTheme baseColor="#B4A28A" highlightColor="#207765">
        <main style={{ height: "96vh" }}>
          {isMobile ? <MobileApp /> : <WebApp />}
        </main>
      </SkeletonTheme>
    </MealProvider>
  );
};

export default Home;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale || "en", ["common"])),
      },
    };
  },
});
