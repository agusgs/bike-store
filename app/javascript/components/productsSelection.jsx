import {productsState, totalAmountState} from "../lib/state";
import {useAppContext} from "./context";
import React, {useEffect} from "react";
import {CustomizableAreas} from "./customizableAreas";
import {AsyncOptions} from "./asyncOptions";
import {euro, priceInDisplayName} from "../lib/money";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

function OrderButton() {
    const total = totalAmountState(useAppContext())

    return (
        <Link to={'/checkout'}>
            <Button size="large" variant="contained" color="primary">
                {`ORDER FOR: ${euro(total).format()}`}
            </Button>
        </Link>
    )
}

export function ProductsSelection() {
    const {products, dispatch, actions} = productsState(useAppContext())

    useEffect(() => {
        actions.getProducts(dispatch)
    }, [])

    useEffect(() => {
        if (products.value && products.value[0]) {
            actions.selectProduct(dispatch, products.value[0])
        }
    }, [products.value])

    return (
        <AsyncOptions name={'Select the product you want'}
                      onSelection={(product) => actions.selectProduct(dispatch, product)}
                      loading={products.loading}
                      error={products.error}
                      value={products.value ? priceInDisplayName(products.value) : []}
                      selectedOption={products.selectedOption}
                      footer={<OrderButton/>}>
            <CustomizableAreas/>
        </AsyncOptions>
    )
}