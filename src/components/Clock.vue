<template lang="pug">
.clock(:class='"clock--" + size')
    span.numbers(v-if='hours') {{ hours }}:
    span.numbers {{ minutes }}:
    span.numbers {{ seconds }}
</template>

<script>
export default {
    name: 'TimeInput',
    props: ['value', 'size'],
    data: function () {
        const hms = this.value
            .shiftTo('hours', 'minutes', 'seconds')
            .toObject();
        return {
            hours: hms.hours ? hms.hours.toString().padStart(2, '0') : null,
            minutes: hms.minutes.toString().padStart(2, '0'),
            seconds: hms.seconds.toString().padStart(2, '0'),
        };
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.numbers
    height: 9vw
    transition: font-size 50ms

.clock--big > .numbers
    font-size: 9vw

.clock--medium > .numbers
    font-size: 7vw

.clock--small > .numbers
    font-size: 5vw
</style>
