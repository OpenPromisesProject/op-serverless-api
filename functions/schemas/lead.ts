import joi from 'joi';
import utils from '../etc/utils';

export interface ILead {
  assigned_tracker: string;
  created_at: string;
  id: string;
  link: string;
  notes: string;
  original_promise: string;
  review_status: string;
  reviewed_by: string;
  submitter: string;
  type: string;
  updated_at: string;
}

export const create = joi.object().keys({
  assigned_tracker: joi.string().required(),
  created_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of creation'),
  link: joi.string().required(),
  notes: joi.string().required(),
  original_promise: joi.string().required(),
  review_status: joi.string().required(),
  reviewed_by: joi.string().required(),
  submitter: joi.string().required(),
  type: joi
    .string()
    .valid('promise', 'promiseUpdate')
    .required(),
  updated_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of update')
});

export const update = joi.object().keys({
  assigned_tracker: joi.string().required(),
  created_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of creation'),
  id: joi.string().required(),
  link: joi.string().required(),
  notes: joi.string().required(),
  original_promise: joi.string().required(),
  review_status: joi.string().required(),
  reviewed_by: joi.string().required(),
  submitter: joi.string().required(),
  type: joi
    .string()
    .valid('promise', 'promiseUpdate')
    .required(),
  updated_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of update')
});
