import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {euro} from "../../lib/money";
import {Collapse} from "@material-ui/core";
import If from "./if";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: 0,
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    nested: {
        paddingLeft: theme.spacing(2),
    },
    text: {
        margin: 0
    }
}));

function LineItem(props) {
    function list(items) {
        return (
            <Collapse className={props.classes.nested} in={true} unmountOnExit>
                <List disablePadding>
                    {items}
                </List>
            </Collapse>
        )
    }

    function subItems() {
        if (props.childCustomization) {
            if (Array.isArray(props.childCustomization) && props.childCustomization.length > 0) {
                return list(props.childCustomization.map(item => <LineItem key={uuidv4()}
                                                                           classes={props.classes} {...item}/>))
            } else {
                return list(<LineItem key={uuidv4()} classes={props.classes} {...props.childCustomization}/>)
            }
        } else {
            return null
        }
    }

    return (
        <>
            <ListItem className={props.classes.listItem}>
                <ListItemText className={props.classes.text} primary={props.name}/>
                <If condition={!!props.price && props.price > 0}>
                    <Typography variant="body2">{euro(props.price).format()}</Typography>
                </If>
            </ListItem>
            {subItems()}
        </>
    )
}

export default function OrderSummary(props) {
    const {product, customizations, total} = props
    const classes = useStyles();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        {euro(total).format()}
                    </Typography>
                </ListItem>
                <LineItem
                    key={uuidv4()}
                    name={product.name}
                    childCustomization={customizations}
                    price={product.price}
                    classes={classes}
                />
            </List>
        </>
    );
}
