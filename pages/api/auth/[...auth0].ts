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
                        scope : 'offline_access openid profile email'
                    }
                })
            }
            catch(error:any){

            }
        }
    },
);