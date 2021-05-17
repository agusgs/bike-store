import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
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

const OptionsCard = (props) => {
    const classes = useStyles();

    const [selectedOption, setSelectedOption] = useState({});

    const handleOptionChange = (event) => {
        const newOption = props.options.find(option => (option.id === parseInt(event.target.value)));
        setSelectedOption(newOption)
        props.optionChange(newOption)
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
                            {
                                (props.options || []).map(option => (
                                    <option role="option" key={option.id} value={option.id}>{option.name}</option>))
                            }
                        </Select>
                    </>
                }/>
                {
                    props.children || null
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
};

export default OptionsCard