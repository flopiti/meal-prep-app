import axios from "axios";

export const useIngredients = () => {
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
    const getIngredients = async () => {
        const options = {
            config: {
            method: 'GET',
            url: `/api/ingredients`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
    const getIngredient = async (id:string) => {
        const options = { 
            config: {
            method: 'GET',
            url: `/api/ingredients/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
    const createIngredient = async (ingredient:any) => { 
        const options = {

            config: {
            method: 'POST',
            url: `/api/ingredients`,
            data: ingredient,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }


    return { getIngredients, getIngredient, createIngredient };
    }