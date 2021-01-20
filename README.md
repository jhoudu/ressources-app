# Prototype of Back-Office

Back-office with the following functions :  

* Authentication and authorization
* CRUD of Web resources list (title, description, link)
* CUD authorized only if connected and have the role for

## Usage
docker-compose --project-name ressources-app --env-file ./.env up  

## Frontend
http://localhost:3000/  
Login : jehoudu / kepass  

## Servers

Name         | Description   | Located at
------------ | ------------- | -------------
Node.js/Razzle | Server Frontend | http://localhost:3000/
Keycloack | Authentication & Authorization | http://localhost:8080/
PostgREST | RESTFull API for PostgreSQL | http://localhost:3003/
PostgreSQL | SGBD | 
Swagger | Visual overview of the API | http://localhost:8088/

## Docker
docker-compose for all servers.  
Initialization of Postgres and Keycloak  

## Javascript libraries

Name         | Description
------------ | -------------
ReactJS | For building user interfaces
Razzle | For Server Side Redering
antd | For design




