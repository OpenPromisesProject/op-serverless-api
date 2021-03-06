import express from 'express';
import ListModel from '../../models/list';
import { IList, create as createSchema } from '../../schemas/list';
import { ValidationError } from 'joi';

async function createList(req: express.Request, res: express.Response) {
  try {
    const validatedList = await _asyncListValidateCreate(req.body);

    const list = await ListModel().add(validatedList);

    return res.status(200).json(list);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send(e.message);
    }

    console.log(e);
    return res.sendStatus(500);
  }
}

function _asyncListValidateCreate(dataToValidate: IList) {
  return new Promise<IList>((resolve, reject) => {
    createSchema.validate(
      dataToValidate,
      (e: ValidationError, validatedData: IList) => {
        if (e) {
          return reject(e);
        }

        return resolve(validatedData);
      }
    );
  });
}

export default createList;
