import { NextPage } from "next"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import axios from "axios"
import { usePrivy } from "@privy-io/react-auth"
import ReservedCard from "@/components/ReservedCard"
import { Box, Button, Center, HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react"

const Key: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState<any>(false)
  const { ready, authenticated, user, login, logout } = usePrivy()

  const fetchKeys = async () => {
    if (!user?.wallet?.address) return
    const res = await axios.post("/api/fetchKeys", { address: user?.wallet?.address })
    if (!res.data) return
    console.log(res.data)
    setKeys(res.data.sort((a: any, b: any) => JSON.parse(a.tokenId) - JSON.parse(b.tokenId)))
    setLoading("done")
  }

  useEffect(() => {
    if (ready && authenticated) fetchKeys()
    if (ready && !authenticated) setLoading("done")
  }, [ready])

  useEffect(() => {
    setLoading(true)
  }, [])

  if (loading === true)
    return (
      <>
        <HStack justifyContent="center" mt="200px">
          <Text fontFamily="Oswald" color="white" fontSize="30px" fontWeight="700" lineHeight="1.5">
            キーを取得中
          </Text>
          <Spinner color="white" size="lg" />
        </HStack>
      </>
    )

  if (!keys.length && loading === "done")
    return (
      <>
        <HStack justifyContent="center" mt="200px">
          <Text fontFamily="Oswald" color="white" fontSize="30px" fontWeight="700" lineHeight="1.5">
            キーがありません
          </Text>
        </HStack>
        <Center w="100%" pb="98px">
          <Button
            position="absolute"
            bottom="100px"
            color="white"
            fontFamily="Noto Sans"
            mt="20px"
            fontSize="16px"
            fontWeight={700}
            lineHeight="1.5"
            bg="#00A7C1"
            w="83.5%"
            h="56px"
            borderRadius="0px"
            _hover={{ bg: "#00A7C1" }}
            onClick={() => {
              ready && authenticated ? logout() : login()
            }}
          >
            {ready && authenticated ? "別のアカウントでログイン" : "ログイン"}
          </Button>
        </Center>
      </>
    )
  return (
    <>
      <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
        {keys.map((key, index) => (
          <SwiperSlide key={index}>
            {/* @ts-ignore */}
            <ReservedCard ticket={key.tokenUri} onOpen={onOpen} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Key
