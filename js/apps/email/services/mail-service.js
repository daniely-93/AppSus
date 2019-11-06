export default {
    getMails,
    addMail
}

var mails = [
    { from: 'Daniel', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: 1551133930594 },
    { from: 'Benny', subject: 'Hello', body: 'Whats up?', isRead: true, sentAt: 1551133955660 }
];

function addMail(from, subject, body, isRead, sentAt) {
    mails.unshift({
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