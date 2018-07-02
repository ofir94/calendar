CREATE TABLE elemento_constructivo (elem_construct  TEXT,id_ec  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO elemento_constructivo VALUES ('Cimentación', 1);
INSERT INTO elemento_constructivo VALUES ('Estructura Vertical', 2);
INSERT INTO elemento_constructivo VALUES ('Estructura Horizontal', 3);
INSERT INTO elemento_constructivo VALUES ('Escaleras y rampas', 4);
INSERT INTO elemento_constructivo VALUES ('Cerramientos', 5);
INSERT INTO elemento_constructivo VALUES ('Voladizos y elementos singulares', 6);

CREATE TABLE estado_tecnico_constructivo (id_etc  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,fk_parcela  INTEGER,elem_construct  TEXT,caract_mater  TEXT,modif  TEXT,lesiones  TEXT,localizacion  TEXT,buen_estado  REAL,leve  REAL,grave  REAL,muy_grave  REAL,CONSTRAINT fkey0 FOREIGN KEY (elem_construct) REFERENCES elemento_constructivo (id_ec));

CREATE TABLE evaluacion_cultural (id_evaluacion_cultural  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,fk_parcela  INTEGER,categoria  INTEGER,criterio  INTEGER,info_recogida  TEXT,evaluacion  INTEGER,CONSTRAINT fkey0 FOREIGN KEY (categoria) REFERENCES evaluacion_cultural_categoria (id_eval_cult_categoria),CONSTRAINT fkey1 FOREIGN KEY (criterio) REFERENCES evaluacion_cultural_criterio (id_eval_cult_criterio),CONSTRAINT fkey2 FOREIGN KEY (evaluacion) REFERENCES evaluacion_cultural_evaluacion (id_eval_cult_evaluacion));

CREATE TABLE evaluacion_cultural_categoria (id_eval_cult_categoria  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,categoria  TEXT);

INSERT INTO evaluacion_cultural_categoria VALUES (1, 'Valor histórico');
INSERT INTO evaluacion_cultural_categoria VALUES (2, 'Valor urbanístico');
INSERT INTO evaluacion_cultural_categoria VALUES (3, 'Valor social');
INSERT INTO evaluacion_cultural_categoria VALUES (4, 'Afectación de la integridad');
INSERT INTO evaluacion_cultural_categoria VALUES (5, 'Nivel de protección');

CREATE TABLE evaluacion_cultural_criterio (id_eval_cult_criterio  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,criterio  TEXT);

INSERT INTO evaluacion_cultural_criterio VALUES (1, 'Influencia en el crecimiento y desarrollo de la ciudad');
INSERT INTO evaluacion_cultural_criterio VALUES (2, 'Hecho histórico');
INSERT INTO evaluacion_cultural_criterio VALUES (3, 'Personalidades');
INSERT INTO evaluacion_cultural_criterio VALUES (4, 'Período aproximado de contrucción');
INSERT INTO evaluacion_cultural_criterio VALUES (5, 'Potencial arqueológico');

CREATE TABLE evaluacion_cultural_evaluacion (id_eval_cult_evaluacion  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,evaluacion  TEXT);

INSERT INTO evaluacion_cultural_evaluacion VALUES (1, 'Excelente');
INSERT INTO evaluacion_cultural_evaluacion VALUES (2, 'Bien');
INSERT INTO evaluacion_cultural_evaluacion VALUES (3, 'Regular');
INSERT INTO evaluacion_cultural_evaluacion VALUES (4, 'Pobre');

CREATE TABLE informacion_general (id_info_general  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,fk_parcela  INTEGER,nombre  TEXT,uso_general  TEXT,ordenamiento_urbano  TEXT,direccion  TEXT,num_pisos  INTEGER,uso_actual  TEXT,microlocalizacion  BLOB,croquis  BLOB,img_edificio  BLOB);

INSERT INTO informacion_general VALUES (1, 18494, 'Casa', 'Vivienda unifamiliar', null, 'Campanario 769 e/ Maloja y Sitios ', null, 'Vivienda unifamiliar', null, null, null);
