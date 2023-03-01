import { emailService } from '../services/email.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    template: `
        <section class="email-edit">
            <h2>{{(email.id)? 'Edit' : 'Add'}} an email</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="email.subject" placeholder="Subject">
                <input type="text" v-model="email.body" placeholder="Body">
                <button>Save</button>
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
            emailService.save(this.email)
                .then(savedEmail => {
                    // console.log('Email saved', savedEmail)
                    showSuccessMsg('Email saved')
                    this.$router.push('/email')
                })
                .catch(err => {
                    showErrorMsg('Email save failed')
                })
        }
    }
}