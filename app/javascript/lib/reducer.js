import {getCustomizableAreas, getProducts, postOrder} from "./api";
import {apiGetError, apiGetPending, apiGetSuccess, areaCustomized, initialState, productSelected} from "./state";

const API_CALL_PENDING = 'api_call_pending'
const API_CALL_SUCCESS = 'api_call_success'
const API_CALL_ERROR = 'api_call_error'

const PRODUCT_SELECTED = 'product_selected';
const AREA_CUSTOMIZED = 'area_customized';

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
        default: return state;
    }
}

export const actions = {
    apiCall: (dispatch) => async (key, callFunction) => {
        dispatch({type: API_CALL_PENDING, key: key});
        try {
            dispatch({type: API_CALL_SUCCESS, key: key, value: await callFunction()})
        } catch (error) {
            dispatch({type: API_CALL_ERROR, key: key})
        }
    },
    getProducts: function(dispatch) {
        this.apiCall(dispatch)('products', getProducts)
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
    }
}