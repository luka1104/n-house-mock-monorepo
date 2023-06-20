import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { Text } from '@chakra-ui/react'

const exampleMessages = [
  {
    heading: "N'House Blueまでの経路が知りたい！",
    message: `次の出発地、滞在地、チェックイン時間から最適な移動プランを電車、車、飛行機のそれぞれのパターンで出発時間、所要時間も含め提示してください。
    ただし、飛行機は電車、車と比べて所要時間半分以下でない限り提示しないでください。
    また、それぞれのパターンで必要な情報はリンク集にまとめてください。
    滞在地:〒259-0313 神奈川県足柄下郡湯河原町鍛冶屋９５１−９
    チェックイン時間:13:00
    出発地：`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
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
              onClick={() => setInput(message.message)}
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
