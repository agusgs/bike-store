import React from 'react'
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import {AsyncOptions} from "../../../../app/javascript/components/common/asyncOptions";
import {BrowserRouter} from "react-router-dom";

describe('when the product selection is loading', () => {
    test('renders the loading', () => {
        render(
            <AsyncOptions error={false} loading={true} onSelection={(_p) => {
            }} value={[]} selectedOption={null} name={''}>
                children
            </AsyncOptions>
        )
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    });
})

describe('when there is an error', () => {
    test('renders the error', () => {
        render(
            <BrowserRouter>
                <AsyncOptions error={true} loading={false} onSelection={(_p) => {
                }} value={[]} selectedOption={null} name={''}>
                    children
                </AsyncOptions>
            </BrowserRouter>
        )
        expect(screen.getByText('Error!')).toBeInTheDocument()
    });
})

describe('when it renders successfully', () => {
    let element = {id: 1, name: 'thing'}
    const children = "children";
    describe('when the withSelector prop is true', () => {
        describe('select an option', function () {
            test('render the children', () => {
                const productSelection = jest.fn()
                const {getByRole} = render(
                    <AsyncOptions error={false} loading={false} onSelection={productSelection}
                                  value={[element]} selectedOption={null} name={''}>
                        {children}
                    </AsyncOptions>
                )
                fireEvent.change(getByRole('listbox'), {target: {value: element.id}});
                expect(productSelection).toHaveBeenCalledTimes(1)
            });
        });
        describe('if there is not a selected product', () => {
            test('does not render the children', () => {
                render(
                    <AsyncOptions error={false} loading={false} onSelection={(_p) => {
                    }}
                                  value={[element]} selectedOption={null} name={''}>
                        {children}
                    </AsyncOptions>
                )
                expect(screen.queryByText(children)).not.toBeInTheDocument()
            });
        })
        describe('if there is a selected product', () => {
            test('render the children', () => {
                render(
                    <AsyncOptions error={false} loading={false} onSelection={(_p) => {
                    }}
                                  value={[element]} selectedOption={element} name={''}>
                        {children}
                    </AsyncOptions>
                )
                expect(screen.getByText(children)).toBeInTheDocument()
            });
        });
    })
    describe('when the value prop is not passed', () => {
        const options = <AsyncOptions error={false} loading={false} name={''}>
            {children}
        </AsyncOptions>;

        test('does not render the selector', () => {
            render(options)
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        });
        test('render the children', () => {
            render(options)
            expect(screen.getByText(children)).toBeInTheDocument()
        });
    })
})

