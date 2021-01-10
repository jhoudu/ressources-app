#!/bin/bash

psql -d ${POSTGRES_DB} -U ${POSTGRES_USER} <<-END
	GRANT USAGE ON SCHEMA ${DB_SCHEMA} to todo_user;
    GRANT ALL ON api.ressources TO todo_user;
    GRANT USAGE, SELECT ON sequence api.ressources_id_seq TO todo_user;
END