import { inArray } from 'drizzle-orm'
import { db } from '../../drizzle/client'
import { subscriber } from '../../drizzle/schema/subscriber'
import { redis } from '../../redis/client'

export async function GetRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subsAndScore: Record<string, number> = {}
  for (let i = 0; i < ranking.length; i += 2) {
    subsAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriber)
    .where(inArray(subscriber.id, Object.keys(subsAndScore)))

  const rankingWithScore = subscribers
    .map(sub => {
      return {
        id: sub.id,
        name: sub.name,
        score: subsAndScore[sub.id],
      }
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { rankingWithScore }
}
