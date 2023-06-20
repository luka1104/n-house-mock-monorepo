import React from "react"
import { Avatar, Box, Button, Center, Image, Link, Text, VStack } from "@chakra-ui/react"
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
        bottom="100px"
        fontFamily="Oswald"
        color="#00A7C1"
        fontSize="20px"
        fontWeight="700"
        lineHeight="1.5"
        fontStyle="normal"
        mx="auto"
        h="35px"
        bg="white"
        w="50%"
        borderRadius="17.5px"
      >
        <Text textAlign="center" lineHeight="35px">
          {ticket.reservedDate.replaceAll("-", "/")}
        </Text>
      </Box>
      <Link href="https://chat.n.house">
        <Avatar
          position="absolute"
          bottom="95px"
          right="13%"
          h="45px"
          w="45px"
          src="https://img.freepik.com/premium-vector/ai-chat-bubble-chatbot-line-icon-vector-illustration-desing_744955-2255.jpg"
        />
      </Link>
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
