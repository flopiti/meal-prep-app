import MealListAdmin from "@/components/Admin/MealListAdmin/MealListAdmin";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Admin() {
    return (
        <div>
        <h1>Admin</h1>
        <MealListAdmin />
        </div>
    );
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
      