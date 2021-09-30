import ProofComponent from '../../components/Proof'
import { IProof } from '../../lib/prisma'
import * as API from '../../lib/api'

interface IProofPageProps {
  proof: IProof
}

export default function ProofPage(props: IProofPageProps) {
  return (
    <div className="p-10">

      <ProofComponent proof={props.proof} />
      <pre>{JSON.stringify(props.proof, null, 2)}</pre>
    </div>
  )
}

export async function getStaticProps(props: any) {
  return {
    props: {
      proof: await API.getProofById(props.params.id)
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