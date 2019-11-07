import utilService from '../../../services/utils-service.js';

export default {
    props: ['mail'],
    template: `
    <div class="mail-item-container" @click="toggleDetails">
        <div class="mail-item-mobile" :class="{'bg-lightgray' : showDetails }">
            <div class="mail-item-pic" :style="{'background-color' : randomColor}"><p>{{firstChar}}</p></div>
            <div v-if="mail" class="mail-item" :class="{bold : !mail.isRead}">
                <p class="mail-item-info from">{{senderName}}</p>
                <p class="mail-item-info subject">{{mail.subject}}</p>
                <p class="mail-item-info body">{{shortMessage}}</p>
                <p class="mail-item-info date">{{timeAsDate}}</p>
            </div>
        </div>
        <div v-if="showDetails" class="mail-preview">
        <div class="mail-preview-top">
            <h2>{{mail.subject}}</h2>
            <div class="action-buttons">
                <button><i class="fa fa-trash"></i></button>
                <router-link :to="'/mail/' + mail.id"><i class="fa fa-expand"></i></router-link>
            </div>
        </div>
        <div class="mail-preview-content">
            <p><span class="bold">{{senderName}}</span>  <{{fullSenderName}}></p>
            <p class="mail-preview-body">{{mail.body}}</p>
        </div>
    </div>
    </div>`,
    data() {
        return {
            showDetails: false
        }
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        }
    },
    computed: {
        timeAsDate() {
            return new Date(this.mail.sentAt).toLocaleTimeString();
        },
        senderName() {
            return this.mail.from ? this.mail.from.substring(0, this.mail.from.indexOf('@')) :
                this.mail.to.substring(0, this.mail.to.indexOf('@'));
        },
        shortMessage() {
            return this.mail.body.substring(0, 30) + '...';
        },
        fullSenderName() {
            return this.mail.from ? this.mail.from :
                this.mail.to;
        },
        firstChar() {
            return this.mail.from ? this.mail.from.charAt(0) :
                this.mail.to.charAt(0);
        },
        randomColor(){
            return utilService.getRandomColor();
        }
    }
}