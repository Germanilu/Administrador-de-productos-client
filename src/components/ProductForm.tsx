import type { Product } from "../types"

type ProductFormProps = {
    product?: Product
}

/**
 * Componente de formulario reutilizable para crear o editar un producto.
 * - Muestra campos para nombre y precio.
 * - Usa `defaultValue` para precargar valores si se está editando.
 */
export default function ProductForm({product}:ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product?.name}

                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={product?.price}

                />
            </div>
        </>
    )
}
