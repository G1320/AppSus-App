import { emailService } from './../services/email.service.js';

import EmailFilter from '../cmps/EmailFilter.js';
import EmailList from '../cmps/EmailList.js';
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';

export default {
  name: 'EmailIndex',
  template: `
        <section v-if="emails" class="email-index">
            <RouterLink @click="handleCompose" to="/email/edit">Compose an email</RouterLink>
            <EmailFilter/>
          
            <h2>Inbox :</h2>
            <RouterView></RouterView>
        </section>
        <section class="email-compose">this is the email compose section</section>
    `,
  created() {
    emailService.query().then((emails) => (this.emails = emails));
  },
  data() {
    return {
      emails: null,
    };
  },
  computed: {
    compose() {
      return this.$route.params;
    },
  },
  watch: {
    compose() {
      console.log('params Changed!');
    },
  },
  methods: {
    handleCompose() {
      this.$router.push({ path: '/email/list', query: { compose: 'new' } });
    },
  },
  components: {
    EmailFilter,
    EmailList,
  },
};
