import joi from 'joi';
import utils from '../etc/utils';

const promiseStatusValues = [
  'Review Needed',
  'Fulfilled',
  'Broken',
  'Partially Fulfilled',
  'In Progress',
  'Not Started',
  'At Risk',
  'Retracted'
];

const malaysianStates = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Kuala Lumpur',
  'Labuan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Perak',
  'Perlis',
  'Pulau Pinang',
  'Putrajaya',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu'
];

export interface IPromise {
  category?: string;
  context?: string;
  contributor_id: string;
  clauses?: IClauses;
  cover_image?: string;
  created_at: string;
  description?: string;
  list_ids: string[];
  live: boolean;
  notes?: string;
  politician_id: string;
  post_url?: string;
  quote: string;
  source_date: string;
  source_name: string;
  source_url: string;
  state?: string;
  status: string;
  title: string;
  updated_at: string;
  elaboration?: string;
  deadline?: string;
  review_date?: string;
}

export interface IUpdatePromise {
  category?: string;
  context?: string;
  contributor_id?: string;
  clauses?: IClauses;
  cover_image?: string;
  created_at?: string;
  description?: string;
  list_ids?: string[];
  live?: boolean;
  notes?: string;
  politician_id?: string;
  post_url?: string;
  quote?: string;
  source_date?: string;
  source_name?: string;
  source_url?: string;
  state?: string;
  status?: string;
  title?: string;
  updated_at?: string;
  elaboration?: string;
  deadline?: string;
  review_date?: string;
}

interface IClauses {
  broken?: string;
  fulfilled?: string;
  progress?: string;
}

const alwaysOptionalFields = {
  category: joi.string(),
  clauses: joi.object().keys({
    broken: joi.string(),
    fulfilled: joi.string(),
    progress: joi.string()
  }),
  context: joi.string(),
  cover_image: joi.string().uri(),
  deadline: joi.date().iso(),
  description: joi.string(),
  elaboration: joi.string(),
  post_url: joi.string(),
  review_date: joi.date().iso(),
  state: joi.string().valid(malaysianStates)
};

export const create = joi.object().keys({
  ...alwaysOptionalFields,
  contributor_id: joi.string().required(),
  created_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of creation'),
  list_ids: joi
    .array()
    .items(joi.string())
    .default([]),
  live: joi.boolean().default(false),
  notes: joi.string(),
  politician_id: joi.string().required(),
  quote: joi.string().required(),
  source_date: joi
    .string()
    .isoDate()
    .required(),
  source_name: joi.string().required(),
  source_url: joi
    .string()
    .uri()
    .required(),
  status: joi
    .string()
    .allow(promiseStatusValues)
    .default('Review Needed'),
  title: joi.string().required(),
  updated_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of update')
});

export const update = joi.object().keys({
  ...alwaysOptionalFields,
  contributor_id: joi.string(),
  list_ids: joi.array().items(joi.string()),
  live: joi.boolean(),
  notes: joi.string(),
  politician_id: joi.string(),
  quote: joi.string(),
  source_date: joi.string().isoDate(),
  source_name: joi.string(),
  source_url: joi.string().uri(),
  status: joi
    .string()
    .allow(promiseStatusValues)
    .default('Review Needed'),
  title: joi.string().required(),
  updated_at: joi
    .date()
    .iso()
    .default(utils.now, 'Time of update')
});
