<template lang="pug">
.root
    router-view.main
    Toasts(:toasts='toasts', @onDelete='removeToast')
    footer.footer
        ColourSwitcher.switcher
        .footer__text
            | © Copyright 2021
            a.footer__link(href='https://artemisdev.xyz', target="_blank")
                | Artemis
            | .
</template>

<script>
import ColourSwitcher from './components/ColourSwitcher';
import Toasts from './components/Toasts';

export default {
    name: 'App',
    components: { ColourSwitcher, Toasts },
    data() {
        return {
            toasts: [],
            nextId: 0,
        };
    },
    mounted() {
        document.addEventListener('appNotification', this.onAppNotification);
    },
    beforeDestroy() {
        document.removeEventListener('appNotification', this.onAppNotification);
    },
    methods: {
        onAppNotification(event) {
            const toast = event.detail;
            toast.id = this.nextId++;
            this.toasts.push(toast);
            window.setTimeout(() => {
                this.removeToast(toast.id);
            }, 5000);
        },
        removeToast(id) {
            for (const [idx, toast] of this.toasts.entries()) {
                if (toast.id === id) {
                    this.toasts.splice(idx, 1);
                    return;
                }
            }
        },
    },
};
</script>

<style lang="sass">
@import 'sass/_variables'

body
    font-family: $font
    color: $theme-colour
    background: $bg-colour
    margin: 0

.main
    min-height: calc(100vh - 3rem)

.footer
    background: $footer-colour
    padding: 0.5rem
    text-align: center
    height: 2rem
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

.footer__link
    background: $theme-colour
    color: $bg-colour
    padding: 5px
    margin: 5px

.switcher
    position: absolute
    left: 0.5rem
</style>
