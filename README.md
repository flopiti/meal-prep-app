Things to do when using this skeleton to start a new project: 
1. If you copied locally, make sure to delete the .git and create a new one.
2. Change the package name
3. Create a .env.local file by copying the .env.template
4. Fill the values in the file and run the following for the AUTH0_SECRET:
```
openssl rand -hex 32
```
Base URL : http:localhost:3000
Issuer Base URL : https://{yourDomain}

5. Make sure that in the Auth0 application, you add the callback URL. (ex:http://localhost:3001/api/auth/callback)