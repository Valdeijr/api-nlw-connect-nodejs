import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client'
import { subscriber } from '../../drizzle/schema/subscriber'
import { redis } from '../../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function SubscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriber)
    .where(eq(subscriber.email, email))

  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }

  const result = await db
    .insert(subscriber)
    .values({
      name,
      email,
    })
    .returning()

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }
  const sub = result[0]
  return {
    subscriberId: sub.id,
  }
}
