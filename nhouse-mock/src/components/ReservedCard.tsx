import React from "react"
import { Avatar, Box, Button, Center, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { properties } from "@/data/mockdata"

type Props = {
  ticket: any
  onOpen: () => void
}

const ReservedCard: React.FC<Props> = ({ ticket, onOpen }) => {
  const router = useRouter()
  const property = properties[0]
  return (
    <VStack
      mt="20px"
      w="100%"
      h="72.5vh"
      bgSize="cover"
      maxW="440px"
      borderRadius="16px"
      bgImage={property.image}
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
      <Box mt="-20px" color="white" mx="auto">
        <Avatar w="26.4vh" h="26.4vh" src={ticket.image} />
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
        <Text>{ticket.reservedDate.replaceAll("-", "/")}</Text>
      </Box>
      <Center w="100%" pb="40px">
        <Button
          position="absolute"
          bottom="32px"
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
            onOpen()
          }}
        >
          鍵を開ける
        </Button>
      </Center>
    </VStack>
  )
}

export default ReservedCard
