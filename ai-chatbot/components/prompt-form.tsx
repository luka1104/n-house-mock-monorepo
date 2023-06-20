import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="bg-background relative flex w-full grow flex-col overflow-hidden px-8 sm:rounded-md sm:border sm:px-12">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href=""
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'bg-background absolute left-0 top-4 h-8 w-8 rounded-full p-0 sm:left-4'
            )}
          >
            <IconPlus onClick={() => window.location.reload()} />
            <span className="sr-only">新規チャット</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>新規チャット</TooltipContent>
      </Tooltip>
      <Textarea
        ref={inputRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        rows={1}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="AI コンシェルジュに話しかけてみましょう。"
        spellCheck={false}
        className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
      />
      <div className="absolute right-0 top-4 sm:right-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || input === ''}
              onClick={async () => {
                if (input === '') {
                  return
                }
                setInput('')
                await onSubmit(input)
              }}
            >
              <IconArrowElbow />
              <span className="sr-only">クリックして送信</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>クリックして送信</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
