import { useSession as useNextAuthSession, UseSessionOptions } from "next-auth/react"

export default function useSession(options: UseSessionOptions<false>) {
    const actualSession = useNextAuthSession(options)
    // @ts-ignore-next-line
    if (typeof window !== "undefined" && window.Cypress) {
        return {
            status: 'authenticated',
            data: {
                user: { name: 'Test Man', image: '', email: '' },
            }
        }
    }

    return actualSession
}