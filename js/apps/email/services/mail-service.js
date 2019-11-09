import utilService from '../../../services/utils-service.js';

export default {
    sendMail,
    getDir,
    saveMail,
    getMailById,
    deleteMail,
    recoverMail,
    toggleStar
}

var inbox = [
    { id: 'Ab67Cgo9', from: 'daniel@email.com', to: 'daniel@daniel.com', subject: 'Wassap with Vue?', body: 'May I', isRead: false, isStarred: false, sentAt: 1551133930594 },
    { id: 'nsSF0291', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: false, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSF929x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSF129x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSF059x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: false, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSF029x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSs029x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: false, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSFss9x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'nsSFhh9x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'gEZEm6FU', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'FCCI0kQ9', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: '9EqnblUA', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: false, isStarred: false, sentAt: 1551133955660 },
    { id: 'adOXaE1M', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: false, isStarred: false, sentAt: 1551133955660 },
    { id: 'BpVInpaf', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'fVfyvHZx', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'uyYktJIV', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'pnmywxlX', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: '9sbuooey', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: '6lLLtCxW', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: false, isStarred: false, sentAt: 1551133955660 },
    { id: 'XF1f2P3x', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: '77ktzUVB', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'qGsThMtx', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'TAakpERn', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'lazqIxKe', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'kHQC9kCW', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
    { id: 'sWH9eRel', from: 'benny@email.com', to: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133955660 },
];

var sent = [
    { id: 'h2Js9bCa', to: 'benny@email.com', from: 'daniel@daniel.com', subject: 'Hello', body: 'Whats up?', isRead: true, isStarred: false, sentAt: 1551133155101 }
]

var drafts = [];
var trash = [];
var starred = [];

function getMailById(id) {
    return new Promise(resolve => {
        let resMail = inbox.filter(mail => mail.id === id)
        if (!resMail.length) resMail = sent.filter(mail => mail.id === id)
        if (!resMail.length) resMail = trash.filter(mail => mail.id === id)
        resolve(resMail[0]);
    })
}

function toggleStar(id) {
    return new Promise(resolve => {
        let mail = inbox.find(mail => mail.id === id)
        if (!mail) mail = sent.find(mail => mail.id === id)
        if (!mail) mail = trash.find(mail => mail.id === id)
        if(mail.isStarred){
            let starredIdx = starred.findIndex(resMail => resMail.id === mail.id);
            mail.isStarred = false;
            starred.splice(starred[starredIdx], 1);
            return;
        }
        if(mail.deletedFrom) return;
        mail.isStarred = true;
        resolve(starred.unshift(mail));
    })
}

function deleteMail(dir, id) {
    return getDir(dir).then(arr => {
        if (arr === inbox || arr === sent) {
            let mail = arr.find(mail => mail.id === id);
            mail.deletedFrom = dir;
            trash.unshift(mail);
        }
        let mailIdx = arr.findIndex(mail => mail.id === id);
        arr.splice(mailIdx, 1);
        toggleStar(id);
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