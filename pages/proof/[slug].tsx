import Proof from '../../components/Proof'
import { IProof, loadProof, getProofSlugs } from '../../lib'

interface IProofPageProps {
  proof: IProof
}

export default function ProofPage(props: IProofPageProps) {
  return (
    <div className="p-10">
      <Proof proof={props.proof} />
      {/* <pre>{JSON.stringify(props.proof, null, 2)}</pre> */}
    </div>
  )
}

export function getStaticProps(props: any) {
  return {
    props: {
      proof: loadProof(props.params.slug, true)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: getProofSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  }
}