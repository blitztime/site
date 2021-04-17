/* eslint-disable no-console */
import { register } from 'register-service-worker';
import { notify } from './js/utils';

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                    'For more details, visit https://goo.gl/AFskqB'
            );
        },
        registered() {
            console.log('Service worker has been registered.');
        },
        cached() {
            console.log('Content has been cached for offline use.');
        },
        updatefound() {
            notify({
                title: 'Downloading Update',
                message: 'Blitz.Red update is currently downloading...',
                iconChar: 'i',
                important: true,
            });
            console.log('New content is downloading.');
        },
        updated() {
            notify({
                title: 'Update Available',
                message: 'Please reload the page to update.',
                iconChar: 'X',
                important: true,
            });
        },
        offline() {
            notify({
                title: 'Connection lost!',
                message:
                    'Blitz.Red cannot function properly without an Internet connection',
                iconChar: 'X',
                important: true,
            });
        },
        error(error) {
            notify({
                title: 'Internal Error',
                message: error.toString(),
                iconChar: 'E',
                important: true,
            });
        },
    });
}
