import mainHeader from './components/app-header.cmp.js'
import router from './routes.js';

new Vue({
    router,
    el: '#root',
    template: `
    <main class="main">
        <main-header></main-header>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </main>`,
    components:{
        mainHeader
    }
})

Vue.config.productionTip = false;