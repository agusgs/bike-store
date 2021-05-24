import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {CardActions, CircularProgress, Select} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {createCustomization} from "../../lib/api";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {CustomModal} from "../common/customModal";
import {CustomizationTypeSelection} from "./customizationTypeSelection";

export default function CustomizationCreationModal(props) {
    const optionValue = 'option';
    const containerValue = 'container';
    const {enqueueSnackbar} = useSnackbar();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [price, setPrice] = useState(0);
    const [selectedOption, setSelectedOption] = useState(optionValue);
    const [asyncState, setAsyncState] = useState({loading: false, error: false, created: {}})

    function handleCreate() {
        validateName()
        if (nameValid()) {
            setAsyncState({loading: true, error: false, created: {}})
            createCustomization(props.parent, name, price, selectedOption).then((created) => {
                setAsyncState({loading: false, error: false, created: created})
                enqueueSnackbar('Customization created', {variant: "success"})
                setName("")
                setPrice(0)
                setSelectedOption(optionValue)
                props.handleCreate(created)
                props.handleClose()
            }).catch((_e) => {
                setAsyncState({loading: false, error: true, created: {}})
                enqueueSnackbar('There was an error creating your customization', {variant: "error"})
            })
        }
    }

    function nameValid() {
        return name && name !== "";
    }

    function validateName() {
        if (nameValid()) {
            setNameError(false);
        } else {
            setNameError(true)
        }
    }

    function setPriceFromEvent(e) {
        const number = parseInt(e.target.value);
        if (!isNaN(number)) {
            setPrice(number);
        }
    }

    function updateSelectedOption(value) {
        setSelectedOption(value)
        return Promise.resolve()
    }

    return (
        <CustomModal
            open={props.open}
            onClose={props.handleClose}
        >
            <CardContent>
                <Typography variant={"h5"}> {`Create a new customization for ${props.parent.name}`} </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={nameError}
                            helperText={nameError ? 'This field is required' : ""}
                            onBlur={() => validateName()}
                            onFocus={() => setNameError(false)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-number"
                            value={price}
                            label="Price in cents"
                            type="number"
                            inputProps={{min: 0}}
                            onChange={setPriceFromEvent}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomizationTypeSelection selcted={selectedOption} onChange={updateSelectedOption}/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    disabled={asyncState.loading}
                    onClick={props.handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                    disabled={asyncState.loading}
                >
                    {asyncState.loading ? <CircularProgress/> : "Create"}
                </Button>
            </CardActions>
        </CustomModal>
    );
}