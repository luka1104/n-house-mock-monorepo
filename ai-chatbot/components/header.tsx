'use client'

import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Input,
  Link,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'

import React from 'react'

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <HStack
        zIndex="200"
        top="0"
        w="100%"
        // maxW="440px"
        h="64px"
        bg="white"
        justifyContent="space-between"
      >
        <Link
          href="https://n.house/home"
          w="24px"
          ml="16px"
          textDecoration="none !important"
        >
          <Image h="24px" my="20px" src="/icons/Back.png" />
        </Link>
        <Link href="/home" textDecoration="none !important">
          <Text
            fontFamily="Oswald"
            color="black"
            fontSize="18px"
            fontWeight="700"
            lineHeight="1.5"
          >
            N&apos;HOUSE Chatbot
          </Text>
        </Link>
        <Box w="24px" mr="12px" textDecoration="none !important">
          <Image
            w="24px"
            my="20px"
            src={true ? '/icons/AccountActive.png' : '/icons/Account.png'}
          />
        </Box>
      </HStack>
    </>
  )
}

export default Header
