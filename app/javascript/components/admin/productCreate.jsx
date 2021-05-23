import React, {useState} from 'react'
import {CardActions, CircularProgress, FormControlLabel, Switch} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {CenteredCard} from "../common/centeredCard";
import Button from "@material-ui/core/Button";
import {createProduct} from "../../lib/api";
import {useSnackbar} from 'notistack';
import {Link, useHistory} from 'react-router-dom';

export function ProductCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState(false);
    const [price, setPrice] = React.useState(0);
    const [available, setAvailable] = React.useState(false);
    const [asyncState, setAsyncState] = useState({loading: false, error: false, created: {}})
    const history = useHistory();

    function handleCreate() {
        validateName()
        if (nameValid()) {
            setAsyncState({loading: true, error: false, created: {}})
            createProduct(name, price, available).then((created) => {
                setAsyncState({loading: false, error: false, created: created})
                enqueueSnackbar('Product created', { variant: "success" })
                history.push(`/admin/products/update/${created.id}`)
            }).catch(() => {
                setAsyncState({loading: false, error: true, created: {}})
                enqueueSnackbar('There was an error creating your product', { variant: "error" })
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

    return (
        <CenteredCard>
            <CardContent>
                <Typography variant={"h5"}> Create a Product </Typography>
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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={available}
                                    onChange={() => setAvailable(!available)}
                                    color="primary"
                                    name="listed"
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label="Listed"/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    disabled={asyncState.loading}
                >
                    <Link to={"/admin/products"} style={{color: "inherit", textDecoration: "none"}}>Cancel</Link>
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
        </CenteredCard>
    );
}