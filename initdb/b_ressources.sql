--
-- Initialisation de la BDD.
--


BEGIN;

SET client_encoding = 'UTF-8';

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

insert into api.ressources (parcours, titre, lien, description, datepub, source, cible, secteurs ) values
  ('Collègues','tuto 0 postgREST', 'https://postgrest.org/en/v7.0.0/tutorials/tut0.html', 'Premier tutorial pour manipuler PostgREST','2021-01-18T22:13:29.828+00:00','Internet', null, 'Formation');
insert into api.ressources (parcours, titre, lien, description, datepub, source, cible, secteurs ) values
  ('Amis','Scotch', 'https://www.tiktok.com/@caarlwin/video/6915810594624916738?sender_device=pc&sender_web_id=6894615265109476869&is_from_webapp=v2', 'Premier contenu trouvé sur TikTok','2021-01-19T22:13:29.828+00:00','TikTok', 'Pegi 3', 'Humour');
insert into api.ressources (parcours, titre, lien, description, datepub, source, cible, secteurs ) values
  ('Famille','La danse des robots', 'https://youtu.be/fn3KWM1kuAw', 'Un lien émouvant',null,'Youtube', 'Pegi 12', 'Variétés,Humour');  
COMMIT;
