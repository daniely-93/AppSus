import { eventBus } from '../services/eventbus-service.js';

export default {
    template: `
        <section class="user-msg" v-if="msg">
            <div class="msg-content" :class="msg.type">
                <div class="msg-text">
                    <p>{{msg.txt}}</p>
                    <button @click="close" class="close-btn">x</button>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('show-msg', msg => {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, msg.duration || 2000)
        })
    },
    methods: {
        close() {
            this.msg = null;
        }
    }
}