import React from "react"
import { Box, Button, Center, Image, Text, VStack } from "@chakra-ui/react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/router"

type Props = {
  property: any
  onOpen: () => void
  isLoading: boolean
  ticket?: any
}

const PropertyReservationCard: React.FC<Props> = ({ property, onOpen, isLoading, ticket }) => {
  const { ready, authenticated, login } = usePrivy()
  const router = useRouter()
  return (
    <VStack
      mt="20px"
      w="100%"
      h="72.5vh"
      bgSize="cover"
      maxW="440px"
      borderRadius="16px"
      bgImage={property.image}
      justifyContent={property.id === "1" && ticket ? "" : "space-between"}
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
      {property.id === "1" && ticket && (
        <>
          <Box
            fontFamily="Oswald"
            color="white"
            fontSize="40px"
            fontWeight="700"
            lineHeight="1.5"
            fontStyle="normal"
            mt="20px"
            mx="auto"
          >
            <Image
              src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
              w="200px"
              h="200px"
            />
          </Box>
          <Box
            position="absolute"
            bottom="92px"
            fontFamily="Oswald"
            color="white"
            fontSize="20px"
            fontWeight="700"
            lineHeight="1.5"
            fontStyle="normal"
            mx="auto"
          >
            <Text>{ticket && ticket.tokenUri.reservedDate.replaceAll("-", "/")}</Text>
          </Box>
        </>
      )}
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
          {property.id !== "1" ? "Coming Soon..." : "予約する"}
        </Button>
      </Center>
    </VStack>
  )
}

export default PropertyReservationCard
