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
} from "@chakra-ui/react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import axios from "axios"

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
      availableTickets: res.data,
    },
  }
}

type Props = {
  availableTickets: any[]
}

const House: NextPage<Props> = ({ availableTickets }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
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
              予約可能日時
            </Text>
            <SimpleGrid mt="24px" columns={3} spacing={2} overflow="scroll" maxH="400px">
              {availableTickets.map((ticket) => (
                <Button>
                  <Text fontWeight="700" fontFamily="Noto Sans">
                    {ticket.reservedDate.slice(5, 10).replace("-", "月").replaceAll("0", "") + "日"}
                  </Text>
                </Button>
              ))}
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
              position="absolute"
              bottom="20px"
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
              // onClick={() => {
              //   ready && authenticated ? router.push("/house?propertyId=1") : login()
              // }}
            >
              受け取り内容を確認
            </Button>
          </Center>
        </ModalContent>
      </Modal>
      <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
        {properties.map((property) => (
          <SwiperSlide>
            <PropertyReservationCard property={property} onOpen={onOpen} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default House
