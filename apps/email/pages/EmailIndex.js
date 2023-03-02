import { emailService } from './../services/email.service.js';

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  name: 'EmailIndex',
  template: `
      <main class="email-main-content">

        <div class="email-filter-list">
          <RouterLink @click="handleCompose" to="/email/edit">Compose</RouterLink>
          <p>I AM INBOX</p>
          <p>I AM STARRED</p>
          <p>I AM SENT</p>
          <p>I AM DRAFT</p>
          <p>I AM TRASH</p>
        </div>

          <section class="email-index">
            <section className="email-filter">
              <EmailFilter/>
            </section>
            
            <h2>Inbox :</h2>
            <RouterView></RouterView>
          </section>
          <section v-if="setCompose" class="email-compose">
            <EmailEdit />
          </section>
          </main>
          `,
  created() {
    emailService.query()
      .then(emails => this.emails = emails)
  },
  data() {
    return {
      emails: null,

    }
  },
  computed: {

    setCompose() {
      return (this.$route.query.compose === 'new')
    },
    compose() {
      return this.$route.params
    }
  },
  watch: {
    compose() {
      console.log('params Changed!')
    }
  },
  methods: {
    handleCompose() {
      this.$router.push({ path: '/email/list', query: { compose: 'new' } });
    }
  },
  components: {
    EmailFilter,
    EmailList,
  }
}

