import { model } from 'mongoose'
import { Joi, convertJoiSchemaToMongoose } from '@/utils/joi'

const JoiSchema = Joi.object({
    field: Joi.string().trim().pattern(/^[a-zA-Z]+$/).required().empty().messages({
        'string.base': '',
        'string.pattern.base': '',
        'string.empty': '',
        'any.required': '',
    })
})

const MongoSchema = convertJoiSchemaToMongoose(JoiSchema)
export const Model = model('database', MongoSchema)