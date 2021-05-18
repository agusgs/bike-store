export const initialState = {
    api: {
        products: {
            loading: true,
            error: false,
            value: []
        },
        customizableAreas: {
            loading: true,
            error: false,
            value: []
        }
    },
    order: {
        product: {price: 0},
        selectedCustomizations: [],
    }
};

export function apiGetPending(state, key) {
    return {...state, api: {...state.api, [key]: {loading: true, error: false, value: []}}}
}

export function apiGetSuccess(state, key, value) {
    return {...state, api: {...state.api, [key]: {loading: false, error: false, value: value}}};
}

export function apiGetError(state, key) {
    return {...state, api: {...state.api, [key]: {loading: false, error: true, value: []}}};
}

// PRODUCT RELATED FUNCTIONS
export function productSelected(state, selected_product) {
    const product = selected_product ? selected_product : {price: 0}
    return {...state, order: {product: product, selectedCustomizations: []}};
}

export function productsState(context) {
    const {state, actions, dispatch} = context
    return {products: {...state.api.products, selectedOption: state.order.product}, dispatch, actions}
}

// CUSTOMIZATIONS RELATED FUNCTIONS
export function customizableAreasState(context) {
    const {state, actions, dispatch} = context
    return {customizableAreas: {...state.api.customizableAreas}, dispatch, actions}
}

export function areaCustomized(state, customizableArea, selectedCustomizations) {
    return {
        ...state, order: {
            ...state.order, selectedCustomizations: [
                ...(state.order.selectedCustomizations.filter((customizedArea) => customizedArea.token !== customizableArea.token)),
                {
                    ...customizableArea,
                    totalPrice: selectedCustomizations ? selectedCustomizations.totalPrice || 0 : 0,
                    childCustomization: selectedCustomizations
                }
            ]
        }
    }
}

// TOTAL PRICE RELATED FUNCTIONS
export function totalAmountState(context) {
    const {product, selectedCustomizations} = context.state.order;
    console.log(selectedCustomizations)

    return product.price + selectedCustomizations.reduce(
        (subtotal, customizableArea) => subtotal + customizableArea.totalPrice || 0, 0);
}