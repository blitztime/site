<template lang="pug">
main.intro
    img.logo(src='/img/logo.svg')
    h1.header Blitz.Red
    h2.subheader The live online game timer for competitive 1v1s
    router-link.button(to='/create') Create a Timer
    p.status
        | {{ stats.ongoingTimers }} ongoing timers &bull;
        | {{ stats.allTimers }} all time &bull;
        | {{ stats.connected }} people online
</template>

<script>
import { HttpClient } from 'blitztime';

const client = new HttpClient('http://api.blitz.red');

export default {
    name: 'Home',
    data() {
        return {
            stats: {
                ongoingTimers: '?',
                allTimers: '?',
                connected: '?',
            },
        };
    },
    created() {
        client.getStats().then((stats) => {
            this.stats = stats;
        });
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.intro
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

.logo
    width: 10rem

.header
    font-weight: 400
    margin: 0.2rem

.subheader
    font-weight: 300
    margin: 0.2rem
    text-align: center
    &:after
        content: '_'
        display: inline-block
        width: 1ch
        animation: cursor_blink 1s linear 0s infinite

@keyframes cursor_blink
    0%
        content: '_'
    60%
        content: ' '

.button
    background: $theme-colour
    color: $bg-colour
    padding: 5px 10px
    transition: padding 50ms
    margin: 0.5rem
    &:after
        content: ' →'
        margin-left: -5px
        margin-right: 5px
        transition: margin 50ms
    &:hover:after
        margin: 0

.status
    margin: 0.5rem
    font-weight: 400
    text-align: center
</style>
