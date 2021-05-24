import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {CardActions, CircularProgress} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {createCustomizableArea} from "../../lib/api";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {CustomModal} from "../common/customModal";

export default function CustomizableAreaCreationModal(props) {
    const {enqueueSnackbar} = useSnackbar();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [asyncState, setAsyncState] = useState({loading: false, error: false, created: {}})

    function handleCreate() {
        validateName()
        if (nameValid()) {
            setAsyncState({loading: true, error: false, created: {}})
            createCustomizableArea(props.product, name).then((created) => {
                setAsyncState({loading: false, error: false, created: created})
                enqueueSnackbar('Customizable area created', {variant: "success"})
                setName("")
                props.handleCreate(created)
                props.handleClose()
            }).catch((_e) => {
                setAsyncState({loading: false, error: true, created: {}})
                enqueueSnackbar('There was an error creating your customizable area', {variant: "error"})
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

    return (
        <CustomModal open={props.open} handleClose={props.handleClose}>
            <CardContent>
                <Typography variant={"h5"}> {`Create a new customizable area for ${props.product.name}`} </Typography>
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
    )
}