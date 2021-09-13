import yaml from 'js-yaml'
import { join } from 'path'
import fs from 'fs'

export interface IProof {
  statement?: string;
  reference?: string;
  subproof?: IProof
  detailed?: string;
  steps: IProof[]
}

const proofsDir = join(process.cwd(), 'content/proofs')

export function getProofSlugs() {
  return fs.readdirSync(proofsDir).map(s => s.replace(/\.yml$/, ''))
}

export function loadSteps(steps: IProof[]): IProof[] {
  return steps.map((step) => {
    if (step.steps) {
      step = {
        ...step,
        steps: loadSteps(step.steps)
      }
    }

    if (step.subproof?.reference) {
      step = {
        ...step,
        subproof: loadProof(step.subproof.reference)
      }
    }

    return step
  })
}

export function loadProof(slug: string, recursive: boolean = false): IProof {
  const proof = yaml.load(fs.readFileSync(join(proofsDir, `${slug}.yml`), 'utf8')) as IProof

  if (recursive) {
    proof.steps = loadSteps(proof.steps)
  }

  return proof
}
