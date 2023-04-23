import axios from "axios";

export const useMeals = () => {
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
    const getMeals = async () => {
        const options = {
            config: {
            method: 'GET',
            url: `/api/meals`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
    const getMeal = async (id:string) => {
        const options = { 
            config: {
            method: 'GET',
            url: `/api/meals/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
    const createMeal = async (meal:any) => { 
        const options = {

            config: {
            method: 'POST',
            url: `/api/meals`,
            data: meal,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
    const likeMeal  = async (id:number) => {
        const options = {
            config: {
            method: 'POST',
            url: `/api/meals-like/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const unlikeMeal  = async (id: number) => {
        const options = {
            config: {
            method: 'DELETE',
            url: `/api/meals-like/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
        
    const getMealsLike = async () => {
        const options = {
            config: {
            method: 'GET',  
            url: `/api/meals-like`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    return { getMeals, getMeal, createMeal, likeMeal, unlikeMeal, getMealsLike };
    }