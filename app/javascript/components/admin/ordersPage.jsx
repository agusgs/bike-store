import {getOrders} from "../../lib/api";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {euro} from "../../lib/money";
import ErrorHandler from "../common/errorHandler";
import {Spinner} from "../common/spinner";
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {useHistory} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
    title: {
        marginBottom: 10
    },
    button: {
        marginTop: 10
    }
});

export function OrdersPage() {
    const classes = useStyles();
    const [asyncState, setAsyncState] = useState({loading: true, error: false, orders: []})
    const history = useHistory();

    useEffect(() => {
        getOrders().then((orders) => {
            setAsyncState({loading: false, error: false, orders: orders})
        }).catch((_e) => {
            setAsyncState({loading: false, error: true, orders: []})
        })
    }, [])

    const content = () => (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Client Name</TableCell>
                        <TableCell>Client Last Name</TableCell>
                        <TableCell>Client email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align={"right"}>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {asyncState.orders.map((order) => (
                            <TableRow hover onClick={() => { history.push(`/admin/orders/${order.id}`)}} key={order.id}>
                                <TableCell component="th" scope="row"> {order.id} </TableCell>
                                <TableCell>{order.client_name}</TableCell>
                                <TableCell>{order.client_lastname}</TableCell>
                                <TableCell>{order.client_email}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell align="right">{euro(order.price).format()}</TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <Card>
            <ErrorHandler error={asyncState.error}>
                <CardContent>
                    <Typography variant={"h5"} className={classes.title}> Orders </Typography>
                    {asyncState.loading ? <Spinner/> : content()}
                </CardContent>
            </ErrorHandler>
        </Card>
    )
}
