import {customizableAreasState, productsState, totalAmountState} from "../../lib/state";
import {useAppContext} from "./context";
import React, {useEffect} from "react";
import {CustomizableAreas} from "./customizableAreas";
import {AsyncOptions} from "../common/asyncOptions";
import {euro, priceInDisplayName} from "../../lib/money";
import {Button, CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";

function OrderButton() {
    const context = useAppContext();
    const {products} = productsState(context)
    const {customizableAreas} = customizableAreasState(context)
    const canCheckout = !products.error && !products.loading && products.selectedOption && !customizableAreas.error && !customizableAreas.loading;
    const total = canCheckout ? `ORDER FOR: ${euro(totalAmountState(context)).format()}` : <CircularProgress/>

    return (
        <Link to={canCheckout ? '/checkout' : ''}>
            <Button disabled={!canCheckout} size="large" variant="contained" color="primary">
                {total}
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
                      footer={<OrderButton />}>
            <CustomizableAreas/>
        </AsyncOptions>
    )
}