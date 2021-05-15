import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const CustomizableArea = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}> { props.customizableArea.name } </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        pending
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

CustomizableArea.propTypes = {customizableArea: PropTypes.shape({})};

export default CustomizableArea