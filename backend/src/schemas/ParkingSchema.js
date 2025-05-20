 const Joi = require('joi');
 
 
 const parkingSchema=Joi.object({
    code: Joi.string().min(3).max(10).required().messages({
      'string.base': 'Code must be a string',
      'string.min': 'Code must be at least 3 characters',
      'string.max': 'Code must be at most 10 characters',
      'any.required': 'Code is required',
    }),
    name: Joi.string().min(2).max(50).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be at most 50 characters',
      'any.required': 'Name is required',
    }),
    totalSpaces: Joi.number().integer().min(1).required().messages({
      'number.base': 'Total spaces must be a number',
      'number.integer': 'Total spaces must be an integer',
      'number.min': 'Total spaces must be at least 1',
      'any.required': 'Total spaces is required',
    }),
    location: Joi.string().min(5).max(100).required().messages({
      'string.base': 'Location must be a string',
      'string.min': 'Location must be at least 5 characters',
      'string.max': 'Location must be at most 100 characters',
      'any.required': 'Location is required',
    }),
    feePerHour: Joi.number().min(0.01).required().messages({
      'number.base': 'Fee per hour must be a number',
      'number.min': 'Fee per hour must be at least 0.01',
      'any.required': 'Fee per hour is required',
    })
 })


 module.exports = {parkingSchema}