# Prerequisites

## Access to the Glue42 JFrog Repository
The package @glue42/server-admin-ui resides in the private Glue42 JFrog Repository: [https://glue42.jfrog.io/](https://glue42.jfrog.io/)  

Once you have access to that, you can set up `npm` to access this repository natively. One possibility is to add a `.npmrc` file in the project directory with the following contents:
```pre
@glue42:registry=https://glue42.jfrog.io/artifactory/api/npm/default-npm-virtual/
//glue42.jfrog.io/artifactory/api/npm/default-npm-virtual/:_auth=<AUTH_PLACEHOLDER>
//glue42.jfrog.io/artifactory/api/npm/default-npm-virtual/:always-auth=true
```  

You can get the information you need to put in the placeholders from the JFrom Repository:  
1. Go to [https://glue42.jfrog.io/](https://glue42.jfrog.io/) and log in.  
2. Go to `Artifactory` -> `Quick Setup` -> `npm`  
3. Select "default-npm-virtual" from the `Repository` drop down, then enter your password and click on `"Generate Token & Create Instructions"`.  
4. The necessary configuration/auth details will be displayed.  

# Host the Admin UI Application Locally
From a command prompt:  
1. Install the package dependencies:  
```pre
npm install
```  

2. Start the React dev server which will host the application locally:  
```pre
npm run start
```  

With default configuration, the Admin UI application will be available at [http://localhost:3000](http://localhost:3000).  
No login is required.  

# Notes
The sample requires no authentication for the special `admin` user.  
Currently, the default implementation of the Admin UI only shows information stored in the server's database.  
As users' group membership and authorizations in this example are dynamically provided by a custom authenticator and not stored in the server's database, the Admin UI screens related to user authorizations and group membership will not reflect the dynamically provided information.  
