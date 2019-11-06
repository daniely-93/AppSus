import Header from './components/app-header.cmp.js'
import router from './routes.js';

new Vue({
    router,
    el: '#root',
    template: `
    <main>
        <Header/>
    </main>`,
    components:{
        Header
    }
})

Vue.config.productionTip = false;