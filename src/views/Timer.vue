<template lang="pug">
main.timer(v-if='timer')
    h1.title(v-if='timer.turnNumber >= 0')
        span Turn {{ Math.floor(timer.turnNumber / 2) }}
        span.status(v-if='timer.hasEnded') !{' '}- Game Over
    h1.title(v-else) Not Started
    h2.subtitle(v-if='timer.turnNumber >= 0 && !timer.hasEnded')
        span Stage {{ stageNumber }}; +{{ stageIncrementPerTurn }} per turn
    h2.subtitle(v-if='timer.hasEnded') {{ endReason }}
    .button_wrapper(v-if='side !== -2')
        button.button(v-if='canAddTime', @click='showAddTime = true') Add Time
        button.button(v-if='canStart', @click='startGame') Start Timer
        button.button(v-if='isTurn', @click='endTurn') End Turn
        button.button(v-if='canEnd', @click='showEndGame = true') End Timer
        span.button_placeholder(
            v-if='!(canAddTime || canStart || isTurn || canEnd)')
    .sides
        TimerSide(
            :side='timer.home', :number='0', :userSide='side',
            :gameOver='timer.hasEnded', @timedOut='onTimeOut(0)')
        TimerSide(
            :side='timer.away', :number='1', :userSide='side',
            :gameOver='timer.hasEnded', @timedOut='onTimeOut(1)')
    span {{ timer.observers }} observers
    span This link can be used to observe:
    Copyable(:content='link')
    Modal(:showIf='showAddTime'): .modal
        h3.modal__title Add Time
        p.modal__description
            | This time will be added to both clocks as soon as you press
            | "Add Time".
        TimeInput.modal__input(:value='timeToAdd')
        .modal__buttons
            button.button(@click='addTime') Add Time
            button.button.button--secondary(@click='showAddTime = false') Cancel
    Modal(:showIf='showEndGame'): .modal
        h3.modal__title End Game
        p.modal__description
            | The game will be ended as soon as you press "End Game". Only
            | press it if the game is actually over, or you are resigning.
        .modal__buttons
            button.button(@click='endGame') End Game
            button.button.button--secondary(@click='showEndGame = false') Cancel
main.loading(v-else)
    span Loading...
</template>

<script>
import { Duration } from 'luxon';
import { getConnection, getSide } from '../js/utils';
import TimerSide from '../components/TimerSide';
import Copyable from '../components/Copyable';
import Modal from '../components/Modal';
import TimeInput from '../components/TimeInput';

export default {
    name: 'Timer',
    components: { TimerSide, Copyable, Modal, TimeInput },
    data() {
        this.$options.socket = getConnection(this.$route.params.id);
        this.$options.socket.addListener('error', this.onError);
        this.$options.socket.addListener('state_update', this.onState);
        this.$options.socket.connect();
        const timer = this.$route.params.id;
        const side = getSide(timer);
        return {
            timer: null,
            side: side,
            link: `${window.location.origin}/t/${timer}`,
            showAddTime: false,
            showEndGame: false,
            timeToAdd: Duration.fromMillis(300 * 1000),
        };
    },
    beforeRouteUpdate(to, from, next) {
        this.$options.socket.connect();
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.$options.socket.disconnect();
        next();
    },
    computed: {
        isTurn() {
            if (!this.timer) return false;
            return (
                (this.side === 0 && this.timer.home.isTurn) ||
                (this.side === 1 && this.timer.away.isTurn)
            );
        },
        canEnd() {
            if (!this.timer) return false;
            return (
                this.side >= 0 && this.timer.startedAt && !this.timer.hasEnded
            );
        },
        canStart() {
            if (!this.timer) return false;
            return this.side === 0 && this.timer.away && !this.timer.startedAt;
        },
        canAddTime() {
            if (!this.timer) return false;
            return (
                this.side === -1 && this.timer.startedAt && !this.timer.hasEnded
            );
        },
        stageNumber() {
            return this.timer.settings.indexOf(this.timer.stageSettings) + 1;
        },
        stageIncrementPerTurn() {
            const hms = this.timer.stageSettings.incrementPerTurn
                .shiftTo('hours', 'minutes', 'seconds')
                .toObject();
            let value = '';
            if (hms.hours) value += hms.hours + 'h';
            if (hms.minutes) value += hms.minutes + 'm';
            if (hms.seconds) value += hms.seconds + 's';
            return value || '0s';
        },
        endReason() {
            if (!this.timer.hasEnded) return 'Not Ended';
            const zero = Duration.fromMillis(0);
            if (this.timer.home.totalTimeLastTurn <= zero) {
                return 'Player 1 Timed Out';
            }
            if (this.timer.away.totalTimeLastTurn <= zero) {
                return 'Player 2 Timed Out';
            }
            switch (this.timer.endReporter) {
                case -1:
                    return 'Manager Ended Game';
                case 0:
                    return 'Player 1 Ended Game';
                case 1:
                    return 'Player 2 Ended Game';
            }
            return 'Unkown End Reason';
        },
    },
    methods: {
        onError(error) {
            // TODO: Display the error.
            console.log(error);
        },
        onState(timer) {
            this.timer = timer;
        },
        startGame() {
            this.$options.socket.startTimer();
        },
        endTurn() {
            this.$options.socket.endTurn();
        },
        onTimeOut(number) {
            if (number === this.side) {
                this.$options.socket.endTurn();
            } else {
                this.$options.socket.opponentTimedOut();
            }
        },
        addTime() {
            this.$options.socket.addTime(
                this.timeToAdd.shiftTo('seconds').seconds
            );
            this.showAddTime = false;
        },
        endGame() {
            this.$options.socket.endGame();
            this.showEndGame = false;
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.timer
    display: flex
    flex-direction: column
    align-items: center
    padding-bottom: 1rem
    box-sizing: border-box

.title
    color: $secondary-colour
    margin: 0
    margin-top: 1rem
    font-size: 1.5rem

.subtitle
    color: $secondary-colour
    margin: 0
    margin-top: 1rem
    font-size: 1rem

.status
    color: $theme-colour

.sides
    display: flex
    width: 100%
    flex-grow: 999

@media only screen and (max-width: 800px)
    .sides
        flex-direction: column

.button_wrapper
    height: calc(2.5rem + 2px)
    overflow-x: hidden
    max-width: 100%
    display: flex
    align-items: center

.button
    border: 0
    border: 1px solid $theme-colour
    font-family: inherit
    font-size: inherit
    font-weight: inherit
    display: flex
    align-items: center
    justify-content: center
    height: 1rem
    margin: 0.5rem 0.5rem 0 0
    background: $theme-colour
    color: $bg-colour
    padding: 1rem
    cursor: pointer
    transition: background 50ms, color 50ms
    &:hover
        background: $bg-colour
        color: $theme-colour

.button--secondary
    background: $bg-colour
    color: $theme-colour
    border: 1px solid $theme-colour
    &:hover
        background: $theme-colour
        color: $bg-colour

.button_placeholder
    width: 100vw
    height: 5px
    background: $theme-colour
    display: block
    margin: calc((2.5rem - 5px) / 2) 0

.modal
    display: flex
    flex-direction: column
    align-items: center

.modal__title
    margin: 0

.modal__description
    margin: 0
    margin: 1rem
    color: $secondary-colour
    text-align: center

.modal__input
    margin-bottom: 1rem

.modal__buttons
    display: flex
    .button
        margin: 0
        margin-right: 1rem
</style>
