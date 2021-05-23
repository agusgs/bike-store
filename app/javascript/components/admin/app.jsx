import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AdminAppBar} from "./adminAppBar";
import {ProductsPage} from "./productsPage";
import {SnackbarProvider} from "notistack";
import {ProductUpdate} from "./productUpdate";
import {OrdersPage} from "./ordersPage";
import {OrderPage} from "./orderPage";
import {ProductCreate} from "./productCreate";

const App = () => {
    return (
        <>
            <CssBaseline/>
            <Router>
                <SnackbarProvider maxSnack={5}>
                    <AdminAppBar/>
                    <Switch>
                        <Route exact path="/admin">
                            <OrdersPage/>
                        </Route>
                        <Route path={"/admin/orders/:id"}>
                            <OrderPage/>
                        </Route>
                        <Route path="/admin/products/create">
                            <ProductCreate/>
                        </Route>
                        <Route path="/admin/products/update/:id">
                            <ProductUpdate/>
                        </Route>
                        <Route path="/admin/products">
                            <ProductsPage/>
                        </Route>
                    </Switch>
                </SnackbarProvider>
            </Router>
        </>
    )
}
export default App