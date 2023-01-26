import { useSession } from "next-auth/react";
import CreateShopForm from "../../components/shop/CreateShopForm";
import PageLayout from "../../components/others/PageLayout";
import LoadingSpinner from "../../components/others/LoadingSpinner";
import { useRouter } from "next/router";

export default function CreateShop() {
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
         <PageLayout title="Creando tienda" session={session}>
            <CreateShopForm />
         </PageLayout>
      )
   }
}