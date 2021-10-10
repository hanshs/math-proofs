import { Argument, Prisma } from "@prisma/client"
import { useRouter } from "next/router"
import React from "react"
import { createProof, useArguments } from "../lib/data"

export default function CreateProof() {
    const router = useRouter()
    const [newProof, setNewProof] = React.useState<Prisma.ProofCreateInput>({ assumption: '', conclusion: '' })
    const [newProofArguments, setNewProofArguments] = React.useState<Argument[]>([])
    const [newArgument, setNewArgument] = React.useState<Argument>()
    const [selectedArgument, setSelectedArgument] = React.useState<string>()
    const allArguments = useArguments().data?.arguments

    const updateValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProof({
            ...newProof,
            [e.target.id]: e.target.value
        })
    }

    const updateNewArgument = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewArgument(
            {
                ...(newArgument || {}),
                [e.target.id]: e.target.value
            } as Argument
        )
    }

    const addSelectedArgument = () => {
        const argument = allArguments?.find(a => a.statement === selectedArgument)
        if (argument) {
            setNewProofArguments([
                ...newProofArguments,
                argument
            ])
        }
    }
    const createArgument = () => {
        if (newArgument?.statement) {
            setNewProofArguments([
                ...newProofArguments,
                newArgument,
            ])
            setNewArgument(undefined)
        }
    }
    const onCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        const create: Prisma.Enumerable<Prisma.ArgumentsOnProofCreateWithoutProofInput> = []

        newProofArguments.forEach((arg, index) => {
            if (arg.id) {
                create.push({ argument: { connect: { id: arg.id } }, orderIndex: index })
            } else {
                create.push({ argument: { create: arg }, orderIndex: index })
            }
        })

        try {
            newProof.arguments = {}

            if (create.length) {
                newProof.arguments.create = create
            }

            const res = await createProof(newProof)

            if (res.success && res.proofId) {
                router.push(`/proof/${res.proofId}`)
            }
        } catch (e) {
            console.error('Failed to create proof with the following input: ', e)
        }
    }

    const input = 'border rounded-xl px-3 py-1 w-full'
    const button = 'shadow rounded-xl px-3 py-1 disabled:opacity-60'

    return (
        <form className="space-y-2 max-w-md opac" onSubmit={onCreate}>
            <div className="">
                <label htmlFor="assumption" className="block">Assumption</label>
                <input
                    id="assumption"
                    required
                    className={input}
                    value={newProof?.['assumption']}
                    placeholder="Assumption"
                    onChange={updateValues}
                />
            </div>

            <div>
                <label htmlFor="detailed" className="block">Detailed</label>
                <textarea
                    id="detailed"
                    className={input}
                    value={newProof?.['detailed'] || ""}
                    placeholder="Detailed"
                    onChange={updateValues}
                />
            </div>
            <div>
                <div>Arguments</div>
                <ol className="list-decimal">
                    {newProofArguments?.map((a, index) =>
                        <li key={index}>
                            <div>{a.statement}</div>
                            {a.detailed && <div><small>{a.detailed}</small></div>}
                        </li>)}
                </ol>
            </div>
            <div>


            </div>

            <div className="bg-gray-100 border rounded-lg px-2 py-3 space-y-3">
                <label htmlFor="arguments" className="block"><small>Choose Argument</small></label>
                <input
                    id="argument"
                    placeholder="Search and select"
                    className={input}
                    list="arguments"
                    name="argument"
                    autoComplete="off"
                    onChange={e => setSelectedArgument(e.target.value)}
                />
                <datalist id="arguments" >
                    {allArguments?.map((a, index) => <option key={index} value={a.statement}>{a.detailed}</option>)}
                </datalist>
                <button
                    onClick={addSelectedArgument}
                    className={`${button} bg-indigo-300 mt-4 ml-auto block`}
                    type="button"
                    disabled={!allArguments?.find(a => a.statement === selectedArgument)}>Add</button>
                <hr />
                <label htmlFor="statement" className="block"><small>New Argument</small></label>
                <input className={input}
                    id="statement"
                    value={newArgument?.['statement'] || ""}
                    placeholder="Statement"
                    autoComplete="off"
                    onChange={updateNewArgument}>

                </input>
                <input className={input}
                    id="detailed"
                    value={newArgument?.['detailed'] || ""}
                    placeholder="Detailed"
                    autoComplete="off"
                    onChange={updateNewArgument}>

                </input>
                <button onClick={createArgument} className={`${button} bg-indigo-300 mt-4 ml-auto block`} type="button" >Create</button>
            </div>


            <div>
                <label htmlFor="conclusion" className="block">Conclusion</label>
                <textarea
                    className={input}
                    required
                    id="conclusion"
                    value={newProof?.['conclusion'] || ""}
                    placeholder="Conclusion"
                    onChange={updateValues}
                />
            </div>

            <button className={`${button} bg-green-300`} type="submit">Create Proof</button>
            <small>{JSON.stringify(newProof)}</small>
        </form>)
}