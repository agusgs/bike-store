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
        },
        checkout: {
            loading: false,
            error: false,
            value: null
        }
    },
    order: {
        product: {price: 0},
        selectedCustomizations: [],
    },
};

// API RELATED FUNCTIONS

export function apiGetPending(state, key) {
    return {...state, api: {...state.api, [key]: {loading: true, error: false, value: null}}}
}

export function apiGetSuccess(state, key, value) {
    return {...state, api: {...state.api, [key]: {loading: false, error: false, value: value}}};
}

export function apiGetError(state, key) {
    return {...state, api: {...state.api, [key]: {loading: false, error: true, value: null}}};
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

export function resetOrder(state) {
    return {
        ...state,
        order: {
            product: {price: 0},
            selectedCustomizations: [],
        }
    }
}

// CUSTOMIZATIONS RELATED FUNCTIONS
export function customizableAreasState(context) {
    const {state, actions, dispatch} = context
    return {customizableAreas: {...state.api.customizableAreas}, dispatch, actions}
}

export function areaCustomized(state, customizableArea, selectedCustomizations) {
    const customizedCustomizableAreas = state.order.selectedCustomizations.filter((customizedArea) => customizedArea.id !== customizableArea.id);
    return {
        ...state, order: {
            ...state.order,
            selectedCustomizations: selectedCustomizations ? [
                ...customizedCustomizableAreas,
                {
                    ...customizableArea,
                    totalPrice: selectedCustomizations.totalPrice || 0,
                    childCustomization: selectedCustomizations
                }] : [...customizedCustomizableAreas]
        }
    }
}

// TOTAL PRICE RELATED FUNCTIONS
export function totalAmountState(context) {
    const {product, selectedCustomizations} = context.state.order;

    return product.price + selectedCustomizations.reduce(
        (subtotal, customizableArea) => subtotal + customizableArea.totalPrice || 0, 0);
}

// CHECKOUT RELATED FUNCTIONS

export function checkoutState(context) {
    return {
        product: context.state.order.product,
        customizations: context.state.order.selectedCustomizations,
        total: totalAmountState(context),
        dispatch: context.dispatch,
        actions: context.actions,
        checkout: context.state.api.checkout
    }
}

export function resetCheckout(state) {
    return {
        ...state,
        api: {
            ...state.api,
            checkout: {
                loading: false,
                error: false,
                value: null
            }
        }
    }
}