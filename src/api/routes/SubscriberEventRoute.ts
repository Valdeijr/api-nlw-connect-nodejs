import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { SubscribeToEvent } from '../functions/subscribeToEvent'
export const SubscriberEventRoute: FastifyPluginAsyncZod = async app => {
  const createSubscriberSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  type CreateSubscriberBody = z.infer<typeof createSubscriberSchema>

  app.post(
    '/subscribers',
    {
      schema: {
        summary: 'Subscriber Event Route',
        tags: ['Subscriber'],
        body: createSubscriberSchema,
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as CreateSubscriberBody

      const { subscriberId } = await SubscribeToEvent({
        name,
        email,
      })
      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
