import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../../env'
import { AccessInviteLink } from '../functions/AccessInviteLink'

export const AccessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access Invite Link And Redirects User',
        tags: ['Referral Link'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      await AccessInviteLink({ subscriberId })
      const redirectUrl = new URL(env.REDIRECT_URL)
      redirectUrl.searchParams.set('referrer', subscriberId)
      return reply.redirect(redirectUrl.toString(), 302) //301: permanente, 302: temporário
    }
  )
}
