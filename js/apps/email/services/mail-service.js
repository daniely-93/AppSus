import utilService from '../../../services/utils-service.js';

export default {
    addMail,
    getDir
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
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
    { id: 'nsSF02ax', from: 'benny@email.com', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 },
];

var sents = [
    { id: 'h2Js9bCa', to: 'benny@email.com', subject: 'Hello', body: 'Whats up?', sentAt: 1551133155101 }
]

var drafts = [];
var trash = [];

function addMail(from, subject, body, isRead, sentAt) {
    inbox.unshift({
        id: utilService.getRandomId(),
        from,
        subject,
        body,
        isRead,
        sentAt
    })
}

function getDir(dir) {
    return Promise.resolve(dir === 'inbox' ? inbox : dir === 'sents' ? sents : dir === 'drafts' ? drafts : dir === 'trash' ? trash : null);
}