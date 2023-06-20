import React, { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Center,
  Image,
  Link,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { properties } from "@/data/mockdata"
import { usePrivy } from "@privy-io/react-auth"

type Props = {
  ticket: any
}

const ReservedCard: React.FC<Props> = ({ ticket }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ready, authenticated, login, signMessage } = usePrivy()
  const [showQr, setShowQr] = useState(false)
  const router = useRouter()
  const property = properties[0]

  const handleSignRequest = async () => {
    if (!ready || !authenticated) {
      login()
      return
    }
    const message = "署名することでこのアカウントで予約されていることを証明します。"
    const config = {
      title: "署名リクエスト",
      description: "署名をすることでこのアカウントがあなたのものだと証明します。",
      buttonText: "署名する",
    }
    const res = await signMessage(message, config)
    console.log(res)
    if (res) setShowQr(true)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pos="absolute" bottom="0" mb="0" borderRadius="12px 12px 0 0" h="98vh">
          <HStack position="relative" mt="20px" justifyContent="center" alignItems="center">
            <Image position="absolute" left="0" ml="27px" w="10px" src="/icons/Back.png" onClick={onClose} />
            <Text fontSize="16px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
              {showQr ? "QRコード" : "予約詳細"}
            </Text>
          </HStack>
          <HStack mt="20px" ml="24px" gap="16px">
            <Avatar w="60px" h="60px" src={properties[0].image} />
            <Box>
              <Text fontSize="12px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                N’HOUSE
              </Text>
              <Text fontSize="16px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                {properties[0].title}
              </Text>
            </Box>
          </HStack>

          <Box mt="40px" mx="24px">
            <Text fontSize="14px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
              宿泊日
            </Text>
            <Text fontSize="18px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
              {/* @ts-ignore */}
              {ticket && ticket.reservedDate.replaceAll("-", "/")}
            </Text>
            <Text mt="24px" fontSize="14px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
              到着時間
            </Text>
            <Text fontSize="18px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
              13:00
            </Text>
          </Box>
          {showQr && (
            <Center>
              <Image mt="40px" w="80%" src="/images/qr.png" />
            </Center>
          )}

          <Center w="100%">
            <Button
              isDisabled={!ticket}
              position="absolute"
              bottom="32px"
              color="white"
              fontFamily="Noto Sans"
              mt="53px"
              fontSize="16px"
              fontWeight={700}
              lineHeight="1.5"
              bg="#00A7C1"
              w="83.5%"
              h="56px"
              borderRadius="0px"
              _hover={{ bg: "#00A7C1" }}
              onClick={handleSignRequest}
            >
              署名してQRコードを表示する
            </Button>
          </Center>
        </ModalContent>
      </Modal>
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
            right="9%"
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
    </>
  )
}

export default ReservedCard
