import { emailService } from '../services/email.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="email-index">
            <RouterLink to="/email/edit">Add a email</RouterLink>
            <EmailFilter @filter="setFilterBy"/>
            Unread Emails : {{emails.length}}
            <EmailList 
                :emails="filteredEmails" 
                @remove="removeEmail" />
          
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            // unread : '0'
        }
    },
    created() {
      emailService.query()
      .then(emails => this.emails = emails)
    },
    methods: {
      removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    showSuccessMsg('Email removed')
                  })
                  .catch(err => {
                    showErrorMsg('Email remove failed')
                  })
                },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
          },
    },
    computed: {
      filteredEmails() {
            const regex = new RegExp(this.filterBy.subject, 'i')
            return this.emails.filter(email => regex.test(email.subject))
      },
    },

    components: {
      EmailFilter,
      EmailList,
    }
}

// import { emailService } from "../services/email.service.js"

// export default {
//   name: '',
//   props: [],
//   template: `
//   <h1>Hello World</h1>
  
//   <section class = "email-index">
//     <EmailList 
//     :emails="filteredEmails" 
//     @remove="removeEmail" />
//     </section>
//     `,

//   components: {},
//   created() {
//   },
//   data() {
//     return {}
//   },
//   methods: {},
//   computed: {},
// }