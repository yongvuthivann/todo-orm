import * as Joi from '@hapi/joi'

export const validationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5433).required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required()
})