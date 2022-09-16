import { ChakraProvider } from '@chakra-ui/react'
import { AppType } from 'next/dist/shared/lib/utils';
import theme from '../theme'
import { AppProps } from 'next/app'
import { trpc } from '../utils/trpc';

const MyApp= (({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}) as AppType;

export default trpc.withTRPC(MyApp);
