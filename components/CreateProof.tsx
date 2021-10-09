import { Prisma } from "@prisma/client"
import { useRouter } from "next/router"
import React from "react"
import { createProof } from "../lib/http"

export default function CreateProof() {
    const router = useRouter()
    const [values, setValues] = React.useState<Partial<Prisma.ProofCreateInput>>()
    const updateValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })

    }

    const addArgument = (e: React.MouseEvent) => { }
    const createArgument = (e: React.MouseEvent) => { }
    const onCreate = async (e: React.MouseEvent) => {
        try {
            const res = await createProof(values as Prisma.ProofCreateInput)

            if (res.success && res.proofId) {
                router.push(`/proof/${res.proofId}`)
            }
        } catch (e) {
            console.error('Failed to create proof with the following input: ', values)
        }
    }

    const input = 'border rounded-xl px-3 py-1 w-full'
    const button = 'shadow rounded-xl px-3 py-1'

    return (
        <div className="space-y-2 max-w-md">
            <h2 className="text-2xl">Create Proof</h2>

            <div className="">
                <label htmlFor="assumption" className="block">Assumption</label>
                <input
                    id="assumption"
                    className={input}
                    value={values?.['assumption']}
                    placeholder="Assumption"
                    onChange={updateValues}
                />
            </div>

            <div>
                <label htmlFor="detailed" className="block">Detailed</label>
                <textarea
                    id="detailed"
                    className={input}
                    value={values?.['detailed'] || ""}
                    placeholder="Detailed"
                    onChange={updateValues}
                />
            </div>
            <div>

                <label htmlFor="arguments" className="block">Choose your Argument from the list:</label>
                <input
                    id="argument"
                    className={input}
                    list="arguments"
                    name="argument"
                />
                <datalist id="arguments">
                    {['Üks', 'Kaks', 'Kolm'].map((v, index) => <option key={index} value={v} />)}
                </datalist>
            </div>
            <div>
                <button onClick={addArgument} className={`${button} bg-indigo-300`} >Add Argument</button>
                <button onClick={createArgument} className={`${button} bg-indigo-300`} >Create Argument</button>
            </div>

            <div>
                <label htmlFor="conclusion" className="block">Conclusion</label>
                <textarea
                    className={input}
                    id="conclusion"
                    value={values?.['conclusion'] || ""}
                    placeholder="Conclusion"
                    onChange={updateValues}
                />
            </div>

            <button className={`${button} bg-green-300`} onClick={onCreate}>Create Proof</button>
        </div>)
}