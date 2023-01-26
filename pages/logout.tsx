import PageLayout from '../components/others/PageLayout'
import LogoutForm from '../components/profile/LogoutForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../components/others/LoadingSpinner'

export default function Logout() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'loading') {
    return (
      <LoadingSpinner height='fullscreen' />
    )
  } 
  
  else if (status == 'unauthenticated') {
    router.push(`/`)
  } 
  
  else if (status == "authenticated") {
    return (
      <PageLayout title='Cerrando Sesión | My Own Store' session={session}>
        <LogoutForm session={session} />
      </PageLayout>
    )
  }
}
