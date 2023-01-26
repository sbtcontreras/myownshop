import PageLayout from '../../../components/others/PageLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../components/others/LoadingSpinner'
import EditShopForm from '../../../components/shop/EditShopForm'

export default function EditShop() {
   const { data: session, status } = useSession()
   const router = useRouter()
   const id = parseInt(router.query.id as string)

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
            <EditShopForm shopId={id} session={session} />
         </PageLayout>
      )
   }
}
