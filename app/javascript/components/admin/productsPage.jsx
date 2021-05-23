import {getProducts} from "../../lib/api";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {euro} from "../../lib/money";
import ErrorHandler from "../common/errorHandler";
import {Spinner} from "../common/spinner";
import Button from "@material-ui/core/Button";
import {Card, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Link, useHistory} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
    title: {
        marginBottom: 10
    },
    button: {
        marginTop: 10
    }
});

export function ProductsPage() {
    const classes = useStyles();
    const [asyncState, setAsyncState] = useState({loading: true, error: false, products: []})
    const history = useHistory();

    useEffect(() => {
        getProducts().then((products) => {
            setAsyncState({loading: false, error: false, products: products})
        }).catch((_e) => {
            setAsyncState({loading: false, error: true, products: []})
        })
    }, [])

    const content = () => (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Listed</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {asyncState.products.map((product) => (
                            <TableRow onClick={() => { history.push(`/admin/products/update/${product.id}`)}} key={product.id}>
                                <TableCell component="th" scope="row"> {product.id} </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.available ? "YES" : "NO"}</TableCell>
                                <TableCell align="right">{euro(product.price).format()}</TableCell>
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
                    <Typography variant={"h5"} className={classes.title}> Products </Typography>
                    {asyncState.loading ? <Spinner/> : content()}
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        <Link style={{color: "inherit", textDecoration: "none"}} to={"/admin/products/create"}>Create
                            new product </Link>
                    </Button>
                </CardActions>
            </ErrorHandler>
        </Card>
    )
}
