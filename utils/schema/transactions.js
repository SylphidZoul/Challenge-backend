const Joi = require('joi')

const CONCEPT = Joi.string().pattern(/^[a-zA-Z0-9 ]{1,50}$/)
const AMOUNT = Joi.number().positive().greater(0).precision(2).max(99999999)
const DATE = Joi.date().max('now')
const TYPE = Joi.string().valid('INGRESS', 'EGRESS')
const CATEGORY = Joi.string().valid('FOODS', 'BILLS', 'TRANSPORTS', 'TRANSFERS', 'OTHERS')
const INTEGER_POSITIVE = Joi.number().positive().greater(0)

const getQuery = Joi.object({
  type: TYPE,
  category: CATEGORY,
  limit: INTEGER_POSITIVE,
  page: INTEGER_POSITIVE
})

const idParam = Joi.object({
  id: INTEGER_POSITIVE
})

const createBody = Joi.object({
  concept: CONCEPT.required(),
  amount: AMOUNT.required(),
  date: DATE.allow(null),
  type: TYPE.required(),
  category: CATEGORY.allow(null)
})

const updateBody = Joi.object({
  concept: CONCEPT,
  amount: AMOUNT,
  date: DATE.allow(null),
  category: CATEGORY.allow(null)
}).min(1)

module.exports = {
  getQuery,
  idParam,
  createBody,
  updateBody
}
