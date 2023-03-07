import axios from "axios";

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

        return { getScheduledMeals };
    }