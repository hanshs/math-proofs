import React from "react"
import Latex from 'react-latex-next'
import { useBetween } from 'use-between';

interface ClaimProps {
    claim: Claim;
    className?: string;
    refIndex?: string;
}

interface Claim {
    statement: string;
    successor?: Claim | null;
}

const highlightRefState = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ref, setRef] = React.useState<string>('');

    return { ref, setRef };
}

const useHighlightedRef = () => useBetween(highlightRefState);

export default function Claim(props: ClaimProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { ref, setRef } = useHighlightedRef();

    const statement = React.useMemo(() => {
        const wordList = props.claim.statement.split(' ')

        return wordList.map((item, index) => {
            if (item.startsWith('##') && item.endsWith('##')) {
                const refString = item.replace(/##/g, '')

                return <button onMouseOver={() => setRef(refString)} onMouseLeave={() => setRef('')} className="text-green-800 hover:text-green-600" key={index}>{refString}</button>
            }

            return <>{' '}<Latex key={index}>{item}</Latex>{' '}</>
        })
    }, [props.claim.statement, setRef])

    return (
        <span className={ref === props.refIndex ? 'bg-green-100' : ''}>
            <span className={props.claim.successor ? 'cursor-pointer text-blue-700' : ''} onClick={() => setIsOpen(isOpen => !isOpen)}>{statement}</span>
            {isOpen && props.claim.successor && <div className="ml-4"><Claim className="ml-4" claim={props.claim.successor} /></div>}
        </span>
    )
}