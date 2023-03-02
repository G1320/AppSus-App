import EmailPreview from './EmailPreview.js'
import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    name: 'EmailList',
    template: `

    <!-- <pre>{{emails}}</pre> -->
        <section v-if="emails" class="email-list">
            Emails: {{emails.length}}
            Unread: {{getUnread}}
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <pre>is Read: {{email.isRead}}</pre>
                    <EmailPreview :email="email"/>
                    <RouterLink :to="'/email/'+email.id">Details</RouterLink> |
                    <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> |
                   <button @click="removeEmail(email.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
        eventBus.on('filter', this.setFilterBy)
        eventBus.on('save', this.onSave)
    },
    data() {
        return {
            // emails : filteredEmails,
            emails: [],
            filterBy: {}
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
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
            this.filterBy = filterBy
        },
        onSave(email) {
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
        }
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