import { db } from './db';

export async function listEntries(entry) {
  const query = `
    SELECT *
    FROM entries
    ORDER BY date_created;`;

  const rows = await db.any(query);
  return rows.map(parseRow);
}

export async function createEntry(entry) {
  const query = `
    INSERT INTO entries (some_text_field, some_number_field) 
    VALUES ($(someTextField), $(someNumberField))
    RETURNING *;`;

  const [row] = await db.any(query, entry);
  return parseRow(row);
}

export async function deleteEntry(id) {
  const query = `
      DELETE FROM entries 
      WHERE id=$(id);`;

  await db.none(query, { id });
}

function parseRow(row) {
  return {
    id: row.id,
    dateCreated: row.date_created,
    dateUpdated: row.date_updated,
    someTextField: row.some_text_field,
    someNumberField: row.some_number_field,
  };
}
