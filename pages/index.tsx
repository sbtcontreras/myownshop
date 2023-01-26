import { useSession } from 'next-auth/react'
import LoadingSpinner from '../components/others/LoadingSpinner'
import { useRouter } from 'next/router'

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  if (status == 'loading') {
    return (
      <LoadingSpinner height='fullscreen'/>
    )
  } 
  
  else if (status == 'unauthenticated') {
    router.push('/login')
  } 
  
  else if (status == "authenticated") {
    router.push(`/profile`)
  }
}
