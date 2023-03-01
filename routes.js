import HomePage from './views/HomePage.js';
import AboutUs from './views/AboutUs.js';
import EmailIndex from './views/EmailIndex.js';
import KeepIndex from './views/KeepIndex.js';

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
    // {
    //   path: '/book',
    //   component: BookIndex,
    // },
    // {
    //   path: '/book/add',
    //   component: BookAdd,
    // },
    // {
    //   path: '/book/:bookId',
    //   component: BookDetails,
    // },
    // {
    //   path: '/book/edit/:emailId?',
    //   component: BookEdit,
    // },

    {
      path: '/email',
      component: EmailIndex,
    },
    {
      path: '/keep',
      component: KeepIndex,
    },

    // Last fallback if no route was matched:
    {
      path: '/:catchAll(.*)',
      component: HomePage,
    },
  ],
};
export const router = createRouter(options);
