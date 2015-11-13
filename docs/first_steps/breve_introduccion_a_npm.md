# Breve introducción a npm

## ¿Qué es?

npm es una herramienta como las que la se vienen presentando últimamente con muchos lenguajes de programación, un manejador de paquetes. 

Se le puede comparar con herramientas como maven, gem, pip, easy\_install, CPAN, etc. sin embargo su funcionamiento es mas sencillo, pues busca que toda la información de un proyecto se mantenga constante, también, esto involucra mantener sus dependencias con otros proyectos o paquetes configurables y de facil instalación.

### package.json

La manera en que npm permite mantener un proyecto es mediante un archivo de tipo **JSON** en el cual se proporcione la información del proyecto según se quiera configurar para futuras referencias.

La manera de iniciar este JSON de forma sencilla es escribiendo en una terminal posicionada en la ruta de la raiz de nuestro proyecto:

`npm init`

Esto llevara por una guia rapida de como configurar un proyecto, desde definir quien es el autor, hasta el archivo principal por el cual se iniciara el proyecto.

### Usando npm en un proyecto ageno

