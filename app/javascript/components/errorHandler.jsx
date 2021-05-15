import {Container, Typography} from "@material-ui/core";
import React from "react";
import If from "./if";
import * as PropTypes from "prop-types";

const Error = () => (
    <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Error!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
            There was an unexpected error in the application, please try again later. If the error persists contact me.
        </Typography>
    </Container>
)
const ErrorHandler = (props) => (
    <If condition={props.error} then={<Error/>} else={props.children}/>
)

ErrorHandler.propTypes = {
    error: PropTypes.bool,
    children: PropTypes.node
};

export default ErrorHandler;