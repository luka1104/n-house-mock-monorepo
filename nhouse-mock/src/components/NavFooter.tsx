import { Box, Center, HStack, Image, Link, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { useRouter } from "next/router"

const NavFooter: React.FC = () => {
  const router = useRouter()
  return (
    <Box position="fixed" zIndex="200" bottom="0" w="100%" maxW="440px" h="74px" bg="transparent">
      <HStack gap="4px" px="4px" h="100%">
        <Link href="/home" w="100%" textDecoration="none !important">
          <Center h="100%" w="100%">
            <VStack gap="8px">
              {router.pathname.includes("home") ? (
                <Center w="64px" h="32px" bg="#00A7C1" borderRadius="16px">
                  <Image h="24px" src="/icons/Home.png" />
                </Center>
              ) : (
                <Image h="24px" src="/icons/Home.png" />
              )}
              <Text fontFamily="Roboto" fontSize="12px" lineHeight="1.5" fontWeight="400" color="white">
                HOME
              </Text>
            </VStack>
          </Center>
        </Link>
        <Link href="/house" w="100%" textDecoration="none !important">
          <Center h="100%" w="100%">
            <VStack gap="8px">
              {router.pathname.includes("house") ? (
                <Center w="64px" h="32px" bg="#00A7C1" borderRadius="16px">
                  <Image h="24px" color="black" src="/icons/House.png" />
                </Center>
              ) : (
                <Image h="24px" color="black" src="/icons/House.png" />
              )}
              <Text fontFamily="Roboto" fontSize="12px" lineHeight="1.5" fontWeight="400" color="white">
                HOUSE
              </Text>
            </VStack>
          </Center>
        </Link>
        <Link href="/key" w="100%" textDecoration="none !important">
          <Center h="100%" w="100%">
            <VStack gap="8px">
              {router.pathname.includes("key") ? (
                <Center w="64px" h="32px" bg="#00A7C1" borderRadius="16px">
                  <Image w="24px" src="/icons/Key.png" />
                </Center>
              ) : (
                <Image w="24px" src="/icons/Key.png" />
              )}
              <Text fontFamily="Roboto" fontSize="12px" lineHeight="1.5" fontWeight="400" color="white">
                KEY
              </Text>
            </VStack>
          </Center>
        </Link>
      </HStack>
    </Box>
  )
}

export default NavFooter
