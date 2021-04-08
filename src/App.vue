<template lang="pug">
div.root
    router-view
    footer.footer
        | © Copyright 2021 !{' '}
        a(href='https://artemisdev.xyz') Artemis
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
    background: #111
    padding: 0.5rem
    text-align: center
    height: 1.2rem
</style>
