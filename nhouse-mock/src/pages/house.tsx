import PropertyReservationCard from "@/components/PropertyReservationCard"
import { properties } from "@/data/mockdata"
import {
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  HStack,
  Image,
  Avatar,
  Center,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import axios from "axios"
import { usePrivy } from "@privy-io/react-auth"

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000"}/api/fetchMetadata`,
  )
  console.log(res.data)
  if (!res.data) {
    return {
      props: {
        availableTickets: [],
      },
    }
  }
  return {
    props: {
      availableTickets: res.data.sort((a: any, b: any) => JSON.parse(a.tokenId) - JSON.parse(b.tokenId)),
    },
  }
}

type Props = {
  availableTickets: any[]
}

const House: NextPage<Props> = ({ availableTickets }) => {
  const { user } = usePrivy()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [confirm, setConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [tickets, setTickets] = useState([...availableTickets])
  const [keys, setKeys] = useState([])

  console.log(availableTickets)

  const handleUpdateTickets = async () => {
    console.log("update")
    const newTickets = await axios.get("/api/fetchMetadata")
    if (!newTickets.data) return
    setTickets(newTickets.data.sort((a: any, b: any) => JSON.parse(a.tokenId) - JSON.parse(b.tokenId)))
    if (!user?.wallet?.address) return
    const res = await axios.post("/api/fetchKeys", { address: user?.wallet?.address })
    if (!res.data) return
    console.log(res.data)
    setKeys(res.data)
  }

  const handleReserveRequest = async () => {
    if (!user?.wallet?.address || !selectedTicket) return
    console.log(selectedTicket)
    onClose()
    setIsLoading(true)
    toast({
      position: "top",
      title: "予約リクエストを受け付けました",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    try {
      const res = await axios.post("/api/handleReserve", {
        // @ts-ignore
        tokenId: selectedTicket.tokenId,
        address: user?.wallet?.address,
      })

      if (res.data) {
        console.log(res.data)
        setIsLoading(false)
        toast({
          position: "top",
          title: "予約が正常に完了しました",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
        await handleUpdateTickets()
      } else {
        setIsLoading(false)
        toast({
          position: "top",
          title: "予約が失敗しました",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        position: "top",
        title: "予約が失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {confirm ? (
          <ModalContent pos="absolute" bottom="0" mb="0" borderRadius="12px 12px 0 0" h="98vh">
            <HStack position="relative" mt="20px" justifyContent="center" alignItems="center">
              <Image
                position="absolute"
                left="0"
                ml="27px"
                w="10px"
                src="/icons/Back.png"
                onClick={() => setConfirm(false)}
              />
              <Text fontSize="16px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                予約内容の確認
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
                {selectedTicket && selectedTicket.tokenUri.reservedDate.replaceAll("-", "/")}
              </Text>
              <Text mt="24px" fontSize="14px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                到着時間
              </Text>
              <Text fontSize="18px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                13:00
              </Text>
            </Box>
            <Center w="100%">
              <Button
                isDisabled={!selectedTicket}
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
                onClick={handleReserveRequest}
              >
                予約内容を注文
              </Button>
            </Center>
          </ModalContent>
        ) : (
          <ModalContent pos="absolute" bottom="0" mb="0" borderRadius="12px 12px 0 0" h="98vh">
            <HStack position="relative" mt="20px" justifyContent="center" alignItems="center">
              <Image position="absolute" left="0" ml="27px" w="10px" src="/icons/Back.png" onClick={onClose} />
              <Text fontSize="16px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                予約内容の入力
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

            <Box mt="20px" mx="15px">
              <Text fontSize="14px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                予約可能な日時
              </Text>
              <SimpleGrid mt="24px" columns={3} spacing={2} overflow="scroll" maxH="400px">
                {tickets.length !== 0 &&
                  tickets.map((ticket, index) => {
                    const dateParts = ticket.tokenUri.reservedDate.split("-")
                    const month = parseInt(dateParts[1], 10).toString()
                    const day = parseInt(dateParts[2], 10).toString()
                    const formattedDate = `${month}月${day}日`
                    return (
                      <Button
                        key={index}
                        colorScheme={selectedTicket === ticket ? "green" : "gray"}
                        onClick={() => {
                          selectedTicket === ticket ? setSelectedTicket(null) : setSelectedTicket(ticket)
                        }}
                      >
                        <Text fontWeight="700" fontFamily="Noto Sans">
                          {formattedDate}
                        </Text>
                      </Button>
                    )
                  })}
              </SimpleGrid>
            </Box>
            <HStack mt="24px" mx="24px" justifyContent="space-between">
              <Text fontSize="14px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                到着時間
              </Text>
              <Text fontSize="14px" fontWeight="700" fontFamily="Noto Sans" lineHeight="1.5">
                13:00
              </Text>
            </HStack>
            <Center w="100%">
              <Button
                isDisabled={!selectedTicket}
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
                onClick={() => setConfirm(true)}
              >
                受け取り内容を確認
              </Button>
            </Center>
          </ModalContent>
        )}
      </Modal>

      <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
        {properties.map((property, index) => (
          <SwiperSlide key={index}>
            <PropertyReservationCard
              property={property}
              onOpen={onOpen}
              isLoading={isLoading}
              ticket={selectedTicket}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default House
