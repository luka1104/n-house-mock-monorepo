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
        position="fixed"
        zIndex="200"
        top="0"
        w="100%"
        maxW="440px"
        h="64px"
        bg="white"
        justifyContent="space-between"
      >
        <Link href="/home" w="24px" ml="16px" textDecoration="none !important">
          <Image w="24px" my="20px" src="/icons/Setting.png" />
        </Link>
        <Link href="/home" textDecoration="none !important">
          <Text
            fontFamily="Oswald"
            color="black"
            fontSize="18px"
            fontWeight="700"
            lineHeight="1.5"
          >
            N&apos;HOUSE
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
      {/* <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt="50px">
            <HStack justifyContent="space-between">
              <Text
                fontFamily="Noto Sans"
                fontSize="16px"
                lineHeight="1.5"
                fontWeight="700"
                color="black"
              >
                ウォレットアドレス
              </Text>
              <Text
                cursor="pointer"
                fontFamily="Noto Sans"
                fontSize="14px"
                lineHeight="1.5"
                fontWeight="500"
                color="black"
                onClick={() => {
                  navigator.clipboard.writeText(user?.wallet?.address as string)
                }}
              >
                コピーする
              </Text>
            </HStack>
            <Textarea disabled value={user?.wallet?.address} />
          </DrawerBody>

          <DrawerFooter>
            <Center w="100%" pb="24px">
              <Button
                color="white"
                fontFamily="Noto Sans"
                mt="20px"
                fontSize="16px"
                fontWeight={700}
                lineHeight="1.5"
                bg="#00A7C1"
                w="100%"
                h="56px"
                borderRadius="0px"
                _hover={{ bg: '#00A7C1' }}
                onClick={logoutHandler}
              >
                ログアウトする
              </Button>
            </Center>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </>
  )
}

export default Header
