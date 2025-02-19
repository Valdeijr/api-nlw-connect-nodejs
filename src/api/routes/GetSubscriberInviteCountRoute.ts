import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { GetSubscriberInviteCount } from '../functions/GetSubscriberInviteCount'

export const GetSubscriberInviteCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get Subscriber Invite Count',
          tags: ['Referral Link'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { count } = await GetSubscriberInviteCount({ subscriberId })
        return { count }
      }
    )
  }
