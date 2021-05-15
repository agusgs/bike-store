
export const getProducts = () => {
    return fetch("/products/index")
        .then(response => {
            return response.json()
        })
}

export const getCustomizableAreas = () => {
    return Promise.resolve([
        {
            id: 1,
            name: "Wheels",
            brands: [
                {
                    id: 1,
                    name: "wheel brand",
                    applicable_customizations: [
                        {
                            id: 1,
                            name: "wheel size",
                            customizations: [
                                {
                                    id: 1,
                                    value: '17',
                                    dependant_customizations: [
                                        {
                                            id: 2,
                                            name: "color",
                                            customizations: [
                                                {
                                                    id:2,
                                                    value: 'red'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ])
}