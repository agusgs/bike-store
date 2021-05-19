import OptionsCard from "./optionsCard";
import IfThenElse from "./ifThenElse";
import {Spinner} from "./spinner";
import ErrorHandler from "./errorHandler";
import * as PropTypes from "prop-types";
import React from "react";

export function AsyncOptions(props) {
    const {name, loading, error, value, onSelection, selectedOption, children, footer} = props

    function shouldShowSelector() {
        return !!value && !((loading && !error) || (!loading && error))
    }

    const onSelectionCallback = value ? onSelection : () => {
    }

    function content() {
        if (loading) {
            return <Spinner/>
        } else {
            return (
                <ErrorHandler error={error}>
                    {children}
                </ErrorHandler>)
        }
    }

    return (
        <OptionsCard name={name}
                     withSelector={shouldShowSelector()}
                     options={value || []}
                     optionChange={onSelectionCallback}
                     selectedOption={selectedOption}
                     footer={footer}
        >
            {content()}
        </OptionsCard>
    );
}

AsyncOptions.propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    value: PropTypes.arrayOf(PropTypes.object),
    onSelection: PropTypes.func,
    selectedOption: PropTypes.object,
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    footer: PropTypes.node,
};