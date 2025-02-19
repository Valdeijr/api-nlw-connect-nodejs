import { redis } from '../../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function GetSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const rankPosition = await redis.zrevrank('referral:ranking', subscriberId)
  if (rankPosition === null) return { position: null }
  return { position: rankPosition + 1 }
}
