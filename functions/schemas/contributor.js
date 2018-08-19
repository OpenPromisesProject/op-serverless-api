'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const joi = require('joi').extend(require('joi-phone-number'));
const util = require('../etc/util');
exports.create = joi.object().keys({
  contact: joi
    .string()
    .phoneNumber({ defaultCountry: 'MY', format: 'international' }),
  created_at: joi
    .date()
    .iso()
    .default(util.now, 'Time of creation'),
  email: joi
    .string()
    .email()
    .required(),
  live: joi.boolean().default(false),
  name: joi.string().required(),
  profile_image: joi
    .string()
    .uri()
    .default('https://assets.openpromises.com/avatar.png'),
  status: joi.string().default('Tracker'),
  updated_at: joi
    .date()
    .iso()
    .default(util.now, 'Time of update')
});
exports.update = joi.object().keys({
  contact: joi
    .string()
    .phoneNumber({ defaultCountry: 'MY', format: 'international' }),
  email: joi.string().email(),
  live: joi.boolean().default(false),
  name: joi.string(),
  profile_image: joi.string().uri(),
  status: joi.string(),
  updated_at: joi
    .date()
    .iso()
    .default(util.now, 'Time of update')
});
