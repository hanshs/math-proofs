import Theorem from "../components/Theorem";
import { render } from '@testing-library/react'

const testTheorem = {
    claim: {
        statement: 'I am thorem statement',
        successor: {
            statement: 'I am detailed statement'
        }
    },
    proof: [
        { claim: { statement: 'Step 1' } },
        {
            claim: { statement: 'Step 2' },
            subProof: [
                { claim: { statement: 'Step 2 Subproof Step 1', successor: { statement: 'Step 2 Subproof Step 1 more detailed' } } },
                { claim: { statement: 'Step 2 Subproof Step 2' } }
            ]
        },
        { claim: { statement: 'Step 3' } },
        { claim: { statement: 'Step 4' } }
    ]
}

it('renders a theorem', () => {
    render(<Theorem theorem={testTheorem} />)
})