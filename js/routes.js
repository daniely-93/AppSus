import home from './pages/home.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import mailDetails from './apps/email/pages/email-details.cmp.js';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/mail',
        name: 'Main',
        component: emailApp
    },
    {
        path: '/mail/:id',
        name: 'MailDetails',
        component: mailDetails
    }
]

const router = new VueRouter({ routes })

export default router;