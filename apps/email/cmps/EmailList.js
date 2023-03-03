import EmailPreview from './EmailPreview.js'
import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    name: 'EmailList',
    template: `

        <section v-if="emails" class="email-list">
            Emails: {{filteredEmails.length}}
            Unread: {{getUnread}}
            <ul class="clean-list">
                <li v-for="email in filteredEmails" :key="email.id" class="email">
                    <EmailPreview :email="email"/>
                    <div className="preview-btns-container">
                        <RouterLink :to="'/email/'+email.id">Details</RouterLink>
                        <button @click="removeEmail(email.id)">x</button>
                    </div>
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
            emails: [],
            filterBy: {
                tab: '',
                subject: ''
            }
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
        setFilterBy(filter) {
            console.log('setFilter', filter);
            this.filterBy = { ...this.filterBy, ...filter, tab: this.filterBy.tab }
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
            console.log('this.filterBy', this.filterBy)
            console.log('this.emails', this.emails)
            console.log('[...this.emails]', [...this.emails])


            if (!this.filterBy) return this.emails
            // inbox

            let filterdMaEmail = this.emails

            if (this.filterBy.subject) {
                const regex = new RegExp(this.filterBy.subject, 'i')
                filterdMaEmail = filterdMaEmail.filter(email => regex.test(email.subject))
            }
            if (this.filterBy.unread) {
                filterdMaEmail = filterdMaEmail.filter(email => email.isRead === this.filterBy.unread)
            }
            if (this.filterBy.tab) {
                if (this.filterBy.tab === 'inbox') {
                    filterdMaEmail = filterdMaEmail
                }
                else {
                    console.log('filter by tab', this.filterBy);
                    filterdMaEmail = filterdMaEmail.filter(email => email.tab === this.filterBy.tab)
                }
            }
            // this.emails=[...this.emails]

            return filterdMaEmail
        },
        getUnread() {
            return this.filteredEmails.filter(email => !email.isRead).length
        }
    },
    watch: {
        $route: {
            handler(newValue, oldValue) {
                console.log('', oldValue);
                console.log('', newValue);
                const { tab } = this.$route.query
                if (!tab) return
                console.log('tab:', tab)
                this.filterBy.tab = tab
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
            },
            deep: true
        }
    },

    components: {
        EmailPreview,
    }
}