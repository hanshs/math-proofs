import { Argument as ArgumentType } from ".prisma/client"
import { useState } from "react"

export default function Argument(props: { argument: ArgumentType }) {
  const { argument } = props
  const [isOpen, setIsOpen] = useState(false)


  console.log({ props })

  return (
    <li>
      <div
        className={`${(argument.detailed) ? 'hover:text-green-600 cursor-pointer' : ''} inline-block`}
        onClick={() => setIsOpen(!isOpen)}>
        {argument.statement}
      </div>
      {isOpen && (
        <div className="pl-8">
          {argument.detailed}
        </div>
      )}
    </li>
  )
}