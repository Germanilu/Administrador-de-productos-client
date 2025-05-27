## 📦 Product Manager
Aplicación web para gestionar un catálogo de productos, con funcionalidades de creación, edición, eliminación y cambio de disponibilidad. Construida con React Router, TypeScript y Vite, conectada a una API RESTful mockeada con JSON Server.

---

## 🚀 Features
- Listado de productos con nombre, precio y estado de disponibilidad.
- Crear nuevos productos.
- Editar productos existentes.
- Eliminar productos con confirmación.
- Cambiar disponibilidad entre **Disponible** y **No Disponible**.
- Navegación con React Router.
- Validación de formularios desde el backend con `action()`.

---

## 🧱 Tech Stack
- ⚛️ **React**
- ⌨️ **TypeScript**
- 🛣 **React Router DOM v6**
- ⚡ **Vite**
- 🗄 **JSON Server** (para simular una API REST)
- 💡 **Hooks** como `useLoaderData`, `useActionData`, `useFetcher`
- 💅 **Tailwind CSS** (para estilos rápidos y responsivos)

---

## 📁 Project Structure
src/

├── components/ # Componentes reutilizables (Formularios, Filas de Tabla, Mensajes)

├── services/ # Lógica de acceso a datos (ProductService.ts)

├── views/ # Páginas principales (Products, NewProduct, EditProduct)

├── utils.ts # Utilidades generales (formato de moneda, parseo booleano)

└── types.ts # Tipos de datos globales (Product)


## 🧠 Rest API 
[rest-api-express-ts](https://github.com/Germanilu/rest-api-express-ts)

## ✍️ Autor
## Luciano Germani