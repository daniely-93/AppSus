import Home from './pages/home.cmp.js'
import MainMail from './apps/email/pages/main.cmp.js'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/mail',
        name: 'Main',
        component: MainMail
    }
]

const router = new VueRouter({ routes })

export default router;