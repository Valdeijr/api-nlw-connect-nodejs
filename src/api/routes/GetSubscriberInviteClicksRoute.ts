import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { GetSubscriberInviteClicks } from '../functions/GetSubscriberInviteClicks'

export const GetSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get Subscriber Invite Clicks Count',
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
        const { count } = await GetSubscriberInviteClicks({ subscriberId })
        return { count }
      }
    )
  }
