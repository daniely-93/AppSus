import mainHeader from './components/app-header.cmp.js'
import router from './routes.js';
import userMsg from './components/user-msg.cmp.js';

new Vue({
    router,
    el: '#root',
    template: `
    <main class="main">
    <transition name="slide-fade">
    <user-msg></user-msg>
    </transition>
        <main-header></main-header>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </main>`,
    components: {
        mainHeader,
        userMsg
    }
})

Vue.config.productionTip = false;