import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CenteredCard} from "../common/centeredCard";
import ErrorHandler from "../common/errorHandler";
import {Spinner} from "../common/spinner";
import * as PropTypes from "prop-types";
import {getOrder, updateOrder} from "../../lib/api";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, makeStyles, Select} from "@material-ui/core";
import {useSnackbar} from "notistack";
import OrderSummary from "../common/orderSummary";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    fieldDescription: {
        fontWeight: "bold"
    },
    fieldDescriptionContainer: {
        flexGrow: 0,
        marginRight: 4
    }
}));


function OrderPageComponent(props) {
    const classes = useStyles();
    const order = props.order
    const [selectedOrderStatus, setSelectedOrderStatus] = useState(order.status);
    const {enqueueSnackbar} = useSnackbar();

    const orderPlaced = 'PLACED'
    const orderFulfilled = 'FULFILLED'

    function updateOrderStatus(event) {
        const previousStatus = selectedOrderStatus
        const newStatus = event.target.value;
        setSelectedOrderStatus(newStatus)
        updateOrder(order.id, newStatus).then(() => {
            enqueueSnackbar(`Order updated`, {variant: "success"})
        }).catch(() => {
            setSelectedOrderStatus(previousStatus)
            enqueueSnackbar('There was an error updating your order', {variant: "error"})
        })
    }

    function mapSubCustomization(order_customizations) {
        return order_customizations.map((orderCustomization) =>{
            return {
                name: orderCustomization.customization.name,
                price: orderCustomization.customization.price,
                token: orderCustomization.id,
                childCustomization: mapSubCustomization(orderCustomization.customizations)
            }
        })
    }

    function mapCustomizations() {
        return order.order_customized_areas.map((orderCustomizedArea) => {
            return {
                name: orderCustomizedArea.customizable_area.name,
                token: orderCustomizedArea.id,
                childCustomization: mapSubCustomization(orderCustomizedArea.order_customizations)
            }
        })
    }

    return (
        <div className={classes.root}>
            <List>
                <ListItem>
                    <ListItemText className={classes.fieldDescriptionContainer}
                                  primaryTypographyProps={{className: classes.fieldDescription}}
                                  primary={"Client name: "}/>
                    <ListItemText primary={order.client_name}/>
                </ListItem>
                <ListItem>
                    <ListItemText className={classes.fieldDescriptionContainer}
                                  primaryTypographyProps={{className: classes.fieldDescription}}
                                  primary={"Client last name: "}/>
                    <ListItemText primary={order.client_lastname}/>
                </ListItem>
                <ListItem>
                    <ListItemText className={classes.fieldDescriptionContainer}
                                  primaryTypographyProps={{className: classes.fieldDescription}}
                                  primary={"Client email: "}/>
                    <ListItemText primary={order.client_email}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText className={classes.fieldDescriptionContainer}
                                  primaryTypographyProps={{className: classes.fieldDescription}}
                                  primary={"Status: "}/>
                    <Select
                        native
                        value={selectedOrderStatus}
                        onChange={updateOrderStatus}
                        inputProps={{
                            role: "listbox",
                            id: 'order_status',
                        }}
                    >
                        <option role="option" value={orderPlaced}>Placed</option>
                        <option role="option" value={orderFulfilled}>Fulfilled</option>
                    </Select>
                </ListItem>
            </List>
            <Divider/>
            <OrderSummary product={order.product} customizations={mapCustomizations()} total={order.total}/>
        </div>
    );
}

OrderPageComponent.propTypes = {order: PropTypes.any};

export function OrderPage() {
    const {id} = useParams();
    const [asyncState, setAsyncState] = useState({loading: true, error: false, order: {}})

    useEffect(() => {
        getOrder(id).then((order) => {
            setAsyncState({loading: false, error: false, order: order})
        }).catch((_e) => {
            setAsyncState({loading: false, error: true, order: {}})
        })
    }, [])

    return (
        <CenteredCard>
            <ErrorHandler error={asyncState.error}>
                <Typography variant={"h5"}> {`Order #${id}`} </Typography>
                {asyncState.loading ? <Spinner/> : <OrderPageComponent order={asyncState.order}/>}
            </ErrorHandler>
        </CenteredCard>
    )
}