import { Link, Form, redirect, useActionData, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductsById, updateProduct } from "../services/ProductService"
import type { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductsById(+params.id)
        if (!product) {
            return redirect('/')
        }
        return product
    }
}

// Action es una funcion de react-router-dom donde proceso todos los datos del formulario. Esta funcion siempre retorna algo
export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }
    if (params.id !== undefined) {
        await updateProduct(data, +params.id)
        //Redirecciona a homepage cuando acaba de hacer el post 
        return redirect('/')
    }
}


const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export default function EditProduct() {
    //Recupero el Producto seleccionado con useLoaderData de react-router-dom
    const product = useLoaderData() as Product
    //Este es un hook que permite recuperar el error del formulario ya que en principio no esta conectado con el componente al procesarse en la funcion action() de arriba
    const error = useActionData() as string


    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Volver a Productos
                </Link>

            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method='POST'
            >
                <ProductForm product={product}/>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    )
}
