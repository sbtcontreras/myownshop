# My Own Shop

[myownshop.vercel.app](https://myownshop.vercel.app)

MyOwnShop es una plataforma full-stack de comercio electrónico que permite a los usuarios crear y administrar sus propias tiendas y vender productos de manera segura en la plataforma. Este proyecto es una aplicación estática con fetching de datos desde el cliente, con autorización a nivel de cliente y API, y con autenticación sin contraseña.

### ¿Por qué proteger desde el lado del cliente y de la API?
Client-side Authorization: Permite que el proceso sea realizado en el lado del navegador mediante el manejo de cookies. De esta forma solo los usuarios autorizados tendrán acceso a determinadas funcionalidades, datos, páginas y componentes. Realizar el fetching de datos en el lado del cliente permite fluidez y animaciones de carga. Por otra parte, si no se protege la información en el back-end, se puede vulnerar la información con peticiones maliciosas, y robo de cookies. Debido a todo lo anterior, hay que implementar también seguridad a nivel de servidor, o a nivel de API.

Server-side Authorization: No se protegió a nivel del servidor para evitar que el fetching de datos y la renderización de la página se realice en el servidor, lo que podría causar sobrecargas y bloqueos en la carga de la página, resultando en una experiencia desagradable para el usuario. Por esta razón, se optó por proteger a nivel de API en lugar de a nivel de servidor.

API routes Authorization: Para asegurar que solo los usuarios autorizados tengan acceso a determinadas funcionalidades y datos, se utiliza Prisma y NextAuth.js para garantizar que solo los usuarios autenticados tengan acceso a las consultas y mutaciones de la base de datos, permitiendo la entrega de información o transacciones solo si el solicitante está autorizado

## Tecnologías utilizadas:
* **Typescrypt** como lenguaje de programación
* **Next.js** como front-end framework de React, como back-end para creación de una API y para optimización de recursos, además de brindar static site generation para una mejor experiencia de usuario.
* **NextAuth.js** para la autorización tanto para el front-end como para el back-end, además de permitir autenticación sin contraseña, lo que disminuye la posibilidad de vulneraciones.
* **Nodemailer** para el manejo de correos electrónicos de autenticación.
* **Prisma** como ORM que permite el manejo de la base de datos a nivel de API, compatible con typescript y con NextAuth.js para la autenticación y autorización.
* **Postgresql** como base de datos.
* **Vercel** para el deploy.

En resumen, MyOwnShop es una plataforma de comercio electrónico potente y segura que permite a los usuarios crear y administrar sus propias tiendas y vender productos de manera segura en la plataforma. Utiliza una serie de tecnologías avanzadas para garantizar la seguridad y la fluidez en el proceso de autenticación y autorización, tanto en el lado del cliente como en el lado del servidor.

[myownshop.vercel.app](https://myownshop.vercel.app)
