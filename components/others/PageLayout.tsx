import { Session } from 'next-auth'
import Head from 'next/head'
import HamburguerHeader from './HamburguerHeader'
import Navbar from './Navbar'

export default function PageLayout( { children, title="My Own Store", session=null }: {children: React.ReactNode, title:string, session: Session|null} ) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Crea tu propia tienda con nosotros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session}/>
        <HamburguerHeader session={session}/>
        {children}
      </main>
    </>
  )
}