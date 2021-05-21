export function getProducts() {
    return fetch("/products/index?available=true").then(response => response.json())
}

export function getCustomizableAreas(product) {
    return fetch(`/customizable_areas/index?product_id=${product.id}`).then(response => response.json())
}

export function postOrder(product, customizations, personalData) {
    const token = document.querySelector('[name=csrf-token]').content

    const order = {
        client_data: personalData,
        product_id: product.id,
        selected_customizations: customizations.map((customization) => mapCustomization(customization))
    }

    return fetch("/orders/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
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
        mappedCustomization.selected_customizations = [mapCustomization(customization.childCustomization)]
    }
    return mappedCustomization
}