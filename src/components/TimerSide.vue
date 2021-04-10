<template lang="pug">
.side
    h2.title Player {{ number + 1 }}
        span.alert(v-if='side && !side.connected') !{' '}- Not Connected
        span.alert(v-if='isUser') !{' '}- You
    .side__timer(v-if='side')
        span.side__timer__title Turn Timer
        Clock(
            :value='side.turnTimeRemaining',
            :size='side.isTurn ? (side.turnTimeRemaining ? "big" : "small") : "medium"')
        span.side__timer__title Game Timer
        Clock(
            :value='side.totalTimeRemaining',
            :size='side.isTurn ? (side.turnTimeRemaining ? "small" : "big") : "medium"')
    .side__invite(v-else)
        h3.side__invite__title Not Joined
        p.side__invite__description This link can be used to join:
        Copyable(:content='link')
</template>

<script>
import Clock from './Clock';
import Copyable from './Copyable';

export default {
    components: { Clock, Copyable },
    props: ['side', 'number', 'isUser'],
    data: function () {
        const timer = this.$route.params.id;
        return {
            link: `${window.location.origin}/t/${timer}/${this.number}`,
        };
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
