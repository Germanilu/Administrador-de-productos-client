import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'



/**
 * Definición del enrutador principal de la aplicación.
 * Utiliza React Router v6.4+ con soporte para data routers (loaders y actions).
 * 
 * Cada ruta puede tener:
 * - `element`: El componente a renderizar
 * - `loader`: Función que obtiene los datos antes de renderizar
 * - `action`: Función que maneja peticiones tipo POST, PATCH, DELETE, etc.
 */

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // Componente que envuelve a todas las rutas hijas
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader, // Carga los productos desde el backend
                action: updateAvailabilityAction // Cambia el estado de disponibilidad de un producto
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction // Maneja el envío del nuevo producto al backend
            },
            {
                path: 'productos/:id/editar', //ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader, // Carga los datos del producto a editar
                action: editProductAction // Envía los cambios del producto al backend
            },
            {
                path: 'productos/:id/eliminar', //ROA Pattern - Resource-oriented design
                action: deleteProductAction // Acción que elimina el producto desde el backend
            }
        ]
    }
])