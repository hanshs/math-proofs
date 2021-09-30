import ProofComponent from '../../components/Proof'
import prisma, { IProof } from '../../lib/prisma'

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
      proof: await prisma.proof.findFirst({
        where: { id: Number(props.params.id) },
        include: { steps: { include: { subProof: { include: { steps: true } } } } }
      })
    }
  }
}

export async function getStaticPaths() {
  const proofIds = await prisma.proof.findMany({ select: { id: true } })

  return {
    paths: proofIds.map(p => ({ params: { id: String(p.id) } })),
    fallback: false,
  }
}