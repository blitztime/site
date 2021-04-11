<template lang="pug">
.clock
    .digit_wrapper(v-if='parts.showHours'): transition(name='spin')
        span.digit(:key='`${_uid}-${parts.tenHours}th`') {{ parts.tenHours }}
    .digit_wrapper(v-if='parts.showHours'): transition(name='spin')
        span.digit(:key='`${_uid}-${parts.hours}h`') {{ parts.hours }}
    span.digit(v-if='parts.showHours') :
    .digit_wrapper: transition(name='spin')
        span.digit(:key='`${_uid}-${parts.tenMinutes}tm`')
            | {{ parts.tenMinutes }}
    .digit_wrapper: transition(name='spin')
        span.digit(:key='`${_uid}-${parts.minutes}m`') {{ parts.minutes }}
    span.digit :
    .digit_wrapper: transition(name='spin')
        span.digit(:key='`${_uid}-${parts.tenSeconds}ts`')
            | {{ parts.tenSeconds }}
    .digit_wrapper: transition(name='spin')
        span.digit(:key='`${_uid}-${parts.seconds}s`') {{ parts.seconds }}
</template>

<script>
import { Duration } from 'luxon';

export default {
    name: 'Clock',
    props: ['getValue'],
    mounted() {
        this.$options.updater = window.setInterval(this.forceUpdate, 1000);
    },
    beforeDestroy() {
        window.clearInterval(this.$options.updater);
    },
    data: function () {
        return {
            value: this.getValue(),
        };
    },
    computed: {
        parts() {
            const hms = this.value
                .shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
                .toObject();
            return {
                showHours: hms.hours !== 0,
                tenHours: Math.floor(hms.hours / 10),
                hours: hms.hours % 10,
                tenMinutes: Math.floor(hms.minutes / 10),
                minutes: hms.minutes % 10,
                tenSeconds: Math.floor(hms.seconds / 10),
                seconds: hms.seconds % 10,
            };
        },
    },
    methods: {
        forceUpdate() {
            const value = this.getValue();
            if (value < Duration.fromMillis(0)) {
                this.$emit('timedOut');
                this.value = Duration.fromMillis(0);
            } else {
                this.value = value;
            }
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.clock
    width: 100%
    display: flex
    justify-content: center

.digit
    font-size: 9vw

.spin-enter-active, .spin-leave-active
    transition: transform 250ms

.spin-leave-to, .spin-enter-to
    transform: translateY(-1.25em)

.spin-enter
    transform: translateY(1.25em)

.digit_wrapper
    height: 11.25vw
    overflow-y: hidden
    display: flex
    flex-direction: column
</style>
