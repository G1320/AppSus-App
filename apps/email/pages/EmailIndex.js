import { emailService } from './../services/email.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import EmailEdit from './EmailEdit.js'

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
  },
  data() {
    return {
      emails: [],
      filterBy: {}
    }
  },
  computed: {

    setCompose() {
      return (this.$route.query.compose === 'new')
    },
    compose() {
      return this.$route.params
    },

  },
  watch: {
    compose() {
      console.log('params Changed!')
      console.log('this.$route.params', this.$route.query)
    }
  },
  methods: {
    handleCompose() {
      this.$router.push({ path: '/email/list', query: { compose: 'new' } });
    },
    saveNewEmail(email) {
      console.log(email)
      emailService.save(email)
        .then(savedEmail => {
          console.log('saved', savedEmail);

          showSuccessMsg('Email saved')
          this.emails.push(savedEmail)


        })
        .catch(err => {
          showErrorMsg('Email save failed')
        })
      this.$router.push({ path: '/email/list' });
    },
  },
  components: {
    EmailFilter,
    EmailList,
    EmailEdit,
  }
}

