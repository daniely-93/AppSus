export default {
    props: ['mail'],
    template : `
    <div class="mail-item">
        <p class="mail-item-info from">{{mail.from}}</p>
        <p class="mail-item-info subject">{{mail.subject}}</p>
        <p class="mail-item-info body">{{mail.body}}</p>
        <p class="mail-item-info date">{{timeAsDate}}</p>
    </div>`,
    computed : {
        timeAsDate(){
            return new Date(this.mail.sentAt).toLocaleTimeString();
        }
    }
}