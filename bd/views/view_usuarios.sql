CREATE or REPLACE view view_usuarios as 
select usuarios.idusuario AS idusuario,usuarios.tipo AS idtipo_usuario,usuarios.nombre AS nombre,usuarios.correo AS correo,usuarios.activo AS activo, usuarios.clave AS clave
 from usuarios join roles on roles.idrol = usuarios.tipo