import React from 'react'
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import {Options} from "../../../app/javascript/components/options";

describe('when the product selection is loading', () => {
    test('renders the loading', () => {
        render(
            <Options error={false} loading={true} onSelection={(_p) => {}} value={[]} selectedOption={null} name={''}>
                children
            </Options>
        )
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    });
})

describe('when the product selection fails', () => {
    test('renders the loading', () => {
        render(
            <Options error={true} loading={false} onSelection={(_p) => {}} value={[]} selectedOption={null} name={''}>
                children
            </Options>
        )
        expect(screen.getByText('Error!')).toBeInTheDocument()
    });
})
describe('when the product selection renders successfully', () => {
    let product = { id:1, name: 'thing'}
    const children = "children";
    describe('select a product', function () {
        test('render the children', () => {
            const productSelection = jest.fn()
            const { getByRole } = render(
                <Options error={false} loading={false} onSelection={productSelection}
                         value={[product]} selectedOption={null} name={''}>
                    {children}
                </Options>
            )
            fireEvent.change(getByRole('listbox'), { target: { value: product.id } });
            expect(productSelection).toHaveBeenCalledTimes(1)
        });
    });
    describe('if there is not a selected product', () => {
        test('render the children', () => {
            render(
                <Options error={false} loading={false} onSelection={(_p) => {}}
                         value={[product]} selectedOption={null} name={''}>
                    {children}
                </Options>
            )
            expect(screen.queryByText(children)).not.toBeInTheDocument()
        });
    })
    describe('if there is a selected product', () => {
        test('render the children', () => {
            render(
                <Options error={false} loading={false} onSelection={(_p) => {}}
                         value={[product]} selectedOption={product} name={''}>
                    {children}
                </Options>
            )
            expect(screen.getByText(children)).toBeInTheDocument()
        });
    });

})

