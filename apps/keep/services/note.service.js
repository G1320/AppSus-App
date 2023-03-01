'use strict';

import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTE_KEY = 'noteDB';

_createNotes();

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote: getEmptyNote,
  removeReview,
  addReview,
};

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i');
      notes = notes.filter((note) => regex.test(note.subject));
    }
    if (filterBy.minSpeed) {
      notes = notes.filter((note) => note.body >= filterBy.minSpeed);
    }
    return notes;
  });
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId);
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId);
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note);
  } else {
    return storageService.post(NOTE_KEY, note);
  }
}

function getEmptyNote(title = '', price = 0) {
  return {
    id: '',
    title,
    subtitle: utilService.makeLorem(8),
    authors: [utilService.makeLorem(2)],
    categories: [utilService.makeLorem(1), utilService.makeLorem(1)],

    publishedDate: 1920 + Math.random() * 100,
    description: utilService.makeLorem(20),

    pageCount: Math.random() * 1000,
    thumbnail: 'https://drmichellebraun.com/wp-content/uploads/2016/10/Note-Placeholder.png',
    language: 'en',
    listPrice: {
      amount: price,
      currencyCode: 'ILS',
      isOnSale: true,
    },
  };
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: '#00d',
        },
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ];

    utilService.saveToStorage(NOTE_KEY, notes);
  }
}

function _createNote(subject, body = 250) {
  const note = getEmptyNote(subject, body);
  note.id = utilService.makeId();
  return note;
}

function _setNextPrevNoteId(note) {
  return storageService.query(NOTE_KEY).then((notes) => {
    const noteIdx = notes.findIndex((currNote) => currNote.id === note.id);
    note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id;
    note.prevNoteId = notes[noteIdx - 1] ? notes[noteIdx - 1].id : notes[notes.length - 1].id;
    return note;
  });
}

function removeReview(noteId, reviewId) {
  return get(noteId).then((note) => {
    const idx = note.reviews.findIndex((review) => review.id === reviewId);
    note.reviews.splice(idx, 1);
    return save(note);
  });
}
//new function cr

function addReview(noteId, review) {
  return get(noteId).then((note) => {
    review.id = utilService.makeId(4);
    if (!note.reviews) {
      note.reviews = [];
    }
    note.reviews.push(review);
    return save(note);
  });
}
