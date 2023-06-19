import { NextPage } from "next"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import axios from "axios"
import PropertyReservationCard from "@/components/PropertyReservationCard"
import { usePrivy } from "@privy-io/react-auth"

const Key: NextPage = () => {
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
        {keys.map((property) => (
          <SwiperSlide>
            <PropertyReservationCard property={property} onOpen={onOpen} isLoading={isLoading} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Key
