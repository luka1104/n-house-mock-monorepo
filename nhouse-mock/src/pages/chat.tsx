import { nanoid } from "@/lib/utils"
import { Chat } from "@/components/chat/chat"

export const runtime = "edge"

export default function ChatPage() {
  const id = nanoid()

  return <Chat id={id} />
}
