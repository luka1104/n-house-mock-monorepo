import { Box, Button, Link, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import React from "react"

const Index: NextPage = () => {
  return (
    <>
      <Box w="100%" maxW="440px" h="100%" position="fixed" zIndex="1" bgImage="/images/HomeTop.png" />
      <Box zIndex="100" maxW="440px" color="black" position="absolute">
        <Box w="75%" pt="56vh" pl="8%" color="white" fontFamily="Noto Sans">
          <Text fontSize="25px" fontWeight={700} lineHeight="1.5">
            ほげほげほげほげほげ
          </Text>
          <Text mt="14px" fontSize="16px" fontWeight={500} lineHeight="1.5">
            ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ
          </Text>
        </Box>
        <Link href="/home" textDecoration="none !important">
          <Button
            ml="8%"
            mb="50px"
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
          >
            はじめる
          </Button>
        </Link>
      </Box>
    </>
  )
}
export default Index
