import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { Text } from '@chakra-ui/react'

const exampleMessages = [
  {
    heading: `N'House Blueまでの経路が知りたい！`,
    message: `出発地：`,
    prompt: `飛行機は空路を利用しない限り提示しないでください。所要時間が短い順に提示してください。途中で飛行機を使う必要がある場合は車と電車は提示しないでください。途中で飛行機を使う必要がある場合は飛行機と空港からの陸路を提示してください。
    それぞれのパターンで必要な情報はリンク集にまとめてください。以上の注意点を遵守した上で、次の出発地、滞在地、チェックイン時間から最適な移動プランを出発時間、所要時間も含め提示してください。
    滞在地:〒240-0104 神奈川県横須賀市芦名1-16-34
    チェックイン時間:13:00`
  },
  {
    heading: `N'House Blueを満喫できるプランを立てて！`,
    message: `滞在日数：\n大まかな希望：`,
    prompt: `あなたは凄腕のトリッププランナーです。以下の滞在地と滞在日数と大まかな希望から最適なトリッププランを３パターン上げてください。
    また、それぞれのパターンで必要な情報はリンク集にまとめてください。
    滞在地：〒240-0104 神奈川県横須賀市芦名1-16-34`
  },
  {
    heading: `パッキングが終わらない！助けて！！`,
    message: `滞在日数：\n季節：`,
    prompt: `あなたはパッキングのプロフェッショナルです。以下の滞在地、滞在日数、季節から最適なパッキングを一つ一つ表形式で提示してください。また、それぞれのパターンで必要な情報はリンク集にまとめ、最後に注意点も添えてください。
    滞在地：〒240-0104 神奈川県横須賀市芦名1-16-34`
  }
]

export function EmptyScreen({
  setInput,
  setPrompt
}: {
  setInput: UseChatHelpers['setInput']
  setPrompt: UseChatHelpers['setInput']
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="bg-background rounded-lg border p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to the AI Chatbot!
        </h1>
        <p className="text-muted-foreground mb-2 leading-normal">
          あなただけのAIコンシェルジュです。
          <br />
          旅行のことならなんでもお任せください。
        </p>
        <p className="text-muted-foreground leading-normal">たとえば、</p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => {
                setInput(message.message), setPrompt(message.prompt)
              }}
            >
              <IconArrowRight className="text-muted-foreground mr-2" />
              {message.heading}
            </Button>
          ))}
        </div>
        <Text mt="20px !important">などなど、ぜひお試しください。</Text>
      </div>
    </div>
  )
}
