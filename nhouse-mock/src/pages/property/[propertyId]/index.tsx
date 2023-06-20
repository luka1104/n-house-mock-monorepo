import React, { useState } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"
import { properties } from "@/data/mockdata"
import { Box, Button, Center, Image, Input, Link, Text } from "@chakra-ui/react"
import { usePrivy } from "@privy-io/react-auth"
import axios from "axios"

const PropertyPage: NextPage = () => {
  const { login, ready, authenticated, signMessage } = usePrivy()
  const [passKey, setPassKey] = useState("")
  const router = useRouter()
  const propertyId = router.query.propertyId
  const property = properties.find((property) => property.id === propertyId)
  if (!property) {
    return <div>loading...</div>
  }

  const handleSignRequest = async () => {
    if (!ready || !authenticated) {
      login()
      return
    }
    const message = "署名をすることで権利を獲得できます。"
    const config = {
      title: "署名リクエスト",
      description: "署名をすることでこのアカウントがあなたのものだと証明します。",
      buttonText: "署名する",
    }
    const res = await signMessage(message, config)
    console.log(res)
    if (res) {
      axios
    }
  }
  return (
    <>
      <Box w="100%" h="560px" bgSize="cover" maxW="440px" bgImage={property.image}>
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
      </Box>
      <Box p="24px">
        <Text fontFamily="Noto Sans" color="white" fontSize="14px" fontWeight="700" lineHeight="2">
          この魅力的な別荘は、忙しい都会の喧騒を忘れ、ゆったりと過ごすのに最適です。建物の前には広々とした海が広がり、美しい景色を望むことができます。室内には木や石などの自然物が使われており、自然の温かみが感じられます。心地良い自然の風を感じながら、静寂な環境でリラックスすることができます。忙しい日常から解放され、贅沢なひとときを過ごしたい方におすすめの別荘です。
        </Text>
      </Box>
      <Image src="/images/Detail1.png" />
      <Box p="24px">
        <Text fontFamily="Noto Sans" color="white" fontSize="14px" fontWeight="700" lineHeight="2">
          この素敵な別荘の家具は、快適さと美しさを兼ね備えています。シンプルかつ洗練されたデザインの家具が、豊かな自然環境と調和しています。リビングルームには、快適なソファセットとコーヒーテーブルが配置され、くつろぎの空間を演出しています。ダイニングエリアには、自然素材を使用したダイニングテーブルとチェアがあり、食事を楽しむための上質な空間を提供しています。寝室には、快眠をサポートするベッドと上質な寝具が備えられており、疲れを癒す最適な環境です。また、バルコニーやテラスには、屋外でくつろぐためのソファやリクライニングチェアが配置されており、自然の中でのくつろぎのひとときを演出しています。この別荘の家具は、快適さと美しさを追求したデザインが特徴であり、滞在者に心地よい時間を提供します。
        </Text>
      </Box>
      <Image src="/images/Detail2.png" />
      <Box p="24px">
        <Text fontFamily="Noto Sans" color="white" fontSize="14px" fontWeight="700" lineHeight="2">
          この素晴らしい建物は、壮大な海の眺めを誇っています。建物の位置は海岸にあり、一歩外に出れば広がる海の景色はまさに絶景です。透明な窓ガラスからは、碧い海とその輝きが目に飛び込んできます。朝は太陽の光が水面に反射し、まばゆい輝きを放ちます。昼間は波の音と風の匂いが心地よく、夕方には美しい夕焼けが海面に広がります。特にバルコニーやテラスから眺めると、壮大な水平線と連続する波が息をのむほどの景色となります。ここでは海鳥の姿や遠くに浮かぶ島々も見ることができます。この建物の魅力的な海の眺めは、忙しい日常を忘れ、リラックスや癒しを求める人々にとって究極の避難所です。豪華な滞在とともに、絶景の海を楽しむ贅沢な時間を過ごすことができます。
        </Text>
      </Box>
      <Center w="100%">
        <Input
          type="password"
          isInvalid={passKey !== process.env.NEXT_PUBLIC_PASS_KEY}
          value={passKey}
          placeholder="パスキー"
          w="83.5%"
          h="56px"
          bg="white"
          borderRadius={0}
          onChange={(e) => setPassKey(e.target.value)}
        />
      </Center>
      <Center w="100%" pb="98px">
        <Button
          isLoading={!ready}
          loadingText="認証情報読み込み中"
          spinnerPlacement="end"
          isDisabled={propertyId !== "1" || passKey !== process.env.NEXT_PUBLIC_PASS_KEY}
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
            ready && authenticated ? handleSignRequest() : login()
          }}
        >
          {propertyId !== "1" ? "Coming Soon..." : "署名して権利を取得する"}
        </Button>
      </Center>
    </>
  )
}

export default PropertyPage
