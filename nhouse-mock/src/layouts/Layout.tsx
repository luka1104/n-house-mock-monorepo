import NavFooter from "@/components/NavFooter"
import { Box, Container } from "@chakra-ui/react"
import { ReactElement, memo, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout = memo(({ children }: LayoutProps) => {
  const router = useRouter()
  const hideNav = router.pathname === "/" || router.pathname === "/property/[propertyId]/purchased"
  return (
    <>
      <Container maxW="440px" h="100%" minH="100vh" p={0} bgColor="#000000">
        {hideNav ? null : <Header />}
        <Box pt={hideNav ? "0px" : "64px"} w="100%" h="100%">
          {children}
        </Box>
        {hideNav ? null : <NavFooter />}
      </Container>
    </>
  )
})

export default Layout
