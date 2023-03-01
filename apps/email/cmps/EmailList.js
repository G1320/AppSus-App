import EmailPreview from './EmailPreview.js'
import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'

export default {
    name: 'EmailList',
    template: `

    <!-- <pre>{{emails}}</pre> -->
        <section v-if="emails" class="email-list">
            Emails: {{emails.length}}
            Unread: {{getUnread}}
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                    <RouterLink :to="'/email/'+email.id">Details</RouterLink> |
                    <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> |
                   <button @click="remove(email.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
        eventBus.on('filter', this.setFilterBy)
    },
    data() {
        return {
            emails: null,
            filterBy: {}
        }
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
        readEmail(emailId) {
            emailService.get(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    if (this.emails[idx].isRead === true) return
                    else {
                        this.emails[idx].isRead = true
                        showSuccessMsg('Email read')
                        emailService.save(this.emails[idx])
                    }
                })
                .catch(err => {
                    // showErrorMsg('Email remove failed')
                    console.log('Email\'s already read')
                })
        },
        setFilterBy(filterBy) {
            console.log('', filterBy);

            //   this.filterBy = filterBy
        },
    },
    computed: {
        filteredEmails() {
            const regex = new RegExp(this.filterBy.subject, 'i')
            return this.emails.filter(email => regex.test(email.subject))
        },
        getUnread() {
            return this.emails.filter(email => !email.isRead).length
        }
    },

    components: {
        EmailPreview,
    }
}