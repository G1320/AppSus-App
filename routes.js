import HomePage from './views/HomePage.js';
import AboutUs from './views/AboutUs.js';
import EmailIndex from './apps/email/pages/EmailIndex.js';
import EmailDetails from './apps/email/pages/EmailDetails.js';
import EmailEdit from './apps/email/pages/EmailEdit.js';
import EmailList from './apps/email/cmps/EmailList.js';
import NoteIndex from './apps/keep/pages/NoteIndex.js';
import NoteDetails from './apps/keep/pages/NoteDetails.js';
import NoteEdit from './apps/keep/cmps/NoteEdit.js';
// import NoteEdit from './apps/keep/cmps/NoteEdit.js';

const { createRouter, createWebHashHistory } = VueRouter;
const options = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    {
      path: '/note',
      component: NoteIndex,
      children: [
        {
          path: '/note/:noteId',
          component: NoteDetails,
        },
        {
          path: '/note/edit/:noteId',
          component: NoteEdit,
        },
      ],
    },

    {
      path: '/email',
      component: EmailIndex,
      children: [
        {
          path: 'list',
          component: EmailList,
        },
        {
          path: ':id',
          component: EmailDetails,
        },
      ],
    },

    // Last fallback if no route was matched:
    {
      path: '/:catchAll(.*)',
      component: HomePage,
    },
  ],
};
export const router = createRouter(options);
