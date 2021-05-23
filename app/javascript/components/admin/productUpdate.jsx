import React, {useEffect, useState} from 'react'
import {CenteredCard} from "../common/centeredCard";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CardActions,
    FormControlLabel,
    ListItem,
    Switch
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link, useParams} from "react-router-dom";
import {euro} from "../../lib/money";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import CustomizableAreaCreationModal from "./customizableAreaCreationModal";
import {getProduct, updateProduct} from "../../lib/api";
import ErrorHandler from "../common/errorHandler";
import {Spinner} from "../common/spinner";
import CustomizationCreationModal from "./customizationCreationModal";
import List from "@material-ui/core/List";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordion: {
        padding: 0
    }
}));

function AvailableCustomizations(props) {
    const classes = useStyles();
    const {name, price} = props.parent
    const [newCustomization, setNewCustomization] = useState(false)
    const [customizations, setCustomizations] = useState(props.customizations)

    function customizationCreated(customization) {
        setCustomizations([...customizations, customization])
    }

    return (
        <>
            <Accordion expanded={true}>
                <AccordionSummary
                    expandIcon={<AddIcon/>}
                    aria-controls="customizations"
                    id="customizations"
                    onClick={() => setNewCustomization(true)}
                >
                    <Typography
                        className={classes.heading}>{`${name} (${euro(price).format()})`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="div" disablePadding>
                        {
                            customizations.map((customization) => (
                                <ListItem component={"div"} key={customization.id}>
                                    <AvailableCustomizations
                                        parent={customization}
                                        customizations={customization.customizations || []}
                                    />
                                </ListItem>))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
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
    />)
}

function ProductAvailableCustomizationsComponent(props) {
    const classes = useStyles();
    const {id, name, price, available} = props.product
    const [newCustomizableArea, setNewCustomizableArea] = useState(false)
    const [customizableAreas, setCustomizableAreas] = useState(props.customizableAreas)
    const [listed, setListed] = React.useState(available);
    const { enqueueSnackbar } = useSnackbar();

    function customizableAreaCreated(customizableArea) {
        setCustomizableAreas([...customizableAreas, customizableArea])
    }

    function toggleListed() {
        const available = !listed;
        setListed(available)
        updateProduct(id, available).then(() => {
            enqueueSnackbar(`Product updated`, { variant: "success" })
        }).catch(() => {
            setListed(!available)
            enqueueSnackbar('There was an error updating your product', { variant: "error" })
        })
    }

    return (
        <>
            <CardContent>
                <Typography variant={"h5"}>{`Product ${id}`}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {`${name} (${euro(price).format()}) ${listed ? "LISTED" : "UNLISTED"}`}
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
                            label="Listed"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion expanded={true}>
                            <AccordionSummary
                                expandIcon={<AddIcon/>}
                                aria-controls="customizable_areas"
                                id="customizable_areas"
                                onClick={() => setNewCustomizableArea(true)}
                            >
                                <Typography className={classes.heading}>Customizable Areas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="div" disablePadding>
                                    {
                                        customizableAreas.map((customizableArea) => (
                                            <ListItem component={"div"} key={customizableArea.id}>
                                                <CustomizableAreaAvailableCustomizations
                                                    customizableArea={customizableArea}/>
                                            </ListItem>))
                                    }
                                </List>
                            </AccordionDetails>
                        </Accordion>
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
