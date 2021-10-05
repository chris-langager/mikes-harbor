const entriesListElement = document.getElementById('entries');
const newEntryFormElement = document.getElementById('new-entry-form');
newEntryFormElement.onsubmit = newEntrySubmitted;

pageLoaded();

async function pageLoaded() {
  const entries = await listEntries();

  for (let entryElement of entries.map(entryToElement)) {
    entriesListElement.appendChild(entryElement);
  }
}

async function newEntrySubmitted(e) {
  e.preventDefault();
  const [textInput, numberInput] = e.target;

  const { value: someTextField } = textInput;
  const { value: someNumberField } = numberInput;

  const entry = await createEntry({ someTextField, someNumberField });

  const entryElement = entryToElement(entry);
  entriesListElement.appendChild(entryElement);

  newEntryFormElement.reset();
}

async function deleteButtonClicked(e, id) {
  e.preventDefault();
  await deleteEntry(id);
  document.getElementById(`entry-${id}`).remove();
}

function entryToElement(entry) {
  const { id, dateCreated, someTextField, someNumberField } = entry;
  return htmlToElement(`<div id="entry-${id}" class="entry">
        <div class="top">   
            <div class="text">
                ${someTextField}
            </div>
            <div class="delete" onclick="deleteButtonClicked(event, ${id})">x</div>
        </div>

        <div class="bottom">  
            <div class="number">
                ${someNumberField}
            </div>
            <div class="date-created">
                ${new Date(dateCreated).toLocaleString()}
            </div>
        </div>
    </div>`);
}

async function listEntries() {
  return fetch(`/entries`).then((response) => response.json());
}

async function createEntry(entry) {
  return fetch(`/entries`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(entry),
  }).then(async (response) => {
    if (response.status !== 200) {
      throw new Error('error creating entry');
    }
    return response.json();
  });
}

async function deleteEntry(id) {
  await fetch(`/entries/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('error deleting entry');
    }
  });
}

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}
