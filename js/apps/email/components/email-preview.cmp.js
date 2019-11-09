import utilService from '../../../services/utils-service.js';
import { eventBus } from './../../../services/eventbus-service.js';

export default {
    props: ['mail'],
    template: `
    <div v-if="mail" class="mail-item-container" @click="toggleDetails">
        <div class="mail-item-mobile" :class="{'bg-lightgray' : showDetails }">
            <div class="mail-item-pic" :style="{'background-color' : randomColor}"><p>{{firstChar}}</p></div>
            <div v-if="mail" class="mail-item" :class="{bold : !mail.isRead}">
                <p class="mail-item-info from"><span @click.stop="sendEmit('toggleStar')" class="star" :class="{ starred : mail.isStarred }"><i class="fa fa-star"></i></span> {{senderName}}</p>
                <p class="mail-item-info subject">{{mail.subject}}</p>
                <p class="mail-item-info body">{{shortMessage}}</p>
                <p class="mail-item-info date">{{timeAsDate}}</p>
            </div>
        </div>
        <div v-if="showDetails" class="mail-preview" @click.stop.prevent="">
            <div class="mail-preview-top">
                <h2>{{mail.subject}}</h2>
                <div class="action-buttons">
                    <button @click="showMoreOpts = !showMoreOpts"><i class="fa fa-ellipsis-v"></i></button>
                    <router-link :to="'/mail/' + mail.id"><i class="fa fa-expand"></i></router-link>
                    <button @click="sendEmit('deleteMail'); toggleDetails()"><i class="fa fa-trash"></i></button>
                    <button v-if="mail.deletedFrom" @click="sendEmit('recoverMail')"><i class="fa fa-undo"></i></button>
                </div>
            </div>
            <div class="mail-preview-content">
                <div>
                    <p><span class="bold">{{senderName}}</span>  <{{fullSenderName}}></p>
                    <p class="mail-preview-body">{{mail.body}}</p>
                </div>
                <div v-if="showMoreOpts" class="opts-menu">
                    <button class="opts-menu-item" @click="reply('reply')"><i class="fa fa-reply"></i> Reply</button>
                    <button class="opts-menu-item" @click="mark(true)"><i class="fa fa-envelope-open"></i> Mark as Read</button>
                    <button class="opts-menu-item" @click="mark(false)"><i class="fa fa-envelope"></i> Mark as Unread</button>
                    <button class="opts-menu-item" @click="sendEmit('toggleStar'); toggleOptions()"><i class="fa fa-star"></i> Star</button>
                    <button class="opts-menu-item"><i class="fa fa-map-pin"></i> Pin</button>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            showDetails: false,
            showMoreOpts: false,
        }
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
            if (!this.mail.isRead) this.mail.isRead = true;
        },
        toggleOptions() {
            this.showMoreOpts = !this.showMoreOpts;
        },
        sendEmit(emit) {
            eventBus.$emit(emit, this.mail.id);
        },
        reply(type) {
            let copyMail = { ...this.mail }
            copyMail.to = copyMail.from;
            if (type === 'forward') copyMail.to = null;
            copyMail.subject = (type === 'forward' ? 'Fw: ' : 'Re: ') + copyMail.subject;
            copyMail.body = `\n\n\n${copyMail.from} Said on ${this.timeAsDate}:\n"${copyMail.body}"`
            eventBus.$emit('replyMail', copyMail);
            this.toggleOptions();
        },
        mark(isRead) {
            if (!isRead) this.toggleDetails();
            this.mail.isRead = isRead;
            this.toggleOptions();
        },
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
        randomColor() {
            return utilService.getRandomColor();
        }
    },
}