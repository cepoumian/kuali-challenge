## Kuali Challenge

## Descripción

Aplicación que consume la API de Github

## Aplicación en vivo

- [kuali-challenge](https://kuali-challenge.vercel.app/)

### Autor

Cesar Poumian

### Software stack utilizado

- React
- NextJS

## Características

### Creación de cuenta y autenticación

- Se realiza por medio de Firebase
- El usuario nuevo puede crear una cuenta proporcionando un correo real o de prueba (falso), o si ya ha creado una cuenta, ingresar al la aplicación.
- El status de ingresado del usuario persiste aún si este refresca el navegador.
- El usuario puede cerrar su sesión y salir de la aplicación abriendo el _tooltip_ por medio del botón "Mi Perfil".

###Renderización en el lado del servidor (SSR)

- La aplicación cuenta con tres rutas principales: "/", donde el usuario ingresa o se registra; "/main", donde se muestran algunas opciones de perfiles de usuarios de Github; y "/profile/:profileId" donde se muestran los detalles de el perfil seleccionado.
- Las páginas se renderizan en el lado del servidor.

###Paginación

- En la sección donde se muestran varios perfiles random de Github,se puede avanzar y retroceder de página con los botones "Anterior" y "Siguiente".

### Busqueda de perfiles de Github

- El usuario buscar cualquier perfil existente en Github.

### Opciones de tema claro y oscuro

- El usuario puede selecccionar entre temas claro y oscuro abriendo el _tooltip_ por medio del botón "Mi Perfil".
