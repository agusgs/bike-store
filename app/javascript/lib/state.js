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
        product: null,
        customizableArea: null,
    }
};

export function apiGetPending(state, key) {
    return {...state, api: {...state.api, [key]: {loading: true, error: false, value: []}}}
}

export function apiGetSuccess(state, key, value) {
    return {...state, api: {...state.api, [key]: {loading: false, error: false, value: value}}};
}

export function apiGetError(state, key) {
    return {...state, api: { ...state.api, [key]: { loading: false, error: true, value: []}}};
}

export function productSelected(state, product) {
    return {...state, order: {product: product}};
}

export function productsState(context) {
    const { state, actions, dispatch} = context
    return { products: { ...state.api.products, selectedOption: state.order.product }, dispatch, actions }
}

export function customizableAreaSelected(state, customizableArea) {
    return {...state, order: {product: state.order.product, customizableArea}};
}

export function customizableAreasState(context) {
    const { state, actions, dispatch} = context
    return {customizableAreas: {...state.api.customizableAreas}, dispatch, actions}
}
