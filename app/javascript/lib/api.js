function getCSRFToken() {
    return document.querySelector('[name=csrf-token]').content;
}
function apiCall(method, path, resource = null) {
    const requestOptions = {
        method: method,
    }

    if(method === 'POST' || method === 'PUT') {
        requestOptions.headers = {
            'Content-Type': 'application/json',
                'X-CSRF-Token': getCSRFToken()
        }
    }

    if(resource) {
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

function get(path) {
    return apiCall("GET", path);
}

export function getAvailableProducts() {
    return getProducts("available=true")
}

export function getProducts(available) {
    return get(`/products?${available ? available : ''}`)
}

export function createProduct(name, price, available) {
    return post("/products", {name: name, price: price, available: available})
}

export function getCustomizableAreas(product) {
    return get(`/customizable_areas?product_id=${product.id}`)
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