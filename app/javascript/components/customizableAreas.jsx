import {customizableAreasState} from "../lib/state";
import {useAppContext} from "./context";
import If from "./if";
import {Spinner} from "./spinner";
import ErrorHandler from "./errorHandler";
import React from "react";
import OptionsCard from "./optionsCard";
import {Options} from "./options";

export function CustomizableAreasComponent(props) {
    const {loading, error, value} = props
    return (
        <OptionsCard name={'Customize your product'} withSelector={false}>
            <If condition={loading} then={<Spinner/>} else={
                <ErrorHandler error={error}>
                    {
                        value.map((customizableArea) => (
                            <Options key={customizableArea.id} name={customizableArea.name} error={false} loading={false} value={[]} onSelection={() => {}}>
                                pendiente
                            </Options>
                        ))
                    }
                </ErrorHandler>
            }/>
        </OptionsCard>
    )
}

export function CustomizableAreas() {
    const {customizableAreas, dispatch, actions} = customizableAreasState(useAppContext())

    return (
        <CustomizableAreasComponent {...customizableAreas}/>
    )
}