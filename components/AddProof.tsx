import { Prisma } from ".prisma/client"
import React from "react"
// import { createProof } from "../lib/api"

export default function AddProof() {
    const [values, setValues] = React.useState<Partial<Prisma.ProofCreateInput>>()

    const updateValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })

    }

    const addArgument = (e: React.MouseEvent) => {

    }

    const onCreate = (e: React.MouseEvent) => {
        try {
            // createProof(values as Prisma.ProofCreateInput)
        } catch (e) {
            console.error('Failed to create proof with the following input: ', values)
        }
    }
    return <div className="space-y-2">
        <h2 className="text-2xl">Add Proof</h2>

        <div className="">
            <label htmlFor="proof-assuption" className="block">Assuption</label>
            <input id="proof-assuption" value={values?.['assumption'] || ""} placeholder="Assumption" onChange={updateValues} />
        </div>

        <div>
            <label htmlFor="proof-detailed" className="block">Detailed</label>
            <textarea id="proof-detailed" value={values?.['detailed'] || ""} placeholder="Detailed" onChange={updateValues} />
        </div>
        <div>

            <label htmlFor="arguments" className="block">Choose your Argument from the list:</label>
            <input id="arguments" list="arguments" name="arguments" />
        </div>
        <div>
            <datalist id="browsers">
                {['Üks', 'Kaks', 'Kolm'].map((v, index) => <option key={index}>{v}</option>)}

            </datalist>
            <button onClick={addArgument} className="bg-indigo-300" >Create Argument</button>
        </div>

        <div>
            <label htmlFor="proof-conclusion" className="block">Conclusion</label>
            <textarea id="proof-conclusion" value={values?.['conclusion'] || ""} placeholder="Conclusion" onChange={updateValues} />
        </div>

        <button className="bg-green-300" onClick={onCreate}>Create</button>
    </div>
}