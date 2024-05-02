# Pokestore - Frontend

Este repositorio contiene el frontend de una aplicación web desarrollada en React para la tienda en línea 'Pokestore'. La aplicación permite a los usuarios explorar y comprar productos Pokémon desde un catálogo en línea.

## Índice

- [Estructura de archivos](#estructura-de-archivos)
- [Descripción de los archivos](#descripción-de-los-archivos)
- [Componentes](#componentes)
- [Rutas](#rutas)
- [Contextos](#contextos)
- [Funcionamiento de la aplicación](#funcionamiento-de-la-aplicación)

## Estructura de archivos

El frontend de la aplicación 'Pokestore' tiene la siguiente estructura de archivos:

```
.
├── src
│   ├── assets
│   │   ├── pokemonBaner.jpeg
│   │   └── pokemonLogo.jpg
│   ├── componentes
│   │   ├── Buttons  
│   │   │   ├── Logout.css
│   │   │   └── Logout.jsx
│   │   ├── Cards  
│   │   │   ├── Cards.css
│   │   │   └── Cards.jsx
│   │   ├── Cart
│   │   │   ├── Cart.css
│   │   │   └── Cart.jsx
│   │   ├── Footer
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── Forms
│   │   │   ├── LoginForm.css
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.css
│   │   │   └── RegisterForm.jsx
│   │   ├── NavBar
│   │   │   ├── NavBar.css
│   │   │   └── NavBar.jsx
│   │   ├── ProductDetail
│   │   │   ├── ProductDetail.css
│   │   │   └── ProductDetail.jsx
│   │   ├── ProductType
│   │   │   ├── CardHome.jsx
│   │   │   ├── Legendario.jsx
│   │   │   ├── Mythical.jsx
│   │   │   └── ProductType.jsx
│   │   └── SearchBar
│   │       ├── SearchBar.css
│   │       └── SearchBar.jsx
│   ├── Pages
│   │   ├── Home.css
│   │   └── Home.jsx
│   ├── Routes
│   │   └── routes.jsx
│   ├── useContext
│   │   ├── CarritoContext.jsx
│   │   ├── ProductContext.jsx
│   │   └── UserContext.jsx   
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html.env
└── package.json

```


## Descripción de los archivos

- **Assets (`assets/`)**: Contiene imágenes utilizadas en la aplicación, como el banner y el logotipo de Pokémon.

- **Componentes (`componentes/`)**: Contiene componentes reutilizables de la interfaz de usuario, organizados por funcionalidad.

- **Páginas (`Pages/`)**: Contiene los componentes de las páginas principales de la aplicación, como la página de inicio.

- **Rutas (`Routes/`)**: Define las rutas y los componentes asociados a ellas. Esto facilita la navegación dentro de la aplicación.

- **Contextos (`useContext/`)**: Contiene los contextos de React utilizados para compartir datos entre componentes de manera eficiente.

- **Estilos (`*.css`)**: Archivos de hojas de estilo CSS asociados a los componentes y páginas.

- **`index.html.env`**: Archivo HTML que sirve como punto de entrada para la aplicación React.

## Componentes

Los componentes en la carpeta `componentes/` representan diferentes partes de la interfaz de usuario, como botones, tarjetas de producto, carrito de compras, barra de navegación, etc.

## Rutas

El archivo `Routes/routes.jsx` define las rutas y los componentes asociados a ellas. Esto permite la navegación entre las diferentes páginas de la aplicación.

## Contextos

Los contextos en la carpeta `useContext/` se utilizan para compartir datos entre componentes de manera eficiente. Esto es útil para mantener el estado de la aplicación y compartir información relevante entre componentes sin tener que pasar props manualmente.

## Funcionamiento de la aplicación

La aplicación 'Pokestore' utiliza React para crear una interfaz de usuario interactiva y receptiva. Los usuarios pueden explorar productos Pokémon, agregarlos al carrito de compras y realizar compras de manera segura. La aplicación utiliza estilos CSS para una apariencia atractiva y amigable para el usuario.

