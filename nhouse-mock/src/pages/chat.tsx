import { nanoid } from "@/lib/utils"
import { Chat } from "@/components/chat/chat"

export default function ChatPage() {
  const id = nanoid()

  return <Chat id={id} />
}
