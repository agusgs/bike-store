import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./home";

const App = () => (
    <React.Fragment>
        <CssBaseline />
        { <Home /> }
    </React.Fragment>
)
export default App