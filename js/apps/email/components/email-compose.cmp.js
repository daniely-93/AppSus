export default {
    template:
        `<div class="form-send">
        <div class="form-title">
            <h3>New Message</h3>
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
            <button class="button" @click="sendMail">Send</button>
            <button class="btn-trash" @click="resetFormData"><i class="fa fa-trash" aria-hidden="true"></i></button>
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
        },
        sendMail(){
            this.$emit('sendMail', this.formInput);
        }
    }
}