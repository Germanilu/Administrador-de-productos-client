import { safeParse } from 'valibot'
import axios from 'axios'
import { DraftProductSchema, ProductsSchema, ProductSchema, type Product } from '../types'
import { toBoolean } from '../utils'

type ProductData = {
    [k: string]: FormDataEntryValue
}


/**
 * Crea un nuevo producto en el backend.
 * - Valida los datos usando DraftProductSchema.
 * - Envía una solicitud POST a la API si los datos son válidos.
 */
export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * Obtiene todos los productos desde el backend.
 * - Valida la respuesta usando ProductsSchema.
 * - Devuelve un array de productos si la validación es exitosa.
 */
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Obtiene un producto por su ID desde el backend.
 * - Valida la respuesta con ProductSchema.
 */
export async function getProductsById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Actualiza un producto existente en el backend.
 * - Convierte y valida los datos recibidos del formulario.
 * - Envía una solicitud PUT con el producto actualizado.
 */
export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Elimina un producto del backend según su ID.
 */
export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Actualiza solo la disponibilidad de un producto (PATCH).
 * - Generalmente usado para alternar el estado sin modificar el resto.
 */
export async function updateAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}