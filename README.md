# Glue42 Server Example External Auth
This repository contains an example of a Glue42 Server custom implementation which simulates using an external system to authenticate and authorize users.  

# Repository Contents Summary

## Server Project
Located in the `server` directory.  
This project contains the implementation of the custom authenticator in Glue42 Server which takes care of user authentication and authorization.  
See detailed [README](./server/README.md)

## Admin UI Project
Located in the `admin-ui` directory.  
This project contains a sample Admin UI implementation which can be used to manage applications and layouts.  
The sample requires no authentication for the special `admin` user.  
 See detailed [README](./admin-ui/README.md)

## Login screen
Located in the `login` directory.  
This contains a very basic login page which can be used to log in with a specific username to the Glue42 Enterprise platform.  

## Application and Layout Definitions
Located in the repo root directory.  
* applicationDefinitionsExample.json   
* globalLayoutDefinitionExample.json  
* workspaceDefinitionExample.json  

These files contain definitions for the applications and layouts referenced by the sample custom authenticator.  
The definitions need to be imported in the server database - for details see the `"Application and Layout Definitions"` section in the server [README](./server/README.md)


# Notes
The sample custom authenticator in the `server` project is used for both authentication and authorization. This implementation does not require to store any user authorization information in the server's database while on the other hand requires dynamically fetching that user authorization information from an external system.  
Another possible implementation scenario may include importing the user and group authorization information inside the server's database (e.g. at specific intervals or upon request) while leaving only the authentication function to the custom authenticator.  

