import React from "react"
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/router"

type Props = {
  property: any
  onOpen: () => void
  isLoading: boolean
}

const PropertyManageCard: React.FC<Props> = ({ property, onOpen, isLoading }) => {
  const { ready, authenticated, login } = usePrivy()
  const router = useRouter()
  return (
    <VStack
      position="relative"
      mt="20px"
      w="100%"
      h="72.5vh"
      bgSize="cover"
      maxW="440px"
      borderRadius="16px"
      bgImage={property.image}
      justifyContent={"space-between"}
    >
      <Box
        fontFamily="Oswald"
        color="white"
        fontSize="60px"
        fontWeight="700"
        lineHeight="1.5"
        fontStyle="normal"
        textAlign="right"
        mt="20px"
        mr="20px"
        ml="auto"
      >
        <Text>N’HOUSE</Text>
        <Text mt="-18px">{property.title}</Text>
      </Box>
      <Center w="100%" pb="40px">
        <Button
          position="absolute"
          bottom="32px"
          isLoading={!ready || (isLoading && property.id === "1")}
          loadingText={!ready ? "認証情報読み込み中" : "リクエスト処理中"}
          spinnerPlacement="end"
          opacity={property.id === "1" ? "1 !important" : "0.7 !important"}
          isDisabled={property.id !== "1"}
          color="#00A7C1"
          fontFamily="Noto Sans"
          mt="20px"
          fontSize="16px"
          fontWeight={700}
          lineHeight="1.5"
          bg="white"
          w="83.5%"
          h="56px"
          borderRadius="0px"
          _hover={{ bg: "white" }}
          onClick={() => {
            ready && authenticated ? onOpen() : login()
          }}
        >
          {property.id !== "1" ? "Coming Soon..." : "宿泊券を発行する"}
        </Button>
      </Center>
    </VStack>
  )
}

export default PropertyManageCard
