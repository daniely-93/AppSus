import Home from './pages/home.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/mail',
        name: 'Main',
        component: emailApp
    }
]

const router = new VueRouter({ routes })

export default router;