# Ricardo Ardiles Cloud Developer Project "Serveless Todo"

# Getting Started

This repository contains backend and client code of the project Serveless. The base code is in [c4-final-project-starter-code](https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code)

As we learned in class, this project is divided in 2 parts:
* backend
* client

There are variables that should be configured in Secret Manager but they were explicitly left in the repository for evaluation but I understand that for security and good practices they should not be.

## Backend

Backend folder contains the serveless application that run in AWS CloudFormation. The latest version is deployed in:
```
https://yd2x70r2bf.execute-api.us-east-2.amazonaws.com/dev/
```
```
Endpoints:
  GET - https://yd2x70r2bf.execute-api.us-east-2.amazonaws.com/dev/todos
  POST - https://yd2x70r2bf.execute-api.us-east-2.amazonaws.com/dev/todos
  PATCH - https://yd2x70r2bf.execute-api.us-east-2.amazonaws.com/dev/todos/{todoId}
  DELETE - https://yd2x70r2bf.execute-api.us-east-2.amazonaws.com/dev/todos/{todoId}
  POST - https://yd2x70r2bf.execute-api.us-east-2.amazonaws.com/dev/todos/{todoId}/attachment
```

```
Functions:
  Auth: serverless-todo-app-ardiles-dev-Auth
  GetTodos: serverless-todo-app-ardiles-dev-GetTodos
  CreateTodo: serverless-todo-app-ardiles-dev-CreateTodo
  UpdateTodo: serverless-todo-app-ardiles-dev-UpdateTodo
  DeleteTodo: serverless-todo-app-ardiles-dev-DeleteTodo
  GenerateUploadUrl: serverless-todo-app-ardiles-dev-GenerateUploadUrl
```

* region: us-east-2
* apiId: yd2x70r2bf

### serveless.yml

backend/serveless.yml contains all structure to deploy in AWS (Resources, Environment, IamRole, Functions)

## Client

Client folder contains Web App deployed to connect with the backend with Auth0 Security. 

client/src/config.ts contains the configuration to connect:

```typescript
const apiId = 'yd2x70r2bf'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-viwwox7z.us.auth0.com',            // Auth0 domain
  clientId: 'pNR9x4bK4l2uKKd4VWozvl5Auqprwt3m',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
```

## Folder Structure 

I used folder structure learned in class:

    .
    ├── deployment_screenshots  # All screnshots of the work done.
    │   └── ...  
    ├── src                     # Source files 
    │   ├── config
    │   │   └── config.ts
    │   ├── controllers
    │   │   └── v0
    │   │   │   ├── image-filter
    │   │   │   │   ├── routes
    │   │   │   │   │   ├── util
    │   │   │   │   │   │   └── ...
    │   │   │   │   │   └── image-filter.router.ts
    │   │   │   ├── index.router.ts
    │   │   │   └── model.router.ts
    │   ├── routes
    │   ├── server.ts 
    │   └── ...    
    ├── cloud-cdnd-c2-final-ricardo-ardiles.postman_collection.json  
    ├── package.json                 
    ├── tsconfig.json
    ├── README.md
    └── ...

## Images

Images folder contains evidence of the operation and deployment of the application.

* Auth0 - Configuration
* Auth0 - Login
* AWS - ApiGateway
* AWS - CloudFormation
* AWS - X Ray Analytics
* AWS - X Ray Map
* AWS - X Ray Traces
* Postman - CreateTodo Validation
* Postman - CreateTodo
* Postman - DeleteTodo
* Postman - Get Attachment URL signed url
* Postman - Get Attachment URL
* Postman - GetTodos
* Postman - UpdateTodo Validation
* Postman - UpdateTodo
* Web - Check Todo
* Web - First Todo
* Web - Upload Image1
* Web - Upload Image2
* Web - Upload Image3
