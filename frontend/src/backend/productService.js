import { appFetch, config } from "./appFetch";

export const findProductById = (id, onSuccess, onErrors) => {
    appFetch(`/products/${id}`, config('GET'), onSuccess, onErrors);
};

/*export const findProducts = (keywords, productState, onSuccess) => {
    let url = "/products";
    if (keywords) {
        url += `?keywords=${keywords}`;
        if (productState !== undefined && productState !== null) {
            url += `&productState=${productState}`;
        }
    } else if (productState) {
        url += `?productState=${productState}`;
    }
    appFetch(url, config('GET'), onSuccess);
};/*/

export const createProduct = (code, image, origin, price, type, subtype, productName, description, location, observations, onSuccess, onErrors) =>
    appFetch('/products', config('POST', {code, image, origin, price, type, subtype, productName, description, location, observations}), onSuccess, onErrors);

export const updateProduct = (id, code, image, origin, price, type, subtype, productName, description, location, observations, onSuccess, onErrors) =>
    appFetch(`/products/${id}`, config('PUT', {code, image, origin, price, type, subtype, productName, description, location, observations}), onSuccess, onErrors);

export const deleteProduct = (id, onSuccess, onErrors) =>
    appFetch(`/products/${id}`, config('DELETE'), onSuccess, onErrors);



// ------------------------------------------- INTEGRACION --------------------------------------------


export const findProducts = (pagina, limit, busqueda, onSuccess, onErrors) => {
    let url = "/productos";
    const params = new URLSearchParams();

    if (pagina !== undefined && pagina !== null) {
        params.append('pagina', pagina);
    }
    if (limit !== undefined && limit !== null) {
        params.append('limit', limit);
    }

    if (busqueda) {
        params.append('busqueda', busqueda);
    }

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    appFetch(url, config('GET'), onSuccess, onErrors);
};

