import OptionsCard from "../common/optionsCard";
import React, {useState} from "react";
import * as PropTypes from "prop-types";
import {euro, priceInDisplayName} from "../../lib/money";

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
            if (customization.id === this.state.selectedCustomization.id) {
                this.props.onSelectedCustomization(customization)
            } else {
                const totalPrice = customization.totalPrice || 0
                this.props.onSelectedCustomization(
                    {...this.state.selectedCustomization, totalPrice: totalPrice, childCustomization: customization})
            }
        } else {
            this.props.onSelectedCustomization(
                {...this.state.selectedCustomization, totalPrice: this.state.selectedCustomization.price})
        }
    }

    onSelectedCustomization(customization) {
        this.props.onSelectedCustomization(customization ? {
            ...customization,
            totalPrice: customization ? customization.price : 0
        } : null)
        this.setState({selectedCustomization: customization})
    }

    render() {
        const {name, customizations} = this.props
        const shouldRenderCustomization = this.state.selectedCustomization && this.state.selectedCustomization.customizations.length > 0;
        return (
            <OptionsCard name={name} withSelector={true} options={priceInDisplayName(customizations)}
                         optionChange={(customization) => this.onSelectedCustomization(customization)}>
                {shouldRenderCustomization ?
                    <Customization key={this.props.token} {...this.state.selectedCustomization}
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
            totalPrice: childCustomization.totalPrice + customization.price,
            childCustomization: childCustomization
        }] : [...withoutCustomization]
        const totalPrice = customizations.reduce(((acc, customization) => acc + customization.totalPrice || 0), 0);

        setChildrenCustomizations(customizations)
        props.onSelectedCustomization({
            ...props,
            childCustomization: customizations,
            totalPrice: totalPrice + props.price})
    }

    const name = props.name + ((props.price && props.price > 0) ? ` (${euro(props.price).format()})` : "")
    return (
        <OptionsCard name={name} withSelector={false}>
            {props.customizations.map((customization) => (
                <Customization key={customization.token} {...customization}
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
