import MealListAdmin from "@/components/Admin/MealListAdmin/MealListAdmin";
import IngredientList from "@/components/IngredientList";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Admin() {
    return (
        <div>
        <h1>Admin</h1>
        <h3>Meals</h3>
        <MealListAdmin />
        <h3>Ingredients</h3>
        <IngredientList />
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
      