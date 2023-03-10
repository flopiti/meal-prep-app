import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import BaseLayout from '@/components/BaseLayout';
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
  return <UserProvider>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
    </UserProvider>
}

export default appWithTranslation(App);