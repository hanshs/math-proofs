

import React from "react"

export interface IClaimCreate {
    statement: string
    successor?: IClaimCreate
}

interface CreateClaimProps {
    className?: string
    claim?: IClaimCreate
    onChange: (claim: IClaimCreate) => void
}

export function CreateClaim(props: CreateClaimProps) {
    const [claim, setClaim] = React.useState<IClaimCreate>(props.claim || { statement: '' })

    const addSuccessor = () => {
        const newClaim = { ...claim, successor: { statement: '' } }
        setClaim(newClaim)
    }

    const onChangeSuccessor = (successor: IClaimCreate) => {
        const newClaim = { ...claim, successor }
        setClaim(newClaim)
    }

    const onChangeStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newClaim = { ...claim, statement: e.target.value }
        setClaim(newClaim)
    }

    React.useEffect(() => {
        props.onChange(claim)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claim])

    return (
        <div className={`space-y-1 ${props.className || ''}`}>
            <input className="basic-input" placeholder="Insert statement" onChange={onChangeStatement} />
            {claim.successor && <CreateClaim className="ml-4" claim={claim.successor} onChange={onChangeSuccessor} />}
            {!claim.successor && <button className="ml-2" onClick={addSuccessor}>➕</button>}
        </div>
    )
}