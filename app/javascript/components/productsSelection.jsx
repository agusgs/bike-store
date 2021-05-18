import {productsState, totalAmountState} from "../lib/state";
import {useAppContext} from "./context";
import React, {useEffect} from "react";
import {CustomizableAreas} from "./customizableAreas";
import {AsyncOptions} from "./asyncOptions";
import {euro, priceInDisplayName} from "../lib/money";
import {Typography} from "@material-ui/core";

function Total() {
    const total = totalAmountState(useAppContext())

    return (
        <Typography variant="h5" paragraph>
            {`Total: ${euro(total).format()}`}
        </Typography>
    )
}

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
        <AsyncOptions name={'Select the product you want'}
                      onSelection={(product) => actions.selectProduct(dispatch, product)}
                      loading={products.loading}
                      error={products.error}
                      value={priceInDisplayName(products.value)}
                      selectedOption={products.selectedOption}
                      footer={<Total/>}>
            <CustomizableAreas/>
        </AsyncOptions>
    )
}