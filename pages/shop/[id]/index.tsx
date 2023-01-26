import PageLayout from '../../../components/others/PageLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../components/others/LoadingSpinner'
import ShopHeader from '../../../components/shop/ShopHeader'
import Products from '../../../components/product/Products'

export default function Shop() {
   const { data: session, status } = useSession()
   const router = useRouter()
   const id = parseInt(router.query.id as string)

   if (status == 'loading') {
      return (
         <LoadingSpinner height='fullscreen' />
      )
   }

   else if (status == 'unauthenticated') {
      return (
         <PageLayout title='Perfil | My Own Store' session={session}>
            <ShopHeader shopId={id} session={session} />
            <Products shopId={id} session={session} />
         </PageLayout>
      )
   }

   else if (status == "authenticated") {
      return (
         <PageLayout title='Perfil | My Own Store' session={session}>
            <ShopHeader shopId={id} session={session} />
            <Products shopId={id} session={session} />
         </PageLayout>
      )
   }
}

