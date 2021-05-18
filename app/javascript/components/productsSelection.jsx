import {productsState} from "../lib/state";
import {useAppContext} from "./context";
import React, {useEffect} from "react";
import {CustomizableAreas} from "./customizableAreas";
import {Options} from "./options";
import {priceInDisplayName} from "../lib/money";

export function ProductsSelection() {
    const {products, dispatch, actions} = productsState(useAppContext())

    useEffect(() => {
        actions.getProducts(dispatch)
    }, [])

    useEffect(() => {
        if (products.value[0]) {
            actions.selectProduct(dispatch, products.value[0])
        }
    }, [products.value])

    return (
        <Options name={'Select the product you want'}
                 onSelection={(product) => actions.selectProduct(dispatch, product)}
        loading={products.loading}
        error={products.error}
        value={priceInDisplayName(products.value)}
        selectedOption={products.selectedOption}>
            <CustomizableAreas/>
        </Options>
    )
}