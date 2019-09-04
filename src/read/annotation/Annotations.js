import db from '../../db/db';
import { v1 as uuid } from 'uuid';

export const create = ({ text }) => {
  const annotation = {
    id: uuid(),
    text,
    createdAt: new Date(),
  };

  return db.table('annotations').add(annotation);
};
