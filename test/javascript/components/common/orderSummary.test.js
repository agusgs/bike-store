import React from 'react'
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import OrderSummary from "../../../../app/javascript/components/common/orderSummary";
import {euro} from "../../../../app/javascript/lib/money";

describe('render the order summary', () => {
    let props = {
        product: {
            id: 1,
            name: "coso",
            price: 1000
        },
        total: 100,
        customizations: []
    }

    test('renders the total', () => {
        render(<OrderSummary {...props} />)
        expect(screen.getByText('Total')).toBeInTheDocument()
        expect(screen.getByText(euro(props.total).format())).toBeInTheDocument()
    });

    test('renders the product', () => {
        render(<OrderSummary {...props} />)
        expect(screen.getByText(props.product.name)).toBeInTheDocument()
        expect(screen.getByText(euro(props.product.price).format())).toBeInTheDocument()
    });

    describe('with children', () => {
        let nestedFirstChild = {
            id: 3,
            name: "other thing",
            price: 12123
        };
        let firstChildren = {
            id: 2,
            name: "thing",
            childCustomization: nestedFirstChild
        }
        let firstNestedSecondChild = {
            id: 5,
            name: "p",
        }
        let secondNestedSecondChild = {
            id: 6,
            name: "a",
            price: 10
        }
        let secondChildren = {
            id: 4,
            name: "yes another thing",
            price: 12321,
            childCustomization: [
                firstNestedSecondChild,
                secondNestedSecondChild
            ]

        }

        test('renders the customizations', () => {
            render(<OrderSummary {...props} customizations={[firstChildren, secondChildren]} />)
            expect(screen.getByText(firstChildren.name)).toBeInTheDocument()
            expect(screen.queryByText(euro(firstChildren.price).format())).not.toBeInTheDocument()
            expect(screen.getByText(nestedFirstChild.name)).toBeInTheDocument()
            expect(screen.getByText(euro(nestedFirstChild.price).format())).toBeInTheDocument()
            expect(screen.getByText(firstNestedSecondChild.name)).toBeInTheDocument()
            expect(screen.queryByText(euro(firstNestedSecondChild.price).format())).not.toBeInTheDocument()
            expect(screen.getByText(secondNestedSecondChild.name)).toBeInTheDocument()
            expect(screen.getByText(euro(secondNestedSecondChild.price).format())).toBeInTheDocument()
            expect(screen.getByText(secondChildren.name)).toBeInTheDocument()
            expect(screen.getByText(euro(secondChildren.price).format())).toBeInTheDocument()
        });
    })
})
