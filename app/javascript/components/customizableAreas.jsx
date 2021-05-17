import {customizableAreasState} from "../lib/state";
import {useAppContext} from "./context";
import If from "./if";
import {Spinner} from "./spinner";
import ErrorHandler from "./errorHandler";
import React, {useState} from "react";
import OptionsCard from "./optionsCard";
import {Customization} from "./customizations";
import {Options} from "./options";


export function CustomizableAreas() {
    const {customizableAreas, dispatch, actions} = customizableAreasState(useAppContext())

    const onCustomizableAreaCustomized = (customizableArea) => (selectedCustomizations) => {
        actions.areaCustomized(dispatch, customizableArea, selectedCustomizations)
    }

    return (
        <Options name={'Customize your product'} loading={customizableAreas.loading} error={customizableAreas.error}>
            {
                customizableAreas.value.map((customizableArea) => (
                    <Customization key={customizableArea.token} {...customizableArea} option_type={'option'} onSelectedCustomization={onCustomizableAreaCustomized(customizableArea)}/>
                ))
            }
        </Options>
    )
}
