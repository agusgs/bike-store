import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {InputLabel, Select} from "@material-ui/core";
import PropTypes from "prop-types";
import If from "./if";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 20
    },
    title: {
        fontSize: 14,
    },
});

function OptionsCard(props) {
    const classes = useStyles();

    const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        if (props.selectedOption) {
            setSelectedOption(props.selectedOption)
        }
    })

    const handleOptionChange = (event) => {
        const value = event.target.value
        if (value !== 'none') {
            const newOption = props.options.find(option => (option.id.toString() === value.toString()));
            setSelectedOption(newOption)
            props.optionChange(newOption)
        } else {
            setSelectedOption({})
            props.optionChange(null)
        }
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.name}
                </Typography>
                <If condition={props.withSelector} then={
                    <>
                        <InputLabel htmlFor="option"/>
                        <Select
                            native
                            value={selectedOption.id || ''}
                            onChange={handleOptionChange}
                            inputProps={{
                                role: "listbox",
                                id: 'options',
                            }}
                        >
                            <option role="option" key={-1} value={'none'}>None</option>
                            {(props.options || []).map(option => (
                                <option role="option" key={option.id} value={option.id}>{option.name}</option>))}
                        </Select>
                    </>
                }/>
                {
                    (selectedOption.id || !props.withSelector) ? props.children || null : null
                }
            </CardContent>
        </Card>
    );
}

OptionsCard.propTypes = {
    name: PropTypes.string.isRequired,
    withSelector: PropTypes.bool.isRequired,
    options: PropTypes.array,
    optionChange: PropTypes.func,
    children: PropTypes.node,
    selectedOption: PropTypes.object
}


export default OptionsCard