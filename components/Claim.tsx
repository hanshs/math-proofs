import React from "react"
import Latex from 'react-latex-next'

interface ClaimProps {
    claim: Claim;
    className?: string;
}

interface Claim {
    statement: string;
    successor?: Claim | null;
}

export default function Claim(props: ClaimProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <span className={props.claim.successor ? 'cursor-pointer text-blue-700' : ''} onClick={() => setIsOpen(isOpen => !isOpen)}><Latex>{props.claim.statement}</Latex></span>
            {isOpen && props.claim.successor && <div className="ml-4"><Claim className="ml-4" claim={props.claim.successor} /></div>}
        </>
    )
}