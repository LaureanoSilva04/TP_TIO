======================================================================
SISTEMA DE AUTENTICACIÓN Y GESTIÓN DE PERFILES - PANADERÍA WEB
======================================================================

Este documento detalla la lógica de negocio para el control de acceso
de usuarios y la administración de sus datos de perfil en la plataforma.

1. AUTENTICACIÓN DE USUARIOS
----------------------------------------------------------------------
* Registro: 
  Los usuarios se registrarán utilizando un correo electrónico válido 
  y una contraseña. Las contraseñas se encriptarán antes de ser 
  almacenadas en la base de datos utilizando el algoritmo bcrypt.

* Inicio de Sesión (Login):
  Se validarán las credenciales contra la base de datos. Si son 
  correctas, se generará un token de sesión (JWT - JSON Web Token) 
  para mantener al usuario conectado de forma segura.

* Recuperación de Contraseña:
  Se implementará un flujo de envío de correo electrónico con un 
  token temporal para permitir el blanqueo de la clave en caso de olvido.


2. DATOS DEL PERFIL DE USUARIO
----------------------------------------------------------------------
Cada usuario tendrá un perfil asociado con los siguientes campos 
gestionados por el Backend:

* Datos Personales: Nombre, Apellido, Teléfono de contacto.
* Datos de Entrega: Dirección de envío (Calle, Altura, Piso/Depto).
* Historial de Compras: Registro de pedidos anteriores (panes, facturas, 
  tortas encargadas) para facilitar la recompra rápida.


3. ROLES Y PERMISOS (SEGURIDAD)
----------------------------------------------------------------------
El sistema controlará los accesos mediante dos roles principales:

* Rol CLIENTE: Puede ver productos, gestionar su propio perfil, 
  realizar pedidos y ver su historial.
* Rol ADMINISTRADOR (Panadero/Dueño): Puede acceder al panel de gestión,
  modificar el stock de productos, cambiar precios y ver los pedidos 
  pendientes de envío.

======================================================================
Fin del documento. Desarrollado por el equipo de Backend - TIO 2026.
======================================================================