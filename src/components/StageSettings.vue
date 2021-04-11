<template lang="pug">
table.stage.stage--expanded(v-if='expanded')
    tr.stage__header
        td: span Stage {{ idx + 1 }} - Turn {{ stage.startTurn }}
        td.remove_btn_wrapper(v-if='idx !== 0')
            span.remove_btn(@click='$emit("removeStage")') -
        td.placeholder(v-else)
    tr(v-if='idx !== 0')
        td: span Start Turn
        td: input.number_input(type='number', v-model='stage.startTurn')
    tr
        td: span Initial Time
        td: TimeInput(v-model='stage.initialTime')
    tr
        td: span Increase per Turn
        td: TimeInput(v-model='stage.incrementPerTurn')
    tr
        td: span Fixed per Turn
        td: TimeInput(v-model='stage.fixedTimePerTurn')
.stage.stage--collapsed.stage__header(v-else)
    span.stage__header__title(@click='$emit("expandStage")')
        | Stage {{ idx + 1 }} - Turn {{ stage.startTurn }}
    span.remove_btn(@click='$emit("removeStage")', v-if='idx !== 0') -
</template>

<script>
import TimeInput from './TimeInput';

export default {
    name: 'StageSettings',
    props: ['stage', 'idx', 'expanded'],
    components: { TimeInput },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.stage
    width: $stage-settings-width
    box-sizing: border-box

.stage--expanded
    border: 1px solid $theme-colour
    border-collapse: collapse
    td
        padding: 5px

.stage--collapsed
    cursor: pointer
    display: flex
    justify-content: space-between

.stage__header, .placeholder
    background: $theme-colour
    color: $bg-colour

.stage__header__title
    flex-grow: 999
    padding: 5px
    &:hover
        text-decoration: underline

.stage--expanded .remove_btn_wrapper
    display: flex
    justify-content: flex-end
    padding: 0

.remove_btn
    cursor: pointer
    padding: 5px 10px
    &:hover
        background: $bg-colour
        color: $theme-colour

.stage--expanded .remove_btn
    margin-bottom: 1px

.stage--collapsed .remove_btn
    margin-right: 1px

.number_input
    background: transparent
    font-family: inherit
    font-size: inherit
    font-weight: inherit
    color: inherit
    width: 3ch
    border: 0
    outline: 0
    border-bottom: 1px solid $theme-colour
    -moz-appearance: textfield
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
        display: none
</style>
