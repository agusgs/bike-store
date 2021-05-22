import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AdminAppBar} from "./adminAppBar";
import {ProductsPage} from "./productsPage";
import {ProductCreatePage} from "./productCreatePage";
import {SnackbarProvider} from "notistack";

const App = () => {
    return (
        <>
            <CssBaseline/>
            <SnackbarProvider maxSnack={5}>
                <Router>
                    <AdminAppBar/>
                    <Switch>
                        <Route exact path="/admin">
                            {"Admin home page"}
                        </Route>
                        <Route path="/admin/products/create">
                            <ProductCreatePage/>
                        </Route>
                        <Route path="/admin/products">
                            <ProductsPage/>
                        </Route>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </>
    )
}
export default App