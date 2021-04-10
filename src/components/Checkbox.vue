<template lang="pug">
label(:for='`checkbox-${_uid}`')
    input.hidden_checkbox(
        type='checkbox', v-model='inputValue', :id='`checkbox-${_uid}`'
        @input='$emit("input", $event.target.checked)')
    .input
</template>

<script>
export default {
    props: ['value'],
    data: function () {
        return {
            inputValue: this.value,
        };
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.input
    display: block
    width: 1rem
    height: 1rem
    border: 1px solid $theme-colour
    cursor: pointer
    position: relative
    &::after
        position: absolute
        left: 0
        right: 0
        content: '×'
        text-align: center
        font-size: 1.4rem
        line-height: 0.625

.hidden_checkbox:checked + .input
    background: $theme-colour
    &::after
        content: '✓'
        font-size: 0.9rem
        line-height: 1
        color: $bg-colour

.hidden_checkbox
    display: none
</style>
