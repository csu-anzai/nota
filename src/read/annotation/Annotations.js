import db from '../../db/db';
import { v1 as uuid } from 'uuid';
import { getFullVerseId } from '../../shared/helpers/bookHelpers';

export const create = ({ text }) => {
  const annotation = {
    id: uuid(),
    text,
    createdAt: new Date(),
    verseId: getFullVerseId(),
  };

  return db.table('annotations').add(annotation);
};
