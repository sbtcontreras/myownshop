import { useSession } from "next-auth/react";
import PageLayout from "../../../../components/others/PageLayout";
import { useRouter } from "next/router";
import LoadingSpinner from "../../../../components/others/LoadingSpinner";
import CreateProductForm from "../../../../components/product/CreateProductForm";

export default function CreateProduct() {
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
         <PageLayout title="Creando tienda" session={session}>
            {/* TODO: PROTEGER ESTA RUTA */}
            <CreateProductForm shopId={id} />
         </PageLayout>
      )
   }
}