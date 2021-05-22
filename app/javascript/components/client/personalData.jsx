import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {useAppContext} from "./context";
import {checkoutState} from "../../lib/state";
import {CircularProgress} from "@material-ui/core";
import ErrorHandler from "../common/errorHandler";
import {Link} from "react-router-dom";

export default function PersonalData(props) {
    const {checkout, product, customizations, dispatch, actions} = checkoutState(useAppContext())

    const [firstName, setFirstName] = React.useState("");
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastName, setLastName] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);

    function validMail(email) {
        return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)
    }

    function validField(fieldValue) {
        return fieldValue && fieldValue !== "";
    }

    function validatePresent(fieldValue, setError) {
        if (!validField(fieldValue)) {
            setError(true)
        }
    }

    function validateFirstName() {
        validatePresent(firstName, setFirstNameError)
    }

    function validateLastName() {
        validatePresent(lastName, setLastNameError)
    }

    function validateEmail() {
        if (!validMail(email)) {
            setEmailError(true)
        }
    }

    function formValid() {
        return validField(firstName) && validField(lastName) && validMail(email);
    }

    function canCheckout() {
        validateFirstName(firstName)
        validateLastName(lastName)
        validateEmail(email)
        return formValid()
    }

    function completeCheckout() {
        if (canCheckout()) {
            actions.checkout(dispatch, product, customizations, {
                client_name: firstName,
                client_lastname: lastName,
                client_email: email
            })
        }
    }

    if (checkout.value) {
        return <>
            <Typography variant="h5" gutterBottom>
                Thanks for choosing us.
            </Typography>
            <Typography variant="subtitle1">
                {`We registered your order with the number #${checkout.value.number}. We'll contact you in the next couple
                 of hours to explain to you how get your product :)`}
            </Typography>
            <div className={props.classes.buttons}>
                <Link to="/">
                    <Button onClick={() => actions.clearCheckout(dispatch)} className={props.classes.button}>
                        Back
                    </Button>
                </Link>
            </div>
        </>;
    }
    return (
        <ErrorHandler error={checkout.error}>
            <Typography variant="h6" gutterBottom>
                Personal Data
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        error={firstNameError}
                        helperText={firstNameError ? 'This field is required' : ""}
                        onBlur={() => validateFirstName()}
                        onFocus={() => setFirstNameError(false)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastNameError}
                        helperText={lastNameError ? 'This field is required' : ""}
                        onBlur={() => validateLastName()}
                        onFocus={() => setLastNameError(false)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        helperText={emailError ? "A valid email is needed" : ""}
                        onBlur={() => validateEmail()}
                        onFocus={() => setEmailError(false)}
                    />
                </Grid>
            </Grid>
            <div className={props.classes.buttons}>
                <Button
                    disabled={checkout.loading}
                    onClick={props.onBack}
                    className={props.classes.button}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={completeCheckout}
                    className={props.classes.button}
                >
                    {checkout.loading ? <CircularProgress color="secondary"/> : "Next"}
                </Button>
            </div>
        </ErrorHandler>
    );
}