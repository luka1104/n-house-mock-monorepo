import { NextPage } from "next"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import axios from "axios"
import { usePrivy } from "@privy-io/react-auth"
import ReservedCard from "@/components/ReservedCard"
import { useDisclosure } from "@chakra-ui/react"

const Key: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keys, setKeys] = useState([])
  const { user } = usePrivy()

  const fetchKeys = async () => {
    if (!user?.wallet?.address) return
    const res = await axios.post("/api/fetchKeys", { address: user?.wallet?.address })
    if (!res.data) return
    console.log(res.data)
    setKeys(res.data)
  }

  useEffect(() => {
    fetchKeys()
  }, [user])
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
