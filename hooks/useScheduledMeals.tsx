import { ScheduledMeal } from "@/types/ScheduledMealType";
import axios, { AxiosResponse } from "axios";

export const useScheduledMeals = () => {
    const makeRequest = async (options:any) => {  
      try {
        if (options.authenticated) {
          options.config.headers = {
            ...options.config.headers,
          };
        }
        const response = await axios(options.config);
        const { data } = response;
        return data;
      } catch (error:any) {
        if (axios.isAxiosError(error) && error.response) {
          console.log('error')
          return error.response.data;
        }
        return error.message;
      }
    };

    const postScheduledMeal = async (date: string,  mealType:string, mealId:number) => {
        const options = {
            config: {
            method: 'POST',
            url: `/api/scheduled-meals`,
            data: {date, mealType, mealId}
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const getScheduledMeals = async () => {
        const options = {
            config: {
            method: 'GET',
            url: `/api/scheduled-meals`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const putScheduledMeal = async (id:number, mealName: string, date: string, mealType:string, iconUrl:string) => {
        const options = {
            config: {
            method: 'PUT',
            url: `/api/scheduled-meals`,
            data: {id, mealName, date, mealType, iconUrl}
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const deleteScheduledMeal = async (id:number) => {
        const options = {
            config: { 
            method: 'DELETE',
            url: `/api/scheduled-meals`,
            data: {id}
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

        return { getScheduledMeals, postScheduledMeal, deleteScheduledMeal, putScheduledMeal };
    }