import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppContext from "./context";
import {ProductsSelection} from "./productsSelection";
import {BrowserRouter as Router, Link as RouterLink, Route, Switch} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkout from "./checkout/checkout";
import {Link} from "@material-ui/core";

const App = () => (
    <>
        <CssBaseline/>
        <AppContext>
            <Router>
                <AppBar position="relative" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                                <RouterLink to={"/"}>
                                    <Link component={"div"} onClick={()=>{}}>
                                        Super Bike Store
                                    </Link>
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