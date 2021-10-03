
import { GetStaticProps } from 'next'
import Argument from '../../components/Argument'
import * as API from '../../lib/api'
import { ProofWithArguments } from '../../lib/prisma'

interface IProofPageProps {
  proof: ProofWithArguments | null
}

export default function ProofPage(props: IProofPageProps) {
  return (
    <div className="p-10">
      <ol className="list-decimal list-inside">
        <h3>Assumption: {props.proof?.assumption}</h3>

        <p>{props.proof?.detailed && props.proof.detailed}</p>

        {props.proof?.arguments.map((argument, index) => (
          <Argument key={index} argument={argument} />
        ))}

        <p>Conclusion: {props.proof?.conclusion}</p>
      </ol>

      <small>
        <pre>{JSON.stringify(props.proof, null, 2)}</pre>
      </small>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      proof: await API.getProofById(String(context?.params?.id))
    }
  }
}

export async function getStaticPaths() {
  const proofIds = await API.getAllProofIds()

  return {
    paths: proofIds.map(p => ({ params: { id: String(p.id) } })),
    fallback: false,
  }
}