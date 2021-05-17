export function getProducts() {
    return fetch("/products/index").then(response => response.json())
}

export function getCustomizableAreas(product) {
    return fetch(`/customizable_areas/index?product_id=${product.id}`).then(response => response.json())
}