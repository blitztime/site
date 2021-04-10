<template lang="pug">
main.timer
    h1.title(v-if='timer.turnNumber >= 0')
        | Turn {{ Math.floor(timer.turnNumber / 2) }}
    h1.title(v-else) Not Started
    .sides
        TimerSide(:side='timer.home', :number='0', :isUser='side === 0')
        TimerSide(:side='timer.away', :number='1', :isUser='side === 1')
    span {{ timer.observers }} observers
    span This link can be used to observe:
    Copyable(:content='link')
</template>

<script>
import { getConnection, getSide } from '../js/utils';
import TimerSide from '../components/TimerSide';
import Copyable from '../components/Copyable';

export default {
    name: 'Timer',
    components: { TimerSide, Copyable },
    data() {
        const socket = getConnection(this.$route.params.id);
        socket.addListener('error', this.onError);
        socket.addListener('state_update', this.onState);
        socket.connect();
        const timer = this.$route.params.id;
        const side = getSide(timer);
        return {
            socket: socket,
            timer: {
                home: null,
                away: null,
                observers: 0,
                turnNumber: 0,
            },
            side: side,
            link: `${window.location.origin}/t/${timer}`,
        };
    },
    beforeRouteUpdate(to, from, next) {
        this.socket.connect();
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.socket.disconnect();
        next();
    },
    methods: {
        onError(error) {
            // TODO: Display the error.
            console.log(error);
        },
        onState(timer) {
            this.timer = timer;
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.timer
    display: flex
    flex-direction: column
    align-items: center
    padding-bottom: 1rem
    box-sizing: border-box

.title
    color: $secondary-colour
    margin: 0
    margin-top: 1rem
    font-size: 1.5rem

.sides
    display: flex
    width: 100%
    flex-grow: 999

@media only screen and (max-width: 800px)
    .sides
        flex-direction: column
</style>
