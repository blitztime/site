<template lang="pug">
span.content(@click='copy') {{ displayContent }}
</template>

<script>
export default {
    props: ['content'],
    data: function () {
        return { displayContent: this.content };
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(this.content);
            this.displayContent = 'Copied!';
            setTimeout(() => {
                this.displayContent = this.content;
            }, 500);
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.content
    border-bottom: 1px dotted $theme-colour
    cursor: pointer
</style>
