import {getCustomizableAreas, getAvailableProducts, postOrder} from "./api";
import {
    apiGetError,
    apiGetPending,
    apiGetSuccess,
    areaCustomized,
    initialState,
    productSelected,
    resetCheckout, resetOrder
} from "./state";

const API_CALL_PENDING = 'api_call_pending'
const API_CALL_SUCCESS = 'api_call_success'
const API_CALL_ERROR = 'api_call_error'

const PRODUCT_SELECTED = 'product_selected';
const AREA_CUSTOMIZED = 'area_customized';

const RESET_CHECKOUT = 'reset_checkout';
const RESET_ORDER = 'reset_order';

export function reducer(state = initialState, action) {
    switch (action.type) {
        case API_CALL_PENDING:
            return apiGetPending(state, action.key)
        case API_CALL_SUCCESS:
            return apiGetSuccess(state, action.key, action.value)
        case API_CALL_ERROR:
            return apiGetError(state, action.key)
        case PRODUCT_SELECTED:
            return productSelected(state, action.product)
        case AREA_CUSTOMIZED:
            return areaCustomized(state, action.customizableArea, action.selectedCustomizations)
        case RESET_CHECKOUT:
            return resetCheckout(state)
        case RESET_ORDER:
            return resetOrder(state)
        default: return state;

    }
}

export const actions = {
    apiCall: (dispatch) => async (key, callFunction) => {
        dispatch({type: API_CALL_PENDING, key: key});
        try {
            dispatch({type: API_CALL_SUCCESS, key: key, value: await callFunction()})
            return true
        } catch (error) {
            dispatch({type: API_CALL_ERROR, key: key})
            return false
        }
    },
    getProducts: function(dispatch) {
        const result = this.apiCall(dispatch)('products', getAvailableProducts)
        if (!result){
            dispatch({type: RESET_ORDER })
        }
    },
    selectProduct: function(dispatch, product) {
        dispatch({ type: PRODUCT_SELECTED, product})
        product && this.apiCall(dispatch)('customizableAreas', () => getCustomizableAreas(product))
    },
    areaCustomized: (dispatch, customizableArea, selectedCustomizations)=> {
        dispatch({ type: AREA_CUSTOMIZED, customizableArea: customizableArea, selectedCustomizations: selectedCustomizations})
    },
    checkout: function(dispatch, product, customizations, personalData) {
        this.apiCall(dispatch)('checkout', () => postOrder(product, customizations, personalData))
    },
    clearCheckout: function(dispatch) {
        dispatch({ type: RESET_CHECKOUT })
        dispatch({ type: RESET_ORDER })
    },
}