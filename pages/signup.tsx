import PageLayout from '../components/others/PageLayout'
import SignupForm from '../components/profile/SignupForm'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '../components/others/LoadingSpinner'
import { useRouter } from 'next/router'

export default function Signup() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'loading') {
    return (
      <LoadingSpinner height='fullscreen' />
    )
  } else if (status == 'unauthenticated') {
    return (
      <PageLayout title='Registrandose | My Own Store' session={session}>
        <SignupForm/>
      </PageLayout>
    )
  } else if (status == "authenticated") {
    router.push(`/`)
  }
}