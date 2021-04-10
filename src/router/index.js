import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Create from '../views/Create.vue';
import Timer from '../views/Timer.vue';
import { HttpClient } from 'blitztime';
import { storeConnection } from '../js/utils';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/create', name: 'Create', component: Create },
        { path: '/timer/:id', name: 'Timer', component: Timer },
        {
            path: '/t/:id/:side?',
            name: 'JoinLink',
            async beforeEnter(to, from, next) {
                const id = Number.parseInt(to.params.id);
                if (!id) return next({ name: 'Not Found' });
                let side = to.params.side;
                if (!['0', '1', undefined].includes(side)) {
                    return next({ name: 'Not Found' });
                }
                const client = new HttpClient('https://api.blitz.red');
                const timer = await client.getTimer(id);
                if (!timer) return next({ name: 'Not Found' });
                if (to.params.side === '0' && timer.home) {
                    side = undefined;
                } else if (to.params.side === '1' && timer.away) {
                    side = undefined;
                }
                if (side !== undefined) {
                    const creds = await client.joinTimer(
                        id,
                        Number.parseInt(side)
                    );
                    storeConnection(creds, side);
                }
                next({ path: `/timer/${id}` });
            },
        },
    ],
});

export default router;
