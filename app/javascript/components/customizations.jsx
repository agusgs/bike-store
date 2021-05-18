import OptionsCard from "./optionsCard";
import React, {useState} from "react";
import * as PropTypes from "prop-types";
import {priceInDisplayName} from "../lib/money";

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
            this.props.onSelectedCustomization({...this.state.selectedCustomization, childCustomization: customization})
        } else {
            this.props.onSelectedCustomization({...this.state.selectedCustomization})
        }
    }

    onSelectedCustomization(customization) {
        this.props.onSelectedCustomization(customization)
        this.setState({selectedCustomization: customization})
    }

    render() {
        const {name, customizations} = this.props
        const shouldRenderCustomization = this.state.selectedCustomization && this.state.selectedCustomization.customizations.length > 0;
        return (
            <OptionsCard name={name} withSelector={true} options={priceInDisplayName(customizations)}
                         optionChange={(customization) => this.onSelectedCustomization(customization)}>
                {shouldRenderCustomization ?
                    <Customization key={this.state.selectedCustomization.token} {...this.state.selectedCustomization}
                                   onSelectedCustomization={(customization) => this.onChildrenSelectedCustomization(customization)}/> : null}
            </OptionsCard>
        )

    }
}

function CustomizationContainer(props) {
    const [childrenCustomizations, setChildCustomization] = useState([]);

    function onChildrenSelectedCustomization(customization, childCustomization) {
        const withoutCustomization = childrenCustomizations.filter((existentCustomization) => customization.token !== existentCustomization.token)
        const customizations = childCustomization ? [...withoutCustomization, {
            ...customization,
            childCustomization: childCustomization
        }] : [...withoutCustomization]

        setChildCustomization(customizations)
        props.onSelectedCustomization(customizations)
    }

    return (
        <OptionsCard name={props.name} withSelector={false}>
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
    token: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    customizations: PropTypes.array,
    option_type: PropTypes.string.isRequired,
    onSelectedCustomization: PropTypes.func.isRequired
}
;
