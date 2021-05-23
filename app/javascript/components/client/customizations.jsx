import OptionsCard from "../common/optionsCard";
import React, {useState} from "react";
import * as PropTypes from "prop-types";
import {priceInDisplayName} from "../../lib/money";
import { v4 as uuidv4 } from 'uuid';

class CustomizationOptions extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            selectedCustomization: null
        }
    }

    onChildrenSelectedCustomization(customization) {
        if (customization) {
            const totalPrice = this.state.selectedCustomization.price + (customization.totalPrice || 0);
            this.props.onSelectedCustomization(
                {...this.state.selectedCustomization, totalPrice: totalPrice, childCustomization: customization})
        } else {
            this.props.onSelectedCustomization(
                {...this.state.selectedCustomization, totalPrice: this.state.selectedCustomization.price})
        }
    }

    onSelectedCustomization(customization) {
        this.props.onSelectedCustomization(customization ? {...customization, totalPrice: customization ? customization.price : 0} : null)
        this.setState({selectedCustomization: customization})
    }

    render() {
        const {name, customizations} = this.props
        const shouldRenderCustomization = this.state.selectedCustomization && this.state.selectedCustomization.customizations.length > 0;
        return (
            <OptionsCard name={name} withSelector={true} options={priceInDisplayName(customizations)}
                         optionChange={(customization) => this.onSelectedCustomization(customization)}>
                {shouldRenderCustomization ?
                    <Customization key={uuidv4()} {...this.state.selectedCustomization}
                                   onSelectedCustomization={(customization) => this.onChildrenSelectedCustomization(customization)}/> : null}
            </OptionsCard>
        )

    }
}

function CustomizationContainer(props) {
    const [childrenCustomizations, setChildrenCustomizations] = useState([]);

    function onChildrenSelectedCustomization(customization, childCustomization) {
        const withoutCustomization = childrenCustomizations.filter((existentCustomization) => customization.id !== existentCustomization.id)
        const customizations = childCustomization ? [...withoutCustomization, {
            ...customization,
            childCustomization: childCustomization
        }] : [...withoutCustomization]
        const totalPrice = customizations.reduce(((acc, customization) => acc + customization.totalPrice), 0);

        setChildrenCustomizations(customizations)
        props.onSelectedCustomization(customizations)
    }

    return (
        <OptionsCard name={props.name} withSelector={false}>
            {props.customizations.map((customization) => (
                <Customization key={uuidv4()} {...customization}
                               onSelectedCustomization={(selectedCustomization) => onChildrenSelectedCustomization(customization, selectedCustomization)}/>)
            )}
        </OptionsCard>
    )
}

export function Customization(props) {
    if (props.option_type === 'container') {
        return <CustomizationContainer {...props} />
    } else {
        return <CustomizationOptions {...props} />
    }
}

Customization.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    customizations: PropTypes.array,
    price: PropTypes.number.isRequired,
    option_type: PropTypes.string.isRequired,
    onSelectedCustomization: PropTypes.func.isRequired
}
