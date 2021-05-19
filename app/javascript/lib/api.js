export function getProducts() {
    return fetch("/products/index").then(response => response.json())
}

export function getCustomizableAreas(product) {
    return fetch(`/customizable_areas/index?product_id=${product.id}`).then(response => response.json())
}

export function postOrder(product, customizations, personalData) {
    const order = {
        clientData: personalData,
        productId: product.id,
        selected_customizations: customizations.map((customization) => mapCustomization(customization))
    }

    return fetch("/order/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order) // body data type must match "Content-Type" header
    }).then(response => response.json());
}

function mapCustomization(customization) {
    const mappedCustomization = {}
    mappedCustomization.id = customization.id
    if (Array.isArray(customization.childCustomization)) {
        mappedCustomization.selected_customizations = customization.childCustomization.map((childCustomization) => mapCustomization(childCustomization))
    } else if (customization.childCustomization) {
        mappedCustomization.selected_customization = mapCustomization(customization.childCustomization)
    }
    return mappedCustomization
}