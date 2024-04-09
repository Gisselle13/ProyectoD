CREATE or REPLACE view view_llamadas as 
select
registro_llamadas.idllamada AS idllamada,
registro_llamadas.atendio AS atendio,
registro_llamadas.fecha AS fecha,
registro_llamadas.hora AS hora,
registro_llamadas.telefono AS telefono,
registro_llamadas.sexo AS sexo,
registro_llamadas.edad AS edad,
registro_llamadas.comentarios AS comentarios,
registro_llamadas.pregunta_1 AS pregunta_1,
registro_llamadas.pregunta_2 AS pregunta_2,
registro_llamadas.pregunta_3 AS pregunta_3,
registro_llamadas.pregunta_4 AS pregunta_4,
registro_llamadas.pregunta_5 AS pregunta_5,   
usuarios.idusuario AS idusuario,usuarios.tipo AS idtipo_usuario,usuarios.nombre AS nombre_usuario
 from registro_llamadas join usuarios on registro_llamadas.idusuario = usuarios.idusuario