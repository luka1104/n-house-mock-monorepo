import { NextPage } from "next"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { properties } from "@/data/mockdata"
import PropertyManageCard from "@/components/PropertyManageCard"
import { Box, useDisclosure } from "@chakra-ui/react"

const Manage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const propertyId = router.query.propertyId
  const property = properties.find((property) => property.id === propertyId)
  if (!property) {
    return <div>loading...</div>
  }
  return (
    <>
      <PropertyManageCard property={property} onOpen={onOpen} isLoading={isLoading} />
    </>
  )
}

export default Manage
