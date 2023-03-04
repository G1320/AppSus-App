import { emailService } from '../services/email.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    template: `
        <section class="email-edit">
            <div className="email-edit-header">
                <span class="new-email-p">New Email</span>
                <RouterLink @click="saveDraft" class="new-email-close-btn" :to="'/email/list'">x</RouterLink>
            </div>

            <form class="new-email-form" @submit.prevent="save">
                <input class="email-add-input email-add-recipient" type="text" v-model="email.to" placeholder="Recipient">
                <input class="email-add-input email-add-subjest" type="text" v-model="email.subject" placeholder="Subject">
                <textarea class="email-add-input email-add-message" type="text" v-model="email.body" placeholder="Message"></textarea>
                <button class="email-add-btn" >Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            email: emailService.getEmptyEmail()
        }
    },
    created() {
        const { emailId } = this.$route.params
        if (emailId) {
            emailService.get(emailId)
                .then(email => this.email = email)
        }
    },
    methods: {
        save() {
            eventBus.emit('save', { ...this.email })
        },
        saveDraft() {
            this.email.tab = 'draft'
            eventBus.emit('save', { ...this.email })
            // console.log('Hi from saveDraft', this.email)

        }
    }
}