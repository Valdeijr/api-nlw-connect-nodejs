import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
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
            name: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as CreateSubscriberBody
      return reply.status(201).send({
        name,
        email,
      })
    }
  )
}
