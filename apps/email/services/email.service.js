'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const email = {
    id: '',
    subject: '',
    body: '',
    isRead: false,
    sentAt: Date.now(),
    removedAt: null,
    from: 'momo@momo.com',
    to: loggedinUser.email,
    tab: ''
}


_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.subject) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.subject))
            }
            if (filterBy.unread) {
                emails = emails.filter(email => !email.isRead)
            }
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        .then(_setNextPrevEmailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    console.log('email', email)
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(subject = '', from = 'me@coemail.com', tab = '', body = '') {
    // return { id: '', subject, body }
    return { id: '', subject, from, tab, body, isRead: false, sentAt: Date.now(), removedAt: null, to: '' }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('Welcome to YouTube', 'youtube@coemail.com'))
        emails.push(_createEmail('Your subscription has expired', 'netflix.coemail.com', 'trash'))
        emails.push(_createEmail('Your Facebook friend wants to let you know', 'facebook@coemail.com', 'draft'))
        emails.push(_createEmail('Get one month free trial at Spotify Music', 'spotify@coemail.com'))
        emails.push(_createEmail('You have been drafted by the "Chicago Bulls"', 'nba@coemail.com'))
        emails.push(_createEmail('You\'ll have to stop stealing our work', 'gmail@coemail.com'))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(subject, from, tab, body = utilService.makeLorem()) {
    const email = getEmptyEmail(subject, from, tab, body)
    email.id = utilService.makeId()
    return email
}

function _setNextPrevEmailId(email) {
    return storageService.query(EMAIL_KEY).then((emails) => {
        const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
        email.nextEmailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
        email.prevEmailId = emails[emailIdx - 1]
            ? emails[emailIdx - 1].id
            : emails[emails.length - 1].id
        return email
    })
}