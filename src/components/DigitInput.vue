<template lang="pug">
input.input(
    type='number', :max='max', v-model.number='inputValue',
    @keydown='update')
</template>

<script>
export default {
    name: 'DigitInput',
    props: {
        value: Number,
        max: {
            type: Number,
            default: 9,
        },
    },
    data: function () {
        return {
            inputValue: this.value,
        };
    },
    methods: {
        update($event) {
            const keyCode = $event.keyCode ? $event.keyCode : $event.which;
            let number;
            if (keyCode >= 48 && keyCode <= 48 + this.max) {
                number = keyCode - 48;
            } else if (keyCode >= 96 && keyCode <= 96 + this.max) {
                number = keyCode - 96;
            } else {
                $event.preventDefault();
                return;
            }
            this.inputValue = number;
            this.$emit('input', number);
            $event.preventDefault();
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.input
    width: 1ch
    font-family: inherit
    font-size: inherit
    font-weight: inherit
    background: $theme-colour
    color: $bg-colour
    border: 0
    caret-color: transparent
    -moz-appearance: textfield
    &:focus
        background: $bg-colour
        color: $theme-colour
        outline: 0
        animation: blink 1s linear 0s infinite
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
        display: none

@keyframes blink
    0%
        background: $bg-colour
        color: $theme-colour
    50%
        background: $bg-colour
        color: $theme-colour
    51%
        background: $theme-colour
        color: $bg-colour
    100%
        background: $theme-colour
        color: $bg-colour
</style>
