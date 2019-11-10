import utilService from '../../../services/utils-service.js';

const MAILS_KEY = 'mails';

export default {
    sendMail,
    getDir,
    saveMail,
    getMailById,
    deleteMail,
    recoverMail,
    toggleStar
}



var mailbox = {
    inbox: [],
    sent: [
        { id: 'h2Js9bCa', to: 'benny@email.com', from: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133155101 }
    ],
    starred: [],
    drafts: [],
    trash: []
}

mailbox = _createMailbox();
_saveMailbox();

function _createMailbox() {
    let currMailbox = _loadMailbox();
    console.log(currMailbox);
    if (currMailbox && currMailbox.inbox.length) return currMailbox;
    currMailbox = {
        inbox: [],
        sent: [],
        starred: [],
        drafts: [],
        trash: []
    }
    for (let i = 0; i < 25; i++) {
        let currMail = _createMail();
        currMailbox.inbox.push(currMail);
        if (currMail.isStarred) currMailbox.starred.push(currMail);
    }
    return currMailbox;
}

function getMailById(id) {
    return new Promise(resolve => {
        let resMail = mailbox.inbox.filter(mail => mail.id === id)
        if (!resMail.length) resMail = mailbox.sent.filter(mail => mail.id === id)
        if (!resMail.length) resMail = mailbox.trash.filter(mail => mail.id === id)
        resolve(resMail[0]);
    })
}

function toggleStar(id) {
    return new Promise(resolve => {
        let mail = mailbox.inbox.find(mail => mail.id === id)
        if (!mail) mail = mailbox.sent.find(mail => mail.id === id)
        if (!mail) mail = mailbox.trash.find(mail => mail.id === id)
        if (mail.isStarred) {
            let starredIdx = mailbox.starred.findIndex(resMail => resMail.id === mail.id);
            mail.isStarred = false;
            mailbox.starred.splice(mailbox.starred[starredIdx], 1);
            return;
        }
        if (mail.deletedFrom) return;
        mail.isStarred = true;
        _saveMailbox();
        resolve(mailbox.starred.unshift(mail));
    })
}

function deleteMail(dir, id) {
    return getDir(dir).then(arr => {
        if (arr === mailbox.inbox || arr === mailbox.sent) {
            let mail = arr.find(mail => mail.id === id);
            mail.deletedFrom = dir;
            mailbox.trash.unshift(mail);
        }
        let mailIdx = arr.findIndex(mail => mail.id === id);
        // toggleStar(id);
        arr.splice(mailIdx, 1);
        _saveMailbox();
    })
}

function recoverMail(id) {
    let deletedMail = mailbox.trash.find(mail => mail.id === id);
    return getDir(deletedMail.deletedFrom).then(arr => {
        delete deletedMail.deletedFrom
        arr.unshift(deletedMail);
        let mailIdx = mailbox.trash.findIndex(mail => mail.id === id);
        mailbox.trash.splice(mailIdx, 1);
        _saveMailbox();
    })
}

function sendMail(mail) {
    let id = utilService.getRandomId();
    let { to, subject, body, sentAt } = mail;
    mailbox.sent.unshift({
        id,
        to,
        subject,
        body,
        isRead: true,
        sentAt
    })

    mailbox.inbox.unshift({
        id,
        to,
        subject,
        body,
        isRead: false,
        sentAt
    })
    _saveMailbox();
    return new Promise((resolve, reject) => {
        resolve(mailbox.sent[0])
        reject(null)
    })
}

function saveMail(mail) {
    let { to, subject, body, sentAt } = mail;
    mailbox.drafts.unshift({
        to,
        subject,
        body,
        isRead: true,
        sentAt
    })
    return Promise.resolve(true);
}

function getDir(dir) {
    return Promise.resolve(dir === 'inbox' ? mailbox.inbox : dir === 'sent' ? mailbox.sent : dir === 'drafts' ? mailbox.drafts : dir === 'trash' ? mailbox.trash : dir === 'starred' ? mailbox.starred : null);
}

function _createMail() {
    return {
        id: utilService.getRandomId(),
        from: 'daniel@email.com',
        to: 'daniel@email.com',
        subject: utilService.getRandomColor().substring(1),
        body: utilService.getRandomSentence(),
        isRead: Math.random() >= 0.5,
        isStarred: Math.random() >= 0.5,
        sentAt: 1551133900000 + Math.floor(Math.random() * 100000)
    }
}

function _saveMailbox() {
    utilService.saveToStorage(MAILS_KEY, mailbox)
}

function _loadMailbox() {
    return utilService.loadFromStorage(MAILS_KEY);
}