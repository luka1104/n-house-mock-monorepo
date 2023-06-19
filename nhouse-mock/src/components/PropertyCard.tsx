import { Box, Link, Text } from "@chakra-ui/react"
import React from "react"

type Props = {
  property: any
}

const PropertyCard: React.FC<Props> = ({ property }) => {
  return (
    <>
      <Link w="100%" href={property.href}>
        <Box w="100%" h="560px" bgSize="cover" maxW="440px" borderRadius="16px" bgImage={property.image}>
          <Box
            fontFamily="Oswald"
            color="white"
            fontSize="60px"
            fontWeight="700"
            lineHeight="1.5"
            fontStyle="normal"
            float="right"
            textAlign="right"
            mt="20px"
            mr="20px"
          >
            <Text>N’HOUSE</Text>
            <Text mt="-18px">{property.title}</Text>
          </Box>
          <Text
            maxW="56%"
            fontFamily="Noto Sans"
            color="white"
            fontSize="14px"
            fontWeight="700"
            lineHeight="2"
            float="right"
            mt="20px"
            mr="20px"
          >
            {property.description}
          </Text>
          <Text
            position="absolute"
            mt="520px"
            ml="12px"
            transform="rotate(-90deg)"
            transformOrigin={"left top 0"}
            fontFamily="Oswald"
            color="white"
            fontSize="12px"
            fontWeight="500"
            lineHeight="1.5"
          >
            {property.label}
          </Text>
        </Box>
      </Link>
    </>
  )
}

export default PropertyCard
