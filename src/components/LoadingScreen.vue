<template lang="pug">
main.loading
    .loading__spinner
    h1.loading__title Loading
    h2.loading__message ...{{ message }}...
</template>

<script>
// List of messages adapted from
// https://gist.github.com/meain/6440b706a97d2dd71574769517e7ed32.
const MESSAGES = [
    'reticulating splines',
    'generating witty dialog',
    'swapping time and space',
    'spinning violently around the y-axis',
    'tokenizing real life',
    'bending the spoon',
    'filtering morale',
    "don't think of purple hippos",
    'we need a new fuse',
    'upgrading Windows, your PC will restart several times',
    'the architects are still drafting',
    'building the buildings as fast as we can',
    'drawing your map',
    'checking the gravitational constant in your locale',
    'humming something loudly',
    'testing your patience',
    'the bits are flowing slowly today',
    "testing on Timmy... We're going to need another Timmy",
    'reconfoobling energymotron',
    'are we there yet',
    'counting backwards from Infinity',
    'embiggening prototypes',
    'making you a cookie',
    'creating time-loop inversion field',
    'spinning the wheel of fortune',
    'loading the enchanted bunny',
    'computing chance of success',
    'looking for exact change',
    "I feel like I'm supposed to be loading something",
    'adjusting flux capacitor',
    'please wait until the sloth starts moving',
    "I swear it's almost done",
    "let's take a mindfulness minute",
    'unicorns are at the end of this road, I promise',
    "keeping all the 1's and removing all the 0's",
    'icing the cake',
    'cleaning off the cobwebs',
    "making sure all the i's have dots",
    'connecting Neurotoxin Storage Tank',
    'granting wishes',
    'spinning the hamster',
    '99 bottles of beer on the wall',
    'stay awhile and listen',
    'convincing AI not to turn evil',
    'computing the secret to life, the universe, and everything',
    'creating problems for solutions',
    'constructing additional pylons',
    'turning it off and on again',
    "didn't know paint dried so quickly",
    'walking the dog',
    'dividing by zero',
    "we're going to need a bigger boat",
    'cracking military-grade encryption',
    'simulating traveling salesman',
    'entangling superstrings',
    'twiddling thumbs',
    'searching for plot device',
    'laughing at your pictures',
    'sending data to Google',
    'looking for sense of humour',
    'reheating coffee',
    'converting bugs to features',
    'winter is coming',
    'distracted by cat gifs',
    'finding someone to hold my beer',
    'BRB, working on my side project',
    "let's hope it's worth the wait",
    'aw, snap',
    'ordering 1s and 0s',
    'updating dependencies',
    'please wait... consulting the manual',
    'loading funny message',
    'formatting C:',
    "help, I'm trapped in a loader",
    'mining some bitcoin',
    'downloading more RAM',
    'updating to Windows Vista',
    'deleting System32 folder',
    'initializing the initializer',
    'optimizing the optimizer',
    'running swag sticker detection',
    'shovelling coal into the server',
    'pushing pixels',
    'building a wall',
    'updating Updater',
    'downloading Downloader',
    'debugging Debugger',
    'reading Terms and Conditions for you',
    'running with scissors',
    'definitely not a virus',
    'work, work',
    'discovering new ways of making you wait',
    "catching em' all",
    'still faster than Windows update',
    'please wait while the minions do their work',
    'grabbing extra minions',
    'doing the heavy lifting',
    'working very hard... Really',
    'waking up the minions',
    'holding my breath and counting down from a thousand',
];

export default {
    name: 'LoadingScreen',
    data() {
        return {
            message: this.pickMessage(),
        };
    },
    mounted() {
        this.$options.timeout = window.setTimeout(this.setNewMessage, 500);
    },
    unmounted() {
        window.clearTimeout(this.$options.timeout);
    },
    methods: {
        pickMessage() {
            return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        },
        setNewMessage() {
            this.message = this.pickMessage();
            const time = 300 + Math.random() * 700;
            this.$options.timeout = window.setTimeout(this.setNewMessage, time);
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.loading
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

.loading__spinner
    &::before
        font-size: 5rem
        content: '⣿'
        animation: unicode-spinner 700ms linear 0s infinite

.loading__title
    margin: 1rem

.loading__message
    margin: 0 1rem

@keyframes unicode-spinner
    0%
        content: '⣾'
    12.5%
        content: '⣽'
    25%
        content: '⣻'
    37.5%
        content: '⢿'
    50%
        content: '⡿'
    62.5%
        content: '⣟'
    75%
        content: '⣯'
    87.5%
        content: '⣷'
</style>
