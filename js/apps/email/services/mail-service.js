import utilService from '../../../services/utils-service.js';

export default {
    getMails,
    addMail
}

var mails = [
    { id:'Ab67Cgo9' , from: 'Daniel', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: 1551133930594 },
    { id:'nsSF029x', from: 'Benny', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 }
];

function addMail(from, subject, body, isRead, sentAt) {
    mails.unshift({
        id: utilService.getRandomId(),
        from,
        subject,
        body,
        isRead,
        sentAt
    })
}

function getMails(){
    return Promise.resolve(mails);
}