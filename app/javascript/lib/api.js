function getCSRFToken() {
    return document.querySelector('[name=csrf-token]').content;
}

function apiCall(method, path, resource = null) {
    const requestOptions = {
        method: method,
    }

    if (method === 'POST' || method === 'PUT') {
        requestOptions.headers = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCSRFToken()
        }
    }

    if (resource) {
        requestOptions.body = JSON.stringify(resource)
    }

    return fetch(path, requestOptions).then((response) => {
        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
}

function post(path, resource) {
    return apiCall("POST", path, resource)
}

function put(path, resource) {
    return apiCall("PUT", path, resource)
}

function get(path) {
    return apiCall("GET", path);
}

export function getAvailableProducts() {
    return getProducts("available=true")
}

export function getProducts(available) {
    return get(`/products?${available ? available : ''}`)
}

export function getProduct(id) {
    return get(`/products/${id}`)
}
export function createProduct(name, price, available) {
    return post("/products", {name: name, price: price, available: available})
}

export function updateProduct(id, available) {
    return put(`/products/${id}?available=${available}`)
}

export function updateCustomization(id, optionType) {
    return put(`/customizations/${id}?option_type=${optionType}`)
}

export function createCustomization(parent, name, price, selectedOption) {
    if (!parent.customizableArea) {
        return post("/customizations", {name: name, price: price, type: selectedOption, parent_id: parent.id})
    } else {
        return post("/customizations", {name: name, price: price, type: selectedOption}).then((customization) => {
            return post("/available_customizations", {
                customizable_area_id: parent.id,
                customization_id: customization.id
            }).then(() => {
                return customization
            })
        })
    }
}

export function createCustomizableArea(product, name) {
    return post("/customizable_areas", {product_id: product.id, name: name})
}

export function getCustomizableAreas(product) {
    return get(`/customizable_areas?product_id=${product.id}`)
}

export function getOrders() {
    return get('/orders')
}

export function getOrder(id) {
    return get(`/orders/${id}`)
}

export function updateOrder(id, status) {
    return put(`/orders/${id}?status=${status}`)
}

export function postOrder(product, customizations, personalData) {
    const order = {
        client_data: personalData,
        product_id: product.id,
        selected_customizations: customizations.map((customization) => mapCustomization(customization))
    }

    return post("/orders", order)
}

function mapCustomization(customization) {
    const mappedCustomization = {}
    mappedCustomization.id = customization.id
    if (Array.isArray(customization.childCustomization)) {
        mappedCustomization.selected_customizations = customization.childCustomization.map((childCustomization) => mapCustomization(childCustomization))
    } else if (customization.childCustomization) {
        mappedCustomization.selected_customizations = [mapCustomization(customization.childCustomization)]
    }
    return mappedCustomization
}