import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "@/layouts/Layout"
import { PrivyProvider } from "@privy-io/react-auth"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <PrivyProvider
      createPrivyWalletOnLogin
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        appearance: {
          // This configures your login modal to show wallet login options above other options.
          showWalletLoginFirst: false,
        },
        // This configures wallet, email, Google, and Twitter login for your app.
        loginMethods: ["wallet", "email", "google", "apple"],
      }}
      onSuccess={() => {
        router.pathname === "/property/[propertyId]" && router.push("/house?propertyId=1")
      }}
    >
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </PrivyProvider>
  )
}
