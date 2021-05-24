import React, {useEffect, useState} from 'react'
import {CenteredCard} from "../common/centeredCard";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
    CardActions,
    FormControlLabel,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Switch
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link, useParams} from "react-router-dom";
import {euro} from "../../lib/money";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import CustomizableAreaCreationModal from "./customizableAreaCreationModal";
import {getProduct, updateCustomization, updateProduct} from "../../lib/api";
import ErrorHandler from "../common/errorHandler";
import {Spinner} from "../common/spinner";
import CustomizationCreationModal from "./customizationCreationModal";
import List from "@material-ui/core/List";
import {useSnackbar} from "notistack";
import {v4 as uuidv4} from 'uuid';
import {CustomizationTypeSelection} from "./customizationTypeSelection";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    selector: {
        marginRight: theme.spacing(2),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function AvailableCustomizations(props) {
    const classes = useStyles();
    const {id, name, price, option_type} = props.parent
    const [newCustomization, setNewCustomization] = useState(false)
    const [customizations, setCustomizations] = useState(props.customizations)
    const {enqueueSnackbar} = useSnackbar();

    function customizationCreated(customization) {
        setCustomizations([...customizations, customization])
    }

    function updateCustomizationType(value) {
        return updateCustomization(id, value).then(() => {
            enqueueSnackbar(`Customization updated`, {variant: "success"})
        }).catch((e) => {
            enqueueSnackbar('There was an error updating your customization', {variant: "error"})
            throw new Error(e)
        })
    }

    return (
        <>
            <List disablePadding className={classes.nested} expanded={true}>
                <ListItem disablePadding>
                    <ListItemText primary={`${name} (${euro(price).format()})`}/>
                    {
                        props.withSelector ? <div className={classes.selector}>
                            <CustomizationTypeSelection selected={option_type} onChange={updateCustomizationType}/>
                        </div> : null

                    }
                    <ListItemSecondaryAction onClick={() => setNewCustomization(true)}>
                        <IconButton aria-label="add">
                            <AddIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {
                    customizations.map((customization) => (
                        <AvailableCustomizations
                            key={uuidv4()}
                            parent={customization}
                            customizations={customization.customizations || []}
                            withSelector
                        />))
                }
            </List>
            <CustomizationCreationModal
                open={newCustomization}
                handleClose={() => setNewCustomization(false)}
                handleCreate={customizationCreated}
                parent={props.parent}
            />
        </>
    )
}

function CustomizableAreaAvailableCustomizations(props) {
    return (<AvailableCustomizations parent={{...props.customizableArea, customizableArea: true}}
                                     customizations={props.customizableArea.customizations || []}
                                     withSelector={false}
    />)
}

function ProductAvailableCustomizationsComponent(props) {
    const {id, name, price, available} = props.product
    const [newCustomizableArea, setNewCustomizableArea] = useState(false)
    const [customizableAreas, setCustomizableAreas] = useState(props.customizableAreas)
    const [listed, setListed] = React.useState(available);
    const {enqueueSnackbar} = useSnackbar();

    function customizableAreaCreated(customizableArea) {
        setCustomizableAreas([...customizableAreas, customizableArea])
    }

    function toggleListed() {
        const available = !listed;
        setListed(available)
        updateProduct(id, available).then(() => {
            enqueueSnackbar(`Product updated`, {variant: "success"})
        }).catch(() => {
            setListed(!available)
            enqueueSnackbar('There was an error updating your product', {variant: "error"})
        })
    }

    return (
        <>
            <CardContent>
                <Typography variant={"h5"}>{`Product ${id}`}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {`${name} (${euro(price).format()})`}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={listed}
                                    onChange={toggleListed}
                                    color="primary"
                                    name="listed"
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={`${listed ? "LISTED" : "UNLISTED"}`}/>
                    </Grid>
                    <Grid item xs={12}>
                        <List disablePadding>
                            <ListItem disablePadding>
                                <ListItemText primary={"Customizable Areas"}/>
                                <ListItemSecondaryAction onClick={() => setNewCustomizableArea(true)}>
                                    <IconButton edge="end" aria-label="add">
                                        <AddIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {
                                customizableAreas.map((customizableArea) => (
                                    <CustomizableAreaAvailableCustomizations
                                        key={uuidv4()}
                                        customizableArea={customizableArea}/>))
                            }
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                >
                    <Link to={"/admin/products"} style={{color: "inherit", textDecoration: "none"}}>Finish</Link>
                </Button>
            </CardActions>
            <CustomizableAreaCreationModal
                open={newCustomizableArea}
                handleClose={() => setNewCustomizableArea(false)}
                handleCreate={customizableAreaCreated}
                product={props.product}
            />
        </>
    )
}

export function ProductUpdate() {
    const {id} = useParams();
    const [asyncState, setAsyncState] = useState({loading: true, error: false, product: {}})

    useEffect(() => {
        getProduct(id).then((product) => {
            setAsyncState({loading: false, error: false, product: product})
        }).catch((_e) => {
            setAsyncState({loading: false, error: true, product: {}})
        })
    }, [])

    return (
        <CenteredCard>
            <ErrorHandler error={asyncState.error}>
                {asyncState.loading ? <Spinner/> : <ProductAvailableCustomizationsComponent
                    product={asyncState.product}
                    customizableAreas={asyncState.product.customizable_areas || []}/>
                }
            </ErrorHandler>
        </CenteredCard>
    )
}
