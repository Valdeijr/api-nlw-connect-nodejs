import { db } from '../../drizzle/client'
import { subscriber } from '../../drizzle/schema/subscriber'

interface SubscribeToEventParams {
  name: string
  email: string
}

export async function SubscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const result = await db
    .insert(subscriber)
    .values({
      name,
      email,
    })
    .returning()
  const sub = result[0]
  return {
    subscriberId: sub.id,
  }
}
