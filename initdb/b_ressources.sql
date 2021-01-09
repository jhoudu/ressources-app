--
-- Initialisation de la BDD.
--


BEGIN;

SET client_encoding = 'LATIN1';

create table api.ressources (
  id serial primary key,
  parcours text,
  titre text,
  lien text not null,
  description text,
  datepub timestamptz,
  source text,
  cible text,
  secteurs text,
  usages text
);

insert into api.ressources (titre, lien) values
  ('tuto 0 postgREST', 'https://postgrest.org/en/v7.0.0/tutorials/tut0.html');
  
  COMMIT;
