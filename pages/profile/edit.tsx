import PageLayout from '../../components/others/PageLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import EditProfileForm from '../../components/profile/EditProfileForm'
import LoadingSpinner from '../../components/others/LoadingSpinner'

export default function EditProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'loading') {
    return (
      <LoadingSpinner height='fullscreen' />
    )
  } 
  
  else if (status == 'unauthenticated') {
    router.push('/login')
  } 
  
  else if (status == "authenticated") {
    return (
      <PageLayout title='Editando Perfil | My Own Store' session={session}>
        <EditProfileForm session={session} />
      </PageLayout>
    )
  }
}
