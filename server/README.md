# Prerequisites
## Storage
This sample server assumes there is a running locally installed MongoDB instance.  
To use a remote MongoDB store, modify the `connection` property inside "index.ts" accordingly.  

## Access to the Glue42 JFrog Repository
The package @glue42/server resides in the private Glue42 JFrog Repository: [https://glue42.jfrog.io/](https://glue42.jfrog.io/)  

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

# Start the Glue42 Server
From a command prompt:  
1. Install the package dependencies:  
```pre
npm install
```  

2. Start the server:  
```pre
npm run start
```  

You should see server initialization log messages in the console:  
```pre
[INFO] index - ========= Glue42 Server 0.17.0 (test-server) =========
...
...
[INFO] index - server started.
```  

# Sample Components

## index.ts
This is the startup entry point.  
Contains server configuration parameters, incl. the injection of the custom authenticator.  
You can add any additional initialization (e.g. of the external services) here.  

## autenticator.ts
This contains the main logic flow of the custom authenticator:  
* Extract the user id and authentication token from the incoming request.  
* Validate the authentication token.  
* (optional) Get user configuration from cache.  
* Fetch raw user information (groups, permissions) from an external service.  
* Map the raw user information into Glue42 Server user information: this includes group membership and authorization for applications and layouts.  
* Pass the user information down the request processing chain.  

## ExtServices\AuthService.ts
This is a mock implementation of accessing an extarnal service to fetch raw user information / authorization.  
Contains hardcoded information about 3 users: `"user1"`, `"user2"` and `"guest"`.  

## ExtServices\MappingService.ts
This contains sample implementation of converting external raw user information into Glue42 Server user information.  
Contains hardcoded mapping from permissions obtained from the mock auth service to Glue42 Server user information.  

## ExtServices\CacheService.ts
This is a placeholder for a caching service. Simplest implementation could just store the user information in memory, e.g. in a dictionary where the user id is key and the Glue42 Server user information is value.  

# Client Configuration

You need to make configuration changes in the `system.json` configuration file for Glue42 Enterprise.  
The examples below assume the server example repository has been checked out locally and is running with default configuration.  
If the server is running on a remote machine, change the URLs accordingly and make sure that the required firewall settings are in place.  

* To enable using server, add the following property at the top level (`url` assumes the server is running locally):  
```json
...
"server": {
    "enabled": true,
    "url": "http://localhost:4356/api"
},
...
```  

* To enable the login screen, add the following property at the top level, replacing `"path_to_checkout_dir"` with the path to where the server example repository has been checked out:  
```json
...
"ssoAuth": {
    "authController": "sso",
    "options": {
        "url": "file://path_to_checkout_dir/login/login.html",
        "window": {
            "width": 500,
            "height": 500,
            "mode": "flat"
        }
    }
},
...
```  

* (optional) Remove/Disable the local application stores - make sure the `"appStores"` property's value is an empty array:  

```json
...
"appStores": [],
...
```  

# Application and Layout Definitions
You can import the application and layout definitions referenced by the sample mapping service using the server Admin UI.  The default Admin UI included in this example repository will run on [http://localhost:3000](http://localhost:3000) by default.  

## Application Definitions
* In the Admin UI, go to `Apps` -> `Application List`.  
* Click on `"Import"`.  
* Copy the contents of the provided `appDefinitionsExample.json` and paste them inside the text area, then click on `"Continue"`.  
* Select `No` for the `"Public Application"` propery, then click on `"Continue"`.  
* Click on `"Import"` and then on `"Finish"`.  
* You should now see `"app01"`, `"app02"`, `"app03"`, `"app99"` and a few applications related to managing workspaces in the list of available applications.  

## Layout Definitions
* In the Admin UI, go to `Layouts` -> `Layout List`.  
* Click on `"Import"`.  
* Copy the contents of the provided `globalLayoutDefinitionExample.json` and paste them inside the text area, then click on `"Continue"`.  
* Select `No` for the `"Public Layout"` propery, then click on `"Continue"`.  
* Click on `"Continue"` and then on `"Finish"`.  
* You should now see `"Global01"` in the list of available layouts.  
* Repeat the steps above to import the contents of the provided `workspaceDefinitionExample.json`.  


# Starting Glue42 Enterprise
After you have made changes to the `system.json` configuration file as described above, next time Glue42 Enterprise is started you will be presented with the simple login screen included in this repository.  
* type in any of the user names available in the mock external authentiaction service: `"user1"`, `"user2"` or `"guest"`
* Click on `"Log in"` (no password is required)
* Note that the list of available applications and layouts for the logged in user will correspond to the ones returned by the server as per the configured authorizations and permission mapping.  

