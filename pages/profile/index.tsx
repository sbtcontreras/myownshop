import PageLayout from '../../components/others/PageLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../components/others/LoadingSpinner'
import ProfileHeader from '../../components/profile/ProfileHeader'
import Shops from '../../components/shop/Shops'

export default function Profile() {
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
      <PageLayout title='Perfil | My Own Store' session={session}>
        <ProfileHeader session={session} />
        <Shops profileId={session.user.id} />
      </PageLayout>
    )
  }
}
