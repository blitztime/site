<template lang="pug">
.side
    h2.title Player {{ number + 1 }}
        span.alert(v-if='side && !side.connected') !{' '}- Not Connected
        span.alert(v-if='userSide == number') !{' '}- You
    .side__timer(v-if='side')
        span.side__timer__title(v-if='!gameOver') Turn Timer
        Clock(
            :getValue='() => { return side.turnTimeRemaining() }',
            v-if='!gameOver')
        span.side__timer__title Game Timer
        Clock(
            :getValue='() => { return side.totalTimeRemaining() }',
            @timedOut='onTimeOut')
    .side__invite(v-else)
        h3.side__invite__title Not Joined
        p.side__invite__description This link can be used to join:
        Copyable(:content='link')
</template>

<script>
import Clock from './Clock';
import Copyable from './Copyable';

export default {
    name: 'TimerSide',
    components: { Clock, Copyable },
    props: ['side', 'number', 'userSide', 'gameOver'],
    data: function () {
        const timer = this.$route.params.id;
        return {
            link: `${window.location.origin}/t/${timer}/${this.number}`,
        };
    },
    methods: {
        onTimeOut() {
            if (this.userSide < 0) return;
            this.$emit('timedOut');
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.title
    color: $secondary-colour
    margin: 0
    margin-bottom: 0.5rem
    font-size: 1.2rem

.alert
    color: $theme-colour

.side
    border: 1px solid $theme-colour
    padding: 1rem
    margin: 1rem
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    &:not(:last-of-type)
        margin-right: 0

@media only screen and (max-width: 800px)
    .side
        width: auto
        &:not(:last-of-type)
            margin-right: 1rem
            margin-bottom: 0

.side__invite, .side__timer
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    flex-grow: 999
    width: 100%
    text-align: center

.side__invite__title
    margin: 0

.side__invite__description
    margin: 1rem
    text-align: center

.side__timer__title
    color: $secondary-colour
    margin: 0
    font-size: 1rem
</style>
