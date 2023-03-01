'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'

_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
}

check()

function check() {
    let x = utilService.makeLorem(5)
    console.log('check:', x)
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.vendor))
            }
            if (filterBy.minSpeed) {
                emails = emails.filter(email => email.maxSpeed >= filterBy.minSpeed)
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
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('audu', 300))
        emails.push(_createEmail('fiak', 120))
        emails.push(_createEmail('subali', 100))
        emails.push(_createEmail('mitsu', 150))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(vendor, maxSpeed = 250) {
    const email = getEmptyEmail(vendor, maxSpeed)
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