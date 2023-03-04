export default {
    props: ['email'],
    template: `
        <article v-bind:class="{'bold': !email.isRead}" class="email-preview">
            <p>{{ email.from }}</p>
            <p class="email-subject">{{ email.subject }}</p>
        </article>
    `,
}