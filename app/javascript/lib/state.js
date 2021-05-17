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
    return {...state, api: { ...state.api, [key]: { loading: false, error: true, value: []}}};
}

export function productSelected(state, product) {
    return {...state, order: {product: product, selectedCustomizations:[]}};
}

export function productsState(context) {
    const { state, actions, dispatch} = context
    return { products: { ...state.api.products, selectedOption: state.order.product }, dispatch, actions }
}

export function customizableAreasState(context) {
    const { state, actions, dispatch} = context
    return {customizableAreas: {...state.api.customizableAreas}, dispatch, actions}
}

export function areaCustomized(state, customizableArea, selectedCustomizations) {
    const customizations = [
        ...(state.order.selectedCustomizations.filter((customizedArea) => customizedArea.token !== customizableArea.token)),
        {...customizableArea, childCustomization: selectedCustomizations}
    ]
    console.log(customizations)
    return {...state, order: {...state.order, selectedCustomizations: customizations}}
}