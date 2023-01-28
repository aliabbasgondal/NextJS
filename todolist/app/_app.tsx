// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
{/* @ts-expect-error Server Component */}
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>

  )
}

