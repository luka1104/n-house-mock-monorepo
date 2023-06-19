import PropertyCard from "@/components/PropertyCard"
import { properties } from "@/data/mockdata"
import { Box, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import React from "react"
const Home: NextPage = () => {
  return (
    <>
      <Flex mt="20px" flexDirection="column" gap="32px" w="100%">
        {properties.map((property) => (
          <PropertyCard property={property} />
        ))}
      </Flex>
    </>
  )
}

export default Home
