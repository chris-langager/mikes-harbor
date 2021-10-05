CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  some_text_field text NOT NULL,
  some_number_field integer NOT NULL
);