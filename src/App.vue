<template lang="pug">
div.root
    router-view
    footer.footer
        .footer__text
            | © Copyright 2021
            a.footer__link(href='https://artemisdev.xyz') Artemis
            | .
</template>

<style lang="sass">
@import 'sass/_variables'

body
    font-family: $font
    color: $theme-colour
    background: $bg-colour
    margin: 0

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
