import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {checkoutState} from "../../lib/state";
import {useAppContext} from "./context";
import OrderSummary from "../common/orderSummary";


export function Review(props) {
    const {product, customizations, total} = checkoutState(useAppContext())

    return (
        <>
            <OrderSummary product={product} customizations={customizations} total={total}/>
            <div className={props.classes.buttons}>
                <Link to="/">
                    <Button
                        className={props.classes.button}>
                        Back
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onNext}
                    className={props.classes.button}
                >
                    Next
                </Button>
            </div>
        </>
    )
}