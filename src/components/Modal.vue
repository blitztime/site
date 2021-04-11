<template lang="pug">
transition(name='modal_transition')
    .modal_wrapper(v-if='showIf')
        .modal
            slot
</template>

<script>
export default {
    name: 'Modal',
    props: ['showIf'],
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.modal_transition-enter, .modal_transition-leave-to
    opacity: 0
    .modal
        transform: scale(0.8)

.modal_transition-enter-active, .modal_transition-leave-active
    transition: opacity 200ms
    .modal
        transition: transform 200ms

.modal_transition-enter-to, .modal_transition-leave-from
    opacity: 1
    .modal
        transform: scale(1)

.modal_wrapper
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    z-index: 10
    background: $modal-mask
    display: flex
    align-items: center
    justify-content: center

.modal
    background: $bg-colour
    padding: 1rem
    max-width: calc(100vw - 10rem)
</style>
