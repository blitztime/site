<template lang="pug">
.toasts
    transition-group(name='slide', tag='div')
        .toast(
                v-for='toast in toasts',
                :key='`${_uid}-${toast.id}`',
                @click='$emit("onDelete", toast.id)')
            .toast__icon(v-if='toast.iconChar') {{ toast.iconChar }}
            .toast__body(:class='{ "toast__body--important": toast.important }')
                .toast__title {{ toast.title }}
                .toast__message {{ toast.message }}
</template>

<script>
export default {
    name: 'Toasts',
    props: ['toasts'],
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.toasts
    position: fixed
    right: 0
    bottom: 0
    display: flex
    flex-direction: column-reverse

.toast
    margin: 0.8rem
    display: flex
    flex-direction: row
    position: relative
    &::after
        position: absolute
        display: block
        content: ''
        width: 100%
        height: 100%
        box-shadow: 5px 5px 15px 5px #0008
        z-index: -1

.toast__icon
    font-size: 3em
    width: 5rem
    height: 5rem
    display: flex
    align-items: center
    justify-content: center
    background: $theme-colour
    color: $bg-colour
    border: 1px solid $theme-colour

.toast__body
    width: min(max(400px, 33vw), calc(100vw - 6.6rem - 2px))
    box-sizing: border-box
    padding: 0 0.5rem
    background: $bg-colour
    border: 1px solid $theme-colour
    display: flex
    flex-direction: column
    justify-content: space-evenly

.toast__body--important
    background: $theme-colour
    color: $bg-colour
    border-left: 1px solid $bg-colour

.toast__title
    font-size: 1.2rem

.toast__message
    color: $secondary-colour

.toast__body--important .toast__message
    color: $bg-colour

.slide-enter-active, .slide-leave-active, .slide-move
    transition: all 500ms

.slide-enter, .slide-leave-to
    opacity: 0
    transform: translateX(min(max(400px, 33vw) + 6.6rem, calc(100vw - 2px)))
</style>
