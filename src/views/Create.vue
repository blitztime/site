<template lang="pug">
main.create
    h1 Create a Timer
    section.stage(v-for='(stage, idx) in stages')
        StageSettings(
            :stage='stage', :expanded='idx === expandedStage', :idx='idx',
            @expandStage='expandedStage = idx',
            @removeStage='stages.splice(idx, 1)')
    .add_stage(@click='addStage') +
    .as_player_input
        span Join as Player 1?
        Checkbox(type='checkbox', v-model='asPlayer')
    button.button(@click='start') Start
</template>

<script>
import { HttpClient, StageSettings as StageSettingsModel } from 'blitztime';
import { storeConnection } from '../js/utils';
import { Duration } from 'luxon';
import Checkbox from '../components/Checkbox';
import StageSettings from '../components/StageSettings';

const client = new HttpClient(process.env.VUE_APP_API_URL);

export default {
    name: 'Create',
    components: { Checkbox, StageSettings },
    data() {
        return {
            stages: [
                {
                    startTurn: 0,
                    fixedTimePerTurn: Duration.fromMillis(0),
                    incrementPerTurn: Duration.fromMillis(30 * 1000),
                    initialTime: Duration.fromMillis(30 * 60 * 1000),
                },
            ],
            asPlayer: true,
            expandedStage: 0,
        };
    },
    methods: {
        async start() {
            const stageSettings = this.stages.map(StageSettingsModel.create);
            const creds = await client.createTimer(
                stageSettings,
                !this.asPlayer
            );
            storeConnection(creds, this.asPlayer ? 0 : -1);
            this.$router.push(`/timer/${creds.timer}`);
        },
        addStage() {
            this.stages.push({
                startTurn: this.stages[this.stages.length - 1].startTurn + 10,
                fixedTimePerTurn: Duration.fromMillis(0),
                incrementPerTurn: Duration.fromMillis(0),
                initialTime: Duration.fromMillis(0),
            });
            this.expandedStage = this.stages.length - 1;
        },
    },
};
</script>

<style lang="sass" scoped>
@import '../sass/_variables'

.create
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

.add_stage
    padding: 5px
    cursor: pointer
    background: $theme-colour
    color: $bg-colour
    width: $stage-settings-width
    box-sizing: border-box
    text-align: center

.as_player_input
    display: flex
    justify-content: space-evenly
    width: $stage-settings-width
    padding: 5px 0

.button
    background: $theme-colour
    color: $bg-colour
    padding: 5px 10px
    border: 0
    font-family: inherit
    font-size: inherit
    font-weight: inherit
    cursor: pointer
    text-decoration: underline
    transition: padding 50ms
    margin: 0.5rem
    &:after
        content: ' →'
        margin-left: -5px
        margin-right: 5px
        transition: margin 50ms
    &:hover:after
        margin: 0
</style>
