import utilService from '../../../services/utils-service.js';

export default {
    sendMail,
    getDir,
    saveMail
}

var inbox = [
    { id: 'Ab67Cgo9', from: 'daniel@email.com', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: 1551133930594 },
    { id: 'nsSF0291', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF029x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF129x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: false, sentAt: 1551133955660 },
    { id: 'nsSF059x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF029x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSs029x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: false, sentAt: 1551133955660 },
    { id: 'nsSFss9x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: false, sentAt: 1551133955660 },
    { id: 'nsSFhh9x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'gEZEm6FU', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'FCCI0kQ9', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: '9EqnblUA', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'adOXaE1M', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'BpVInpaf', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'fVfyvHZx', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'uyYktJIV', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'pnmywxlX', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: '9sbuooey', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: '6lLLtCxW', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'XF1f2P3x', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: '77ktzUVB', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'qGsThMtx', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'TAakpERn', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'lazqIxKe', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'kHQC9kCW', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'sWH9eRel', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
];

var sents = [
    { id: 'h2Js9bCa', to: 'benny@email.com', subject: 'Hello', body: 'Whats up?', sentAt: 1551133155101 }
]

var drafts = [];
var trash = [];

function sendMail(mail) {
    let id = utilService.getRandomId();
    let { to, subject, body, sentAt } = mail;
    sents.unshift({
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
        resolve(sents[0])
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
}

function getDir(dir) {
    return Promise.resolve(dir === 'inbox' ? inbox : dir === 'sents' ? sents : dir === 'drafts' ? drafts : dir === 'trash' ? trash : null);
}