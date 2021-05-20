import OptionsCard from "./optionsCard";
import {Spinner} from "./spinner";
import ErrorHandler from "./errorHandler";
import * as PropTypes from "prop-types";
import React from "react";

export function AsyncOptions(props) {
    const {name, loading, error, value, onSelection, selectedOption, children, footer} = props

    function shouldShowSelector() {
        return !!value && !((loading && !error) || (!loading && error))
    }

    const onSelectionCallback = value ? onSelection : () => {}

    return (
        <ErrorHandler error={error}>
            <OptionsCard name={name}
                         withSelector={shouldShowSelector()}
                         options={value || []}
                         optionChange={onSelectionCallback}
                         selectedOption={selectedOption}
                         footer={footer}
            >
                {loading ? <Spinner/> : children}
            </OptionsCard>
        </ErrorHandler>
    )
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