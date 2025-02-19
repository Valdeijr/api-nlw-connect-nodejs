import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '../env'
import { AccessInviteLinkRoute } from './routes/AccessInviteLinkRoute'
import { SubscriberEventRoute } from './routes/SubscriberEventRoute'

const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API NLW',
      version: '0.1.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(SubscriberEventRoute)
app.register(AccessInviteLinkRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server runnig')
})
