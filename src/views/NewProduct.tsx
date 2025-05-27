import { Link, Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

// Action: procesa los datos del formulario para crear un nuevo producto
export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }
    await addProduct(data)
    //Redirecciona a homepage cuando acaba de hacer el post 
    return redirect('/')
}


/**
 * Página para registrar un nuevo producto.
 * 
 * - Renderiza un formulario de creación.
 * - Usa una acción `action()` para validar y guardar los datos enviados.
 * - Muestra errores si faltan campos obligatorios.
 */
export default function NewProduct() {

    //Este es un hook que permite recuperar el error del formulario ya que en principio no esta conectado con el componente al procesarse en la funcion action() de arriba
    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
