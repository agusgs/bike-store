import {customizableAreasState} from "../../lib/state";
import {useAppContext} from "./context";
import React from "react";
import {Customization} from "./customizations";
import {AsyncOptions} from "../common/asyncOptions";


export function CustomizableAreas() {
    const {customizableAreas, dispatch, actions} = customizableAreasState(useAppContext())

    const onCustomizableAreaCustomized = (customizableArea) => (selectedCustomizations) => {
        actions.areaCustomized(dispatch, customizableArea, selectedCustomizations)
    }

    return (
        <AsyncOptions name={'Customize your product'} loading={customizableAreas.loading} error={customizableAreas.error}>
            {
                customizableAreas.value ? customizableAreas.value.map((customizableArea) => (
                    <Customization
                        key={customizableArea.token}
                        option_type={'option'}
                        onSelectedCustomization={onCustomizableAreaCustomized(customizableArea)}
                        price={0}
                        {...customizableArea}
                    />
                )) : null
            }
        </AsyncOptions>
    )
}
