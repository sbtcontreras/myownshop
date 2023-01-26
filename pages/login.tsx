import PageLayout from '../components/others/PageLayout'
import LoginForm from '../components/profile/LoginForm'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '../components/others/LoadingSpinner'
import { useRouter } from 'next/router'

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'loading') {
    return (
      <LoadingSpinner height='fullscreen' />
    )
  } else if (status == 'unauthenticated') {
    return (
      <PageLayout title='Iniciando sesión | My Own Store' session={session}>
        <LoginForm />
      </PageLayout>
    )
  } else if (status == "authenticated") {
    router.push(`/`)
  }
}
