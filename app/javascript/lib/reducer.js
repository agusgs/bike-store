import {getCustomizableAreas, getProducts} from "./api";
import {
    apiGetError,
    apiGetPending,
    apiGetSuccess,
    customizableAreaSelected,
    initialState,
    productSelected
} from "./state";

const API_GET_PENDING = 'api_get_pending'
const API_GET_SUCCESS = 'api_get_success'
const API_GET_ERROR = 'api_get_error'

const PRODUCT_SELECTED = 'product_selected';
const CUSTOMIZABLE_AREA_SELECTED = 'customizable_area_selected';

export function reducer(state = initialState, action) {
    switch (action.type) {
        case API_GET_PENDING:
            return apiGetPending(state, action.key)
        case API_GET_SUCCESS:
            return apiGetSuccess(state, action.key, action.value)
        case API_GET_ERROR:
            return apiGetError(state, action.key)
        case PRODUCT_SELECTED:
            return productSelected(state, action.product)
        case CUSTOMIZABLE_AREA_SELECTED:
            return customizableAreaSelected(state, action.customizableArea)
        default: return state;
    }
}

export const actions = {
    apiGet: (dispatch) => async (key, getFunction) => {
        dispatch({type: API_GET_PENDING, key: key});
        try {
            dispatch({type: API_GET_SUCCESS, key: key, value: await getFunction()})
        } catch (error) {
            dispatch({type: API_GET_ERROR, key: key})
        }
    },
    getProducts: function(dispatch) {
        this.apiGet(dispatch)('products', getProducts)
    },
    selectProduct: function(dispatch, product) {
        dispatch({ type: PRODUCT_SELECTED, product})
        this.apiGet(dispatch)('customizableAreas', () => getCustomizableAreas(product))
    },
    selectCustomizableArea: (dispatch) => async (customizableArea) => {
        dispatch({ type: CUSTOMIZABLE_AREA_SELECTED, customizableArea})
        //seguir de aca, ahora vendrian las customizaciones para el area
    }
}