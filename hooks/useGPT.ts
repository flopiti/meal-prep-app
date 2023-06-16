import axios from "axios";
import { useState } from 'react';

export const useGPT = () => {
    const [isLoading, setIsLoading] = useState(false);

    const makeRequest = async (options:any) => {
        setIsLoading(true);
        try {
            if (options.authenticated) {
                options.config.headers = {
                    ...options.config.headers,
                };
            }
            const response = await axios(options.config);
            const { data } = response;
            setIsLoading(false);
            return data;
        } catch (error:any) {
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                console.log('error')
                return error.response.data;
            }
            return error.message;
        }
    };

    const AskChat = async (prompt: string) => {
        const options = {
            config: {
                method: 'POST',
                url: `/api/GPT`,
                data: JSON.stringify({ prompt }),  // Changed 'body' to 'data' for axios request
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            authenticated: true,
        };
        try {
            const data = await makeRequest(options);
            return data;
        } catch (error) {
            console.error(`Error in AskChat: ${error}`);
            throw error;  // Or handle error as needed
        }
    }
    return { AskChat, isLoading };
};
