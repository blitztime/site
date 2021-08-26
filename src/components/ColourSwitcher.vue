<template lang="pug">
.themes
    .themes__theme(
        v-for='[name, theme] of Object.entries(themes)'
        :style='{background: theme["theme-colour"]}'
        @click='switchTheme(name)')
</template>

<script>
import { setCookie, getCookie } from '../js/utils';

const THEMES = {
    red: {
        'theme-colour': '#e24',
        'bg-colour': '#222',
        'footer-colour': '#111',
        'secondary-colour': '#666e',
        'modal-mask': '#0008',
    },
    plain: {
        'theme-colour': '#000',
        'bg-colour': '#fff',
        'footer-colour': '#aaa',
        'secondary-colour': '#666e',
        'modal-mask': '#0008',
    },
    pink: {
        'theme-colour': '#FF1B8D',
        'bg-colour': '#222',
        'footer-colour': '#111',
        'secondary-colour': '#666e',
        'modal-mask': '#0008',
    },
    yellow: {
        'theme-colour': '#FFDA00',
        'bg-colour': '#222',
        'footer-colour': '#111',
        'secondary-colour': '#666e',
        'modal-mask': '#0008',
    },
    blue: {
        'theme-colour': '#1BB3FF',
        'bg-colour': '#222',
        'footer-colour': '#111',
        'secondary-colour': '#666e',
        'modal-mask': '#0008',
    },
};
const DEFAULT_THEME = 'classic_red';

export default {
    name: 'ColourSwitcher',
    data: () => {
        return { themes: THEMES };
    },
    mounted() {
        this.updateTheme();
    },
    methods: {
        updateTheme() {
            const theme =
                THEMES[getCookie('theme') || DEFAULT_THEME] ||
                THEMES[DEFAULT_THEME];
            Object.keys(theme).forEach((key) => {
                document.documentElement.style.setProperty(
                    '--' + key,
                    theme[key]
                );
            });
        },
        switchTheme(theme) {
            setCookie('theme', theme);
            this.updateTheme();
        },
    },
};
</script>

<style lang="sass" scoped>
.themes
    display: flex

.themes__theme
    width: 1rem
    height: 1rem
    border: 1px solid #fff8
    margin: 0.2rem

@media (pointer: coarse)
    .themes__theme
        width: 2rem
        height: 2rem
</style>
