import utilService from '../../../services/utils-service.js';

export default {
    sendMail,
    getDir,
    saveMail,
    getMailById,
    deleteMail,
    recoverMail,
}

var inbox = _createInbox();

var sent = [
    { id: 'h2Js9bCa', to: 'benny@email.com', from: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133155101 }
]

var drafts = [];
var trash = [];
// var starred = [];

function _createInbox() {
    let inbox = []
    for (let i = 0; i < 25; i++) inbox.push(_createMail());
    return inbox;
}

function getMailById(id) {
    return new Promise(resolve => {
        let resMail = inbox.filter(mail => mail.id === id)
        if (!resMail.length) resMail = sent.filter(mail => mail.id === id)
        if (!resMail.length) resMail = trash.filter(mail => mail.id === id)
        resolve(resMail[0]);
    })
}

// function toggleStar(id) {
//     return new Promise(resolve => {
//         let mail = inbox.find(mail => mail.id === id)
//         if (!mail) mail = sent.find(mail => mail.id === id)
//         if (!mail) mail = trash.find(mail => mail.id === id)
//         if (mail.isStarred) {
//             let starredIdx = starred.findIndex(resMail => resMail.id === mail.id);
//             mail.isStarred = false;
//             starred.splice(starred[starredIdx], 1);
//             return;
//         }
//         if (mail.deletedFrom) return;
//         mail.isStarred = true;
//         resolve(starred.unshift(mail));
//     })
// }

function deleteMail(dir, id) {
    return getDir(dir).then(arr => {
        if (arr === inbox || arr === sent) {
            let mail = arr.find(mail => mail.id === id);
            mail.deletedFrom = dir;
            trash.unshift(mail);
        }
        let mailIdx = arr.findIndex(mail => mail.id === id);
        // toggleStar(id);
        arr.splice(mailIdx, 1);
    })
}

function recoverMail(id) {
    let deletedMail = trash.find(mail => mail.id === id);
    return getDir(deletedMail.deletedFrom).then(arr => {
        delete deletedMail.deletedFrom
        arr.unshift(deletedMail);
        let mailIdx = trash.findIndex(mail => mail.id === id);
        trash.splice(mailIdx, 1);
    })
}

function sendMail(mail) {
    let id = utilService.getRandomId();
    let { to, subject, body, sentAt } = mail;
    sent.unshift({
        id,
        to,
        subject,
        body,
        isRead: true,
        sentAt
    })

    inbox.unshift({
        id,
        to,
        subject,
        body,
        isRead: false,
        sentAt
    })
    return new Promise((resolve, reject) => {
        resolve(sent[0])
        reject(null)
    })
}

function saveMail(mail) {
    let { to, subject, body, sentAt } = mail;
    drafts.unshift({
        to,
        subject,
        body,
        isRead: true,
        sentAt
    })
    return Promise.resolve(true);
}

function getDir(dir) {
    return Promise.resolve(dir === 'inbox' ? inbox : dir === 'sent' ? sent : dir === 'drafts' ? drafts : dir === 'trash' ? trash : dir === 'starred' ? starred : null);
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