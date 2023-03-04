import { emailService } from './../services/email.service.js';

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import EmailEdit from '../pages/EmailEdit.js'
import EmailCategories from '../cmps/EmailCategories.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
  name: 'EmailIndex',
  template: `
      <main class="email-main-content">

        <div class="email-filter-list">
          <h1 class="logo">CoeMail</h1>
          <RouterLink class="compose" @click="handleCompose" to="/email/edit"> Compose </RouterLink>
          <EmailCategories />
        </div>

          <section class="email-index">
            <section className="email-filter">
              <EmailFilter/>
            </section>
            

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
    EmailEdit,
    EmailFilter,
    EmailList,
    EmailCategories,
  }
}

