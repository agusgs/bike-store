import {Select} from "@material-ui/core";
import React, {useState} from "react";

export function CustomizationTypeSelection(props) {
    const optionValue = 'option';
    const containerValue = 'container';
    const [selectedOption, setSelectedOption] = useState(props.selected);

    function updateSelectedOption(event) {
        const newOption = event.target.value
        const oldOption = selectedOption
        setSelectedOption(newOption)
        props.onChange(newOption).catch(() => setSelectedOption(oldOption))
    }

    return(
        <Select
            native
            value={selectedOption}
            onChange={updateSelectedOption}
            inputProps={{role: "listbox", id: 'customization_type'}}
        >
            <option role="option" value={optionValue}>Option</option>
            <option role="option" value={containerValue}>Container</option>
        </Select>
    )
}