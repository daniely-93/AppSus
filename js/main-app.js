import mainHeader from './components/app-header.cmp.js'
import router from './routes.js';

new Vue({
    router,
    el: '#root',
    template: `
    <main class="main">
        <main-header></main-header>
        <router-view></router-view>
    </main>`,
    components:{
        mainHeader
    }
})

Vue.config.productionTip = false;