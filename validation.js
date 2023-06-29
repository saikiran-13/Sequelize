const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
  confirmpassword: Joi.ref('password'),
  DOB: Joi.date().greater(new Date('2001-01-01')).required(),
  status: Joi.boolean().truthy('Yes').valid(true).required(),
  isadmin: Joi.boolean().required(),
  adminAddress: Joi.string().when('isadmin', {
    is: true,
    then: Joi.string()
      .regex(/^0x[0-9a-fA-F]{40}$/)
      .required(),
    otherwise: Joi.string().optional(),
  }),
}).unknown();

module.exports = schema;
