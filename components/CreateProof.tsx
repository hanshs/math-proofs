import {Argument, Prisma} from "@prisma/client"
import {useRouter} from "next/router"
import React from "react"
import {createProof, useArguments} from "../lib/data"

export default function CreateProof() {
  const router = useRouter()
  const [newProof, setNewProof] = React.useState<Prisma.ProofCreateInput>({assumption: '', conclusion: ''})
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
        create.push({argument: {connect: {id: arg.id}}, orderIndex: index})
      } else {
        create.push({argument: {create: arg}, orderIndex: index})
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

  return (
      <form className="space-y-2 opac" onSubmit={onCreate}>
        <div className="">
          <label htmlFor="assumption" className="block font-semibold">Assumption</label>
          <input
              id="assumption"
              required
              className="basic-input w-full"
              value={newProof?.['assumption']}
              placeholder="Assumption"
              onChange={updateValues}
          />
        </div>

        <div>
          <label htmlFor="detailed" className="block font-semibold">Detailed</label>
          <textarea
              id="detailed"
              className="basic-input w-full"
              value={newProof?.['detailed'] || ""}
              placeholder="Detailed"
              onChange={updateValues}
          />
        </div>
        <div>
          <div className="font-semibold">Arguments</div>
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

        <div className="basic-input">
          <label htmlFor="arguments" className="block font-semibold"><small>Choose Argument</small></label>
          <input
              id="argument"
              placeholder="Search and select"
              className="basic-input w-4/5 mr-2"
              list="arguments"
              name="argument"
              autoComplete="off"
              onChange={e => setSelectedArgument(e.target.value)}
          />
          <datalist id="arguments">
            {allArguments?.map((a, index) => <option key={index} value={a.statement}>{a.detailed}</option>)}
          </datalist>
          <button
              onClick={addSelectedArgument}
              className="btn"
              type="button"
              disabled={!allArguments?.find(a => a.statement === selectedArgument)}>Add
          </button>
          <hr className="mb-2 mt-2"/>
          <label htmlFor="statement" className="block font-semibold"><small>New Argument</small></label>
          <input className="basic-input w-full"
                 id="statement"
                 value={newArgument?.['statement'] || ""}
                 placeholder="Statement"
                 autoComplete="off"
                 onChange={updateNewArgument}>

          </input>
          <input className="basic-input w-full"
                 id="detailed"
                 value={newArgument?.['detailed'] || ""}
                 placeholder="Detailed"
                 autoComplete="off"
                 onChange={updateNewArgument}>

          </input>
          <button onClick={createArgument} className="btn mt-2"
                  type="button">Create
          </button>
        </div>


        <div>
          <label htmlFor="conclusion" className="block font-semibold">Conclusion</label>
          <textarea
              className="basic-input w-full"
              required
              id="conclusion"
              value={newProof?.['conclusion'] || ""}
              placeholder="Conclusion"
              onChange={updateValues}
          />
        </div>

        <button className="btn" type="submit">Create Proof</button>
        {/*<small>{JSON.stringify(newProof)}</small>*/}
      </form>)
}