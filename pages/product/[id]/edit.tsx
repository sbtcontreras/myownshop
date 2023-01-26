import PageLayout from '../../../components/others/PageLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../components/others/LoadingSpinner'
import EditProductForm from '../../../components/product/EditProductForm'

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
            <EditProductForm productId={id} session={session} />
         </PageLayout>
      )
   }
}
