import React from 'react'
import {render, screen} from "@testing-library/react";
import OptionsCard from "../../../../app/javascript/components/common/optionsCard";
import '@testing-library/jest-dom/extend-expect'

let name = 'the name'

function findSelector() {
    return screen.queryByRole('listbox', {id: 'options'});
}

describe('when the withSelector prop is true', () => {
    test('renders the selector', () => {
        render(<OptionsCard name={name} withSelector={true} options={[]}/>)
        expect(findSelector()).toBeInTheDocument()
    });
})

describe('when the withSelector prop is false', () => {
    test('des not render the selector', () => {
        render(<OptionsCard name={name} withSelector={false} options={[]}/>)
        expect(findSelector()).not.toBeInTheDocument()
    });
})

describe('when the footer prop is passed', () => {
    test('renders the footer', () => {
        const footer = "footer"
        render(<OptionsCard name={name} withSelector={false} options={[]} footer={footer}/>)
        expect(screen.getByText(footer)).toBeInTheDocument()
    })
})