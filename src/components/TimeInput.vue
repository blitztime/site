<template lang="pug">
.time_input
    DigitInput(v-model='tenHours', @input='onInput')
    DigitInput(v-model='hours', @input='onInput')
    | h
    DigitInput(:max='5', v-model='tenMinutes', @input='onInput')
    DigitInput(v-model='minutes', @input='onInput')
    | m
    DigitInput(:max='5', v-model='tenSeconds', @input='onInput')
    DigitInput(v-model='seconds', @input='onInput')
    | s
</template>

<script>
import { Duration } from 'luxon';
import DigitInput from './DigitInput';

export default {
    name: 'TimeInput',
    components: { DigitInput },
    data: function () {
        const hms = this.value
            .shiftTo('hours', 'minutes', 'seconds')
            .toObject();
        return {
            tenHours: Math.floor(hms.hours / 10),
            hours: hms.hours % 10,
            tenMinutes: Math.floor(hms.minutes / 10),
            minutes: hms.minutes % 10,
            tenSeconds: Math.floor(hms.seconds / 10),
            seconds: hms.seconds % 10,
        };
    },
    props: ['value'],
    methods: {
        onInput() {
            const next = document.activeElement.nextElementSibling;
            if (next) next.focus();
            this.$emit(
                'input',
                Duration.fromObject({
                    seconds: this.tenSeconds * 10 + this.seconds,
                    minutes: this.tenMinutes * 10 + this.minutes,
                    hours: this.tenHours * 10 + this.hours,
                })
            );
        },
    },
};
</script>
