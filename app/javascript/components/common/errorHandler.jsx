import {Container, Link, Typography} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";

const Error = () => (
    <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Error!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
            There was an unexpected error in the application, please try again later. If the error persists create an &nbsp;
            <a href="https://github.com/agusgs/bike-store/issues" target="_blank">issue</a>.
        </Typography>
        <Link component="button" onClick={() => window.location.reload()}>
            Try Again
        </Link>
    </Container>
)
const ErrorHandler = (props) => {
    return props.error ? <Error/> : props.children
}

ErrorHandler.propTypes = {
    error: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default ErrorHandler;