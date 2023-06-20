import { NextPage } from "next"
import React from "react"
import { useRouter } from "next/router"
import { properties } from "@/data/mockdata"

const Manage: NextPage = () => {
  const router = useRouter()
  const propertyId = router.query.propertyId
  const property = properties.find((property) => property.id === propertyId)
  if (!property) {
    return <div>loading...</div>
  }
  return <div>Manage</div>
}

export default Manage
