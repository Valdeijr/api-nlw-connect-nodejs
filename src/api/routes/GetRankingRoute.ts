import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { GetRanking } from '../functions/GetRanking'

export const GetRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get Ranking',
        tags: ['Ranking'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await GetRanking()
      return { ranking: rankingWithScore }
    }
  )
}
