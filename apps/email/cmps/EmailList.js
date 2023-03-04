import EmailPreview from './EmailPreview.js'
import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    name: 'EmailList',
    template: `
        <p class="list-category">{{filterBy.tab}} :</p>
        <section v-if="emails" class="email-list">
            <div className="category-info">
                Emails: {{filteredEmails.length}}
                Unread: {{getUnread}}
            </div>
            <ul class="clean-list">
                <li v-for="email in filteredEmails" :key="email" class="email" @click="handleEmailClick(email)">
                    <div class="test">
                        <button><span class="material-symbols-outlined">
                        check_box_outline_blank
                        </span></button>
                        <EmailPreview :email="email"/>
                    </div>
                    <div class="preview-btns-container">
                        <RouterLink @click="handleEdit(email)" v-if="email.tab === 'draft'" :to="'/email/edit/'+email.id">Edit</RouterLink>
                        <!-- <RouterLink :to="'/email/'+email.id">Details</RouterLink> -->
                        <button class="ep-btn" title="Mark/Unmark Star" v-bind:class="{ 'starred': email.tab === 'starred' }" @click="starEmail(email.id, $event)"><span class="material-symbols-outlined">
                        star
                        </span></button>
                        <button class="ep-btn" title="Move to Trash" @click="removeEmail(email.id, $event)"><span class="material-symbols-outlined">
                        delete
                        </span></button>
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
                tab: 'inbox',
                subject: '',
                unread: false,
            }
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        removeEmail(emailId, event) {
            event.stopPropagation()
            emailService.get(emailId)
                .then(email => {
                    if (email.tab !== 'trash') {
                        email.tab = 'trash'
                        emailService.save(email)
                            .then(savedEmail => {
                                const idx = this.emails.findIndex(email => email.id === emailId)
                                this.emails[idx] = savedEmail
                            })
                        this.$router.push({ path: '/email/list' });
                    }
                    else {

                        emailService.remove(emailId)
                            .then(() => {
                                const idx = this.emails.findIndex(email => email.id === emailId)
                                this.emails.splice(idx, 1)
                                showSuccessMsg('Email removed')
                            })
                            .catch(err => {
                                showErrorMsg('Email remove failed')
                            })
                    }
                })
        },
        starEmail(emailId, event) {
            event.stopPropagation();
            emailService.get(emailId)
                .then(email => {
                    if (email.tab !== 'starred') {
                        email.tab = 'starred'
                    }
                    else email.tab = ''
                    emailService.save(email)
                        .then(savedEmail => {
                            const idx = this.emails.findIndex(email => email.id === emailId)
                            this.emails[idx] = savedEmail
                        })
                })
                .catch(err => {
                    console.log('Email starring failed')
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
            if (email.body === '') return
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
            if (email.tab === 'draft') {
                this.$router.push({ path: '/email/list', query: { 'tab': 'draft' } });
            } else {
                this.$router.push({ path: '/email/list', query: { 'tab': 'sent' } });
            }
        },
        handleEdit(email) {
            this.$router.push({ path: '/email/list', query: { compose: 'new' } });
        },
        handleEmailClick(email) {
            this.$router.push({ path: `/email/${email.id}` });
        }
    },
    computed: {
        filteredEmails() {
            console.log('this.filterBy', this.filterBy)
            console.log('this.emails', this.emails)
            console.log('[...this.emails]', [...this.emails])


            // if (!this.filterBy) return this.emails
            // inbox

            let filterdMaEmail = this.emails

            if (this.filterBy.subject) {
                const regex = new RegExp(this.filterBy.subject, 'i')
                filterdMaEmail = filterdMaEmail.filter(email => regex.test(email.subject))
            }
            if (this.filterBy.unread) {
                filterdMaEmail = filterdMaEmail.filter(email => email.isRead !== this.filterBy.unread)
            }
            if (this.filterBy.tab) {
                if (this.filterBy.tab === 'inbox') {
                    filterdMaEmail = filterdMaEmail.filter(email => email.tab !== 'trash')
                    filterdMaEmail = filterdMaEmail.filter(email => email.from !== 'me@coemail.com')
                }
                else if (this.filterBy.tab === 'sent') {
                    filterdMaEmail = filterdMaEmail.filter(email => email.from === 'me@coemail.com')
                    filterdMaEmail = filterdMaEmail.filter(email => email.tab !== 'draft')
                }
                // else if (this.filterBy.tab === 'draft') {
                //     filterdMaEmail = filterdMaEmail.filter(email => email.tab === 'draft')
                // }
                // else if (this.filterBy.tab === 'trash') {
                //     filterdMaEmail = filterdMaEmail.filter(email => email.tab === 'trash')
                // }
                // else if (this.filterBy.tab === 'starred') {
                //     filterdMaEmail = filterdMaEmail.filter(email => email.tab === 'starred')
                // }
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