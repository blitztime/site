<template lang="pug">
.root
    router-view.main
    footer.footer
        .footer__text
            | © Copyright 2021
            a.footer__link(href='https://artemisdev.xyz', target="_blank")
                | Artemis
            | .
</template>

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
</style>
