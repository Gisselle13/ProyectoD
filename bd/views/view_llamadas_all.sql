CREATE or REPLACE view view_llamadas_all as 
select
encuesta_1.idllamada AS idllamada,
encuesta_1.atendio AS atendio,
encuesta_1.fecha AS fecha,
encuesta_1.hora AS hora,
encuesta_1.telefono AS telefono,
encuesta_1.sexo AS sexo,
encuesta_1.edad AS edad,
encuesta_1.comentarios AS comentarios,
encuesta_1.pregunta_1 AS pregunta_1,
encuesta_1.pregunta_2 AS pregunta_2,
encuesta_1.pregunta_3 AS pregunta_3,
encuesta_1.pregunta_4 AS pregunta_4,
encuesta_1.pregunta_5 AS pregunta_5
 from encuesta_1 
 union all
select
encuesta_2.idllamada AS idllamada,
encuesta_2.atendio AS atendio,
encuesta_2.fecha AS fecha,
encuesta_2.hora AS hora,
encuesta_2.telefono AS telefono,
encuesta_2.sexo AS sexo,
encuesta_2.edad AS edad,
encuesta_2.comentarios AS comentarios,
encuesta_2.pregunta_1 AS pregunta_1,
encuesta_2.pregunta_2 AS pregunta_2,
encuesta_2.pregunta_3 AS pregunta_3,
encuesta_2.pregunta_4 AS pregunta_4,
encuesta_2.pregunta_5 AS pregunta_5
 from encuesta_2
