import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import PersonalData from "./personalData";
import {checkoutState} from "../../lib/state";
import {useAppContext} from "./context";
import {Redirect} from "react-router-dom";
import {CenteredCard} from "../common/centeredCard";
import {Review} from "./review";

const useStyles = makeStyles((theme) => ({
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const {product} = checkoutState(useAppContext())
    const steps = ['Review your order', 'Personal data'];
    const {dispatch, actions} = checkoutState(useAppContext())

    useEffect(() => {
        return () => {
            actions.clearCheckout(dispatch)
        }
    }, [])

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Review classes={classes} onNext={handleNext}/>;
            case 1:
                return <PersonalData classes={classes} onBack={handleBack} onNext={handleNext}/>;
            default:
                return null
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    if (product.id) {
        return (
            <CenteredCard>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
            </CenteredCard>
        );
    } else {
        return <Redirect to={'/'}/>
    }

}