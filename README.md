# Prototype of frontend for Back-Office

Frontend with following functions :  

* Authentication and authorization
* Web resources list (title, description, link) with:
  * CRUD
  * CRD authorized only if connected and have the role for

## Usage
docker-compose --project-name ressources-app --env-file ./.env up  

## Frontend
http://localhost:3000/  
Login : jehoudu / kepass  

## Servers

Name         | Description   | Located at
------------ | ------------- | -------------
Node.js | Javascript runtime | http://localhost:3000/
Keycloack | Authentication & Authorization | http://localhost:8080/
PostgREST | RESTFull API for PostgreSQL | http://localhost:3003/
PostgreSQL | SGBD | 
Swagger | Visual overview of the API | http://localhost:8088/

## Docker
docker-compose except for node server.  
Initialization of Postgres and Keycloak  

## Javascript libraries

Name         | Description
------------ | -------------
ReactJS | For building user interfaces
Razzle | For Server Side Redering
antd | For design




