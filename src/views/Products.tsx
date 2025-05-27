import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

// Loader: obtiene todos los productos
export async function loader() {
  const products = await getProducts()
  return products
}

// Action: actualiza la disponibilidad de un producto
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  await updateAvailability(+data.id)
  return null
}


/**
 * Página principal que muestra la lista de productos.
 * 
 * - Carga los productos desde el backend mediante `loader()`.
 * - Usa una acción `action()` para cambiar la disponibilidad (POST con fetcher).
 * - Renderiza una tabla con todos los productos y sus acciones.
 */
export default function Products() {
  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
