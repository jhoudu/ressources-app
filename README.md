# Prototype of frontend for Back-Office

## Javascript libraries
Name         | Description
------------ | -------------
ReactJS | For building user interfaces
Razzle | For Server Side Redering
antd | For design

## Servers

Name         | Description   | Located at
------------ | ------------- | -------------
Node.js | Javascript runtime | http://localhost:3000/
Keycloack | Authentication & Authorization | http://localhost:8080/
PostgREST | RESTFull API for PostgreSQL | http://localhost:3003/
PostgreSQL | SGBD | 
Swagger | Visual overview of the API | http://localhost:8088/

## TODOs
Issue : keycloak variable not initialized on refresh

Manage keycloak with redux  
import * as AuthorizationActions from './framework/redux/modules/Authorization';  
https://github.com/czetsuya/keycloak-react/blob/master/src/AppInlineProfile.js


