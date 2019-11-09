import { eventBus } from '../../../services/eventbus-service.js';

export default {
    props: ['mailTemplate'],
    template:
        `<div class="form-send">
        <div class="form-title">
            <h3>New Message</h3>
            <button class="btn-close" @click="toggleCompose">X</button>
        </div>
        <div class="form-content">
            <div class="input-group">
                <span>To:</span>
                <input type="email" v-model="formInput.to" />
            </div>
            <div class="input-group">
                <span>Cc:</span>
                <input type="text" v-model="formInput.cc" />
            </div>
            <div class="input-group">
                <span>Bcc:</span>
                <input type="text" v-model="formInput.bcc" />
            </div>
            <div class="input-group">
                <span>Subject:</span>
                <input type="text" v-model="formInput.subject" />
            </div>
            <textarea type="text" v-model="formInput.body" />
        </div>
        <div class="form-buttons">
            <button class="button btn-search" @click="sendMail"><i class="fa fa-paper-plane"></i> Send</button>
            <button class="btn-trash" @click="resetFormData"><i class="fa fa-trash"></i></button>
        </div>
    </div>`,
    data() {
        return {
            formInput: {
                to: '',
                cc: '',
                bcc: '',
                subject: '',
                body: ''
            }
        }
    },
    methods: {
        resetFormData() {
            this.formInput = {
                to: '',
                cc: '',
                bcc: '',
                subject: '',
                body: ''
            };
            this.toggleCompose();
        },
        sendMail() {
            this.$emit('sendMail', this.formInput);
        },
        toggleCompose(){
            eventBus.$emit('toggleCompose');
        }
    },
    created() {
        if (this.mailTemplate) {
            this.formInput = this.mailTemplate;
        }
    }
}