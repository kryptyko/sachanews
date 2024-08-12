# SachaNews

SachaNews es una aplicación web de noticias que permite a los usuarios leer, publicar, editar y eliminar artículos. Los usuarios pueden registrarse, iniciar sesión y ver su perfil. Además, los artículos pueden ser categorizados, y los usuarios pueden ver artículos por categoría. La aplicación utiliza **React** para la interfaz de usuario y se comunica con una API para el manejo de datos.

## Flujo de Trabajo

- **Inicio de Sesión y Registro**: Los usuarios pueden iniciar sesión o registrarse a través del componente `Login`. Una vez autenticados, pueden acceder a funcionalidades protegidas como la creación y edición de artículos.

- **Visualización de Artículos**: La página principal muestra una lista de artículos a través del componente `ArticleList`, donde los usuarios pueden filtrar los artículos por fecha de creación, actualización y número de vistas.

- **Gestión de Artículos**: Los usuarios autenticados pueden añadir nuevos artículos usando el componente `ArticleForm` y editar artículos existentes con el componente `EditArticleForm`. También pueden eliminar artículos desde el componente `ArticlesDeploy`, que muestra detalles de un artículo específico.

- **Categorías**: Los usuarios pueden explorar artículos por categoría a través del componente `CategoryArticles`, que lista artículos pertenecientes a una categoría específica.

- **Perfil de Usuario**: El componente `Profile` permite a los usuarios ver y posiblemente editar su información de perfil.

- **Navegación y Layout**: La aplicación utiliza un sistema de enrutamiento definido en `Router` para manejar la navegación entre diferentes vistas y componentes. El layout general de la aplicación incluye un `Banner` para la cabecera y un `Footer` para el pie de página, proporcionando una experiencia de usuario coherente a través de la aplicación.

## Componentes Principales
- **Navbar**: Este componente se muestra en casi todas las pantallas, muestar el boton Añadir articulo en forma condicional (solo si el usuario esta logueado)
- **Login**: Maneja el inicio de sesión de los usuarios.
- **ArticleList**: Muestra una lista de artículos disponibles.
- **ArticleForm**: Permite a los usuarios crear nuevos artículos.
- **EditArticleForm**: Permite a los usuarios editar artículos existentes.
- **CategoryArticles**: Lista artículos por categoría.
- **Profile**: Muestra la información del perfil del usuario.
- **ArticlesDeploy**: Despliega los detalles de un artículo específico, con opciones para editar o eliminar si el usuario es el autor.
- **Banner y Footer**: Proporcionan elementos de navegación y layout consistentes en la aplicación.En el componente Banner 

Este flujo de trabajo y los componentes principales facilitan una experiencia de usuario rica y dinámica, permitiendo a los usuarios interactuar con el contenido de noticias de manera efectiva.
