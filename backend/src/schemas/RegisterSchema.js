const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Firstname a string',
      'string.min': 'firstname must be atleast  3 characters long ',
      'string.max': 'firstname cannot exceed 50 characters',
      'any.required': 'firstname is required'
    }),
    lastName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'lastname a string',
      'string.min': 'lastname must be atleast  3 characters long ',
      'string.max': 'lastname cannot exceed 50 characters',
      'any.required': 'lastname is  required'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(4)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 4 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
     role: Joi.string()
    .valid("parking attendant","admin")
    .default('USER')
    .optional()
    .messages({
      'string.base': 'Role must be a string',
      'any.only': 'Role must be either packing attendant OR admin'
    })
});

module.exports = {registerSchema}
