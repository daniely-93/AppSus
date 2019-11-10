import utilService from '../../../services/utils-service.js';
import { eventBus } from './../../../services/eventbus-service.js';

export default {
    props: ['mail'],
    template: `
    <div v-if="mail" class="mail-item-container" @click="toggleDetails">
        <div class="mail-item-mobile" :class="{'bg-lightgray' : showDetails, bold : !mail.isRead}" @mouseover="showHoverDelete = true" @mouseleave="showHoverDelete = false">
            <div class="mail-item-pic" :style="{'background-color' : randomColor}"><p>{{firstChar}}</p></div>
            <div v-if="mail" class="mail-item">
                <p class="mail-item-info from"><span @click.stop="toggleStar" class="star" :class="{ starred : mail.isStarred }"><i class="fa fa-star"></i></span> {{senderName}}</p>
                <p class="mail-item-info subject">{{mail.subject}}</p>
                <p class="mail-item-info body">{{messageBody}}</p>
                <p class="mail-item-info date" v-show="!showHoverDelete || showDetails">{{timeAsDate}}</p>
                <div class="on-hover-menu" v-show="showHoverDelete && !showDetails">
                    <button class="btn-menu-hover" @click.stop="reply('reply')"><i class="fa fa-reply"></i></button>
                    <button class="btn-menu-hover" @click.stop="mark(true, false)"><i class="fa fa-envelope-open"></i></button>
                    <button class="btn-menu-hover" @click.stop="mark(false, false)"><i class="fa fa-envelope"></i></button>
                    <button class="btn-menu-hover"><i class="fa fa-thumbtack"></i></button>
                    <button class="btn-menu-hover" @click.stop.stop="sendEmit('deleteMail'); toggleDetails()"><i class="fa fa-trash"></i></button>
                    <button class="btn-menu-hover" v-if="mail.deletedFrom" @click.stop.stop="sendEmit('recoverMail')"><i class="fa fa-undo"></i></button>
                </div>
            </div>
        </div>
        <transition name="bounce">
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
                <div class="mail-content">
                    <p><span class="bold">{{senderName}}</span>  <{{fullSenderName}}></p>
                    <p class="mail-preview-body">{{mail.body}}</p>
                </div>
                
                <transition name="fade">
                    <div v-if="showMoreOpts" class="opts-menu">
                        <button class="opts-menu-item" @click="reply('reply')"><i class="fa fa-reply"></i> Reply</button>
                        <button class="opts-menu-item" @click="mark(true)"><i class="fa fa-envelope-open"></i> Mark as Read</button>
                        <button class="opts-menu-item" @click="mark(false)"><i class="fa fa-envelope"></i> Mark as Unread</button>
                        <button class="opts-menu-item" @click="toggleStar; toggleOptions()"><i class="fa fa-star"></i> Star</button>
                        <button class="opts-menu-item"><i class="fa fa-thumbtack"></i> Pin</button>
                    </div>
                </transition>
            </div>
        </div>
        </transition>
    </div>`,
    data() {
        return {
            showDetails: false,
            showMoreOpts: false,
            showHoverDelete: false
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
        toggleStar() {
            eventBus.$emit('toggleStar', this.mail.id);
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
        mark(isRead, toggle = true) {
            if (!isRead && toggle) this.toggleDetails();
            this.mail.isRead = isRead;

            if (toggle) this.toggleOptions();
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
        messageBody() {
            return this.mail.body.length > 75 ? this.mail.body.substring(0, 75) + '...' : this.mail.body;
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