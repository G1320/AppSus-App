import HomePage from './views/HomePage.js';
import AboutUs from './views/AboutUs.js';
import EmailIndex from './apps/email/pages/EmailIndex.js';
import NoteIndex from './apps/keep/pages/NoteIndex.js';
// import NoteDetails from './apps/keep/pages/NoteDetails.js';
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
      //   children: [
      //     {
      //       path: 'team',
      //       component: AboutTeam,
      //     },
      //     {
      //       path: 'services',
      //       component: AboutServices,
      //     },
      //   ],
    },
    {
      path: '/note',
      component: NoteIndex,
    },
    // {
    //   path: '/note/add',
    //   component: NoteAdd,
    // },
    // {
    //   path: '/note/:noteId',
    //   component: NoteDetails,
    // },
    // {
    //   path: '/note/edit/:emailId?',
    //   component: NoteEdit,
    // },

    {
      path: '/email',
      component: EmailIndex,
    },
    {
      path: '/note',
      component: NoteIndex,
    },

    // Last fallback if no route was matched:
    {
      path: '/:catchAll(.*)',
      component: HomePage,
    },
  ],
};
export const router = createRouter(options);
