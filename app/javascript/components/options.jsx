import OptionsCard from "./optionsCard";
import If from "./if";
import {Spinner} from "./spinner";
import ErrorHandler from "./errorHandler";
import * as PropTypes from "prop-types";
import React from "react";

export function Options(props) {
    const {name, loading, error, value, onSelection, selectedOption, children} = props

    function shouldShowSelector() {
        return !((loading && !error) || (!loading && error))
    }

    return (
        <OptionsCard name={name} withSelector={shouldShowSelector()}
                     options={value} optionChange={onSelection}>
            <If condition={loading} then={<Spinner/>} else={
                <ErrorHandler error={error}>
                    <If condition={!!selectedOption} then={children}/>
                </ErrorHandler>
            }/>
        </OptionsCard>
    );
}

Options.propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelection: PropTypes.func.isRequired,
    selectedOption: PropTypes.object,
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
};