import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { SubscriberEventRoute } from "../routes/SubscriberEventRoute";
import { env } from "../env";




const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:3000'
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API NLW",
      version: "0.1.0"
    }
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

app.register(SubscriberEventRoute)

app.listen({port: env.PORT}).then(() => {
  console.log("Server runnig")
})