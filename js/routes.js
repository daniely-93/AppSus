import home from './pages/home.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import mailDetails from './apps/email/pages/email-details.cmp.js';
import mailList from './apps/email/components/email-list.cmp.js';
import missKeep from './apps/keeps/pages/miss-keep.cmp.js';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/mail',
        name: 'Main',
        component: emailApp,
        children: [
            {
                path: '/',
                name: 'MailList',
                component: mailList
            },
            {
                path: ':id',
                name: 'MailDetails',
                component: mailDetails,
                props: {}
            }
        ]

    },
    {
        path: '/notes',
        name: 'MissKeeps',
        component: missKeep
    }
]

const router = new VueRouter({ routes })

export default router;