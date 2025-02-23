import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { SubscribeToEvent } from '../functions/subscribeToEvent'
export const SubscriberEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscribers',
    {
      schema: {
        summary: 'Subscriber Event Route',
        tags: ['Subscriber'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      const { subscriberId } = await SubscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })
      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
