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
    // if (filterBy.minSpeed) {
    //   notes = notes.filter((note) => note.body >= filterBy.minSpeed);
    // }
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

function getEmptyNote(title = '') {
  return {
    id: 'n303',
    createdAt: 33112222,
    type: 'NoteTxt',
    isPinned: true,
    title: 'Your title here',
    style: {
      backgroundColor: '#01c1e7',
    },
    info: {
      txt: 'Your note here',
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
          backgroundColor: '#0a93de',
        },
        info: {
          title: 'Title',
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,

        info: {
          title: 'Title',
          url: 'https://source.unsplash.com/random/?cats&4',
          imgTitle: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#fb32bc',
        },
      },
      // {
      //   id: 'n103',
      //   type: 'NoteTodos',
      //   isPinned: false,
      //   info: {
      //     title: 'Get my stuff together',
      //     todos: [
      //       { txt: 'Driving license', doneAt: null },
      //       { txt: 'Coding power', doneAt: 187111111 },
      //     ],
      //   },
      // },
      {
        id: 'n104',
        createdAt: 1112255,
        type: 'NoteTxt',
        isPinned: true,

        style: {
          backgroundColor: '#fee719',
        },
        info: {
          title: 'Title',
          txt: 'I think I got it!',
        },
      },
      {
        id: 'n105',
        createdAt: 1112299,
        type: 'NoteTxt',
        isPinned: true,

        style: {
          backgroundColor: '#ab7bd0',
        },
        info: {
          title: 'Title',
          txt: 'Lets take it further!',
        },
      },
      {
        id: 'n106',
        type: 'NoteImg',
        isPinned: false,

        info: {
          title: 'Title',
          url: 'https://source.unsplash.com/random/?zoo&2',
          imgTitle: 'Puki and I',
        },
        style: {
          backgroundColor: '#00223d',
        },
      },
      {
        id: 'n107',
        type: 'NoteImg',
        isPinned: false,

        info: {
          title: 'Title',
          url: 'https://source.unsplash.com/random/?hippopotamus&2',
          imgTitle: 'Noice pics!',
        },
        style: {
          backgroundColor: '#4fcec0',
        },
      },
      {
        id: 'n108',
        createdAt: 1112333,
        type: 'NoteTxt',
        isPinned: true,

        style: {
          backgroundColor: '#3733a0',
        },
        info: {
          title: 'Title',
          txt: 'Bring out some color!',
        },
      },
      {
        id: 'n109',
        createdAt: 1112333,
        type: 'NoteTxt',
        isPinned: true,

        style: {
          backgroundColor: '#894c8c',
        },
        info: {
          title: 'title',
          txt: 'Get groceries',
        },
      },
      {
        id: 'n110',
        type: 'NoteImg',
        isPinned: false,

        info: {
          title: 'Title',
          url: 'https://source.unsplash.com/random/?hippopotamus&3',
          imgTitle: 'Remember that?',
        },
        style: {
          backgroundColor: '#8a23e7',
        },
      },
      {
        id: 'n111',
        type: 'NoteImg',
        isPinned: false,

        info: {
          title: 'The best note ever!',
          url: 'https://source.unsplash.com/random/?cats&3',
          imgTitle: 'Oops, I did it again!',
        },
        style: {
          backgroundColor: '#dc464d',
        },
      },
      // {
      //   id: 'n112',
      //   createdAt: 1112333,
      //   type: 'NoteTxt',
      //   isPinned: true,

      //   style: {
      //     backgroundColor: '#dc464d',
      //   },
      //   info: {
      //     title: 'title',
      //     txt: 'Get concert tickets',
      //   },
      // },
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
