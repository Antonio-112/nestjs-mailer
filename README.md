<h1>NestJS Email Api</h1>

<img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo">

<p>Este proyecto es una plantilla para un microservicio de envío de correo electrónico construido con <a href="https://nestjs.com/">NestJS</a>. Utiliza el módulo <a href="https://github.com/nest-modules/mailer">@nestjs-modules/mailer</a> para el envío de correos electrónicos y ofrece una API RESTful para interactuar con el servicio.</p>

<h2>Tabla de contenido</h2>

<ul>
  <li><a href="#instalación">Instalación</a></li>
  <li><a href="#configuración">Configuración</a></li>
  <li><a href="#ejecución">Ejecución</a></li>
  <li><a href="#pruebas">Pruebas</a></li>
  <li><a href="#uso">Uso</a></li>
  <li><a href="#postman-collection">Postman Collection</a></li>
  <li><a href="#licencia">Licencia</a></li>
  <li><a href="#contribución">Contribución</a></li>
</ul>

<h2>Instalación</h2>

<p>Antes de iniciar el proyecto, debes instalar las dependencias del proyecto. Ejecuta el siguiente comando en la raíz del proyecto:</p>

<pre>
npm install
</pre>

<h2>Configuración</h2>

<p>Este proyecto utiliza el paquete <a href="https://docs.nestjs.com/techniques/configuration">NestJS Config</a> para manejar las configuraciones a través de variables de entorno. Necesitarás proporcionar tus propias credenciales SMTP en un archivo .env. Aquí tienes un ejemplo de las variables que necesitarás:</p>

<pre>
MAILER_HOST=smtp.example.com
MAILER_PORT=587
MAILER_SECURE=false
MAILER_USER=test@example.com
MAILER_PASSWORD=password
</pre>

<h2>Ejecución</h2>

<p>Para iniciar el servidor en modo desarrollo, ejecuta el siguiente comando:</p>

<pre>
npm run start:dev
</pre>

<p>Esto inicia el servidor en localhost en el puerto 3000 (o el puerto definido en tus variables de entorno), y el servidor se reiniciará automáticamente cuando hagas cambios en el código.</p>

<h2>Pruebas</h2>

<p>Este proyecto sigue las mejores prácticas de desarrollo basado en pruebas (TDD) y cuenta con pruebas unitarias exhaustivas. Puedes ejecutar las pruebas con el siguiente comando:</p>

<pre>
npm test
</pre>

<h2>Uso</h2>

<p>Una vez que el servidor esté en ejecución, puedes enviar un correo electrónico haciendo una solicitud POST al endpoint /email/send. La solicitud debe incluir un cuerpo JSON con los siguientes campos: to, from, subject, y text.</p>

<p>Por ejemplo:</p>

<pre>
curl -X POST -H "Content-Type: application/json" -d '{"to":"dest@example.com", "from":"src@example.com", "subject":"Hello", "text":"Hello World"}' http://localhost:3000/email/send
</pre>

<h2>Postman Collection</h2>

<p>En la carpeta /resources, encontrarás una colección de Postman que puedes utilizar para probar la API directamente desde la interfaz de Postman.</p>

<h2>Licencia</h2>

<p>Este proyecto está licenciado bajo los términos de la licencia MIT. Puedes ver el archivo <a href="LICENSE.md">LICENCIA</a> para más detalles.</p>

<h2>Contribución</h2>

<p>Las contribuciones son siempre bienvenidas. Ya sea un informe de bug, una mejora, una nueva característica o incluso un consejo sobre el código o la arquitectura, no dudes en contribuir. Por favor, revisa las <a href="CONTRIBUTING.md">directrices de contribución</a> antes de hacer un pull request.</p>
