import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import getConfig from "next/config";

const {serverRuntimeConfig } = getConfig();

export default handleAuth(
    {
        async login(req,res){
            try {
                await handleLogin(req, res, {
                    authorizationParams: {
                        audience: serverRuntimeConfig.auth0Audience,
                        scope : 'offline_access openid profile email',
                        redirect_uri: process.env.AUTH0_REDIRECT_URI, // Add this line
                    },
                    returnTo: process.env.NEXT_PUBLIC_AUTH0_RETURN_TO, // Add this line
                })
            }
            catch(error:any){

            }
        }
    },
);