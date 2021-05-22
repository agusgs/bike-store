import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppContext from "./context";
import {ProductsSelection} from "./productsSelection";
import {BrowserRouter as Router, Link as RouterLink, Route, Switch} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkout from "./checkout";

const App = () => (
    <>
        <CssBaseline/>
        <AppContext>
            <Router>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6">
                            <RouterLink style={{color:"inherit"}} to={"/"}>
                                Super Bike Store
                            </RouterLink>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/">
                        <ProductsSelection/>
                    </Route>
                    <Route path="/checkout">
                        <Checkout/>
                    </Route>
                </Switch>
            </Router>
        </AppContext>
    </>
)
export default App