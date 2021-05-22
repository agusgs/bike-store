import {CircularProgress, makeStyles} from "@material-ui/core";
import React from "react";

const spinnerStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export function Spinner() {
    const classes = spinnerStyles();
    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    );
}