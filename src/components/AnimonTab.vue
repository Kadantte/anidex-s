<template>
  <!--SELECT/ADD-->
  <container-box class="q-mb-sm">
    <template v-slot:content>
      <q-select
        label="Animon"
        v-model="anidex.campaign.config.mon"
        :options="selectOpts"
        map-options
        emit-value
        borderless
        dense
      >
        <template v-slot:after>
          <q-btn
            v-if="anidex.campaign.mons.length > 1"
            icon="mdi-delete"
            flat
            rounded
            dense
            @click="removeMon(anidex.campaign.config.mon)"
          />
          <q-btn icon="mdi-plus-circle" flat rounded dense @click="addMon" />
        </template>
      </q-select>
    </template>
  </container-box>
  <!--XP-->
  <xp-box class="row q-mb-sm" v-model="anidex.campaign.kid.xp" horizontal />

  <div class="row full-width">
    <!--BOND STUFF-->
    <div class="col-xs-6 col-sm-3 q-mb-sm q-pr-sm">
      <!--LEVEL-->
      <num-box title="BOND LEVEL" v-model="anidex.bondSrc.bond.level">
        <template v-slot:under>
          <div class="row items-center text-center text-bold" v-if="anidex.bondSrc.bond.level >= 2">
            <span class="col">Improvements: {{ improvements.selected }} / {{ improvements.available }}</span>
            <q-btn class="col-shrink" flat dense rounded icon="mdi-cog" size="sm" @click="showImprDialog = true" />
          </div>
        </template>
      </num-box>
    </div>

    <div :class="`col-xs-6 col-sm-3 q-mb-sm ${$q.screen.gt.xs ? 'q-pr-sm' : ''}`">
      <!--POINTS-->
      <max-cur-box title="BOND POINTS" v-model="anidex.bondSrc.bond.points" />
    </div>

    <div class="col-xs-6 col-sm-3 q-mb-sm q-pr-sm">
      <!--STRAIN-->
      <num-box title="BOND STRAIN" v-model="anidex.bondSrc.bond.strain" />
    </div>

    <div class="col-xs-6 col-sm-3 q-mb-sm">
      <!--SIG ATK USES-->
      <max-cur-box title="SIG. ATK USES" v-model="mon.sigAtkUses" :max="derived.init" />
    </div>
  </div>

  <div class="row full-width">
    <div class="col-xs-6 col-sm-3 q-mb-sm q-pr-sm">
      <container-box>
        <template v-slot:content>
          <q-select
            label="STAGE"
            :options="keys(EEvoRank)"
            v-model="rank"
            dense
            borderless
            input-class="text-h6 text-center"
          />
        </template>
      </container-box>
    </div>

    <div :class="`col-xs-6 col-sm-3 q-mb-sm ${$q.screen.gt.xs ? 'q-pr-sm' : ''}`">
      <text-box title="NAME" v-model="mon.evos[rank].name" />
    </div>

    <div class="col-xs-12 col-sm-6 q-mb-sm">
      <text-box title="NATURE" v-model="mon.nature" />
    </div>
  </div>

  <div class="row full-width">
    <div class="col-xs-12 col-sm-6 q-pr-xs">
      <div class="row">
        <div class="col-6 q-pr-xs">
          <container-box>
            <!--STATS-->
            <template v-slot:content>
              <div class="row text-h5 text-center text-bold"><span class="col">STATS</span></div>
              <q-separator />
              <div class="row text-h6 text-center"><span class="col">HEART</span></div>
              <q-input
                class="row"
                type="number"
                v-model.number="mon.evos[rank].stats.heart"
                dense
                borderless
                input-class="text-h4 text-center"
                :min="baseStat(rank).min"
                :max="baseStat(rank).max"
              />
              <q-separator />
              <div class="row text-h6 text-center q-mt-sm"><span class="col">POWER</span></div>
              <q-input
                class="row"
                type="number"
                v-model.number="mon.evos[rank].stats.power"
                dense
                borderless
                input-class="text-h4 text-center"
                :min="baseStat(rank).min"
                :max="baseStat(rank).max"
              />
              <q-separator />
              <div class="row text-h6 text-center q-mt-sm"><span class="col">AGILITY</span></div>
              <q-input
                class="row"
                type="number"
                v-model.number="mon.evos[rank].stats.agility"
                dense
                borderless
                input-class="text-h4 text-center"
                :min="baseStat(rank).min"
                :max="baseStat(rank).max"
              />
              <q-separator />
              <div class="row text-h6 text-center q-mt-sm"><span class="col">BRAINS</span></div>
              <q-input
                class="row"
                type="number"
                v-model.number="mon.evos[rank].stats.brains"
                dense
                borderless
                input-class="text-h4 text-center"
                :min="baseStat(rank).min"
                :max="baseStat(rank).max"
              />
              <div class="row text-center q-mt-sm">
                <span
                  class="col"
                  :class="`text-bold ${pointsTotal > baseStat(rank).points ? 'text-red' : 'text-black'}`"
                >
                  Points assigned: {{ pointsTotal }}/{{ baseStat(rank).points }}</span
                >
              </div>
            </template>
          </container-box>
        </div>

        <div class="col-6 q-pl-xs column justify-between">
          <!--HP-->
          <max-cur-box class="row q-mb-sm" title="HP" :max="derived.hp.max" v-model="mon.evos[rank].hp" />
          <!--DMG-->
          <num-box class="row q-mb-sm" title="DAMAGE" :value="derived.dmg" />
          <!--DODGE-->
          <num-box class="row q-mb-sm" title="DODGE" :value="derived.dodge" />
          <!--INIT-->
          <num-box class="row" title="INITIATIVE" :value="derived.init" />
        </div>
      </div>
    </div>

    <div :class="`col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pl-xs' : 'q-mt-sm'}`">
      <div class="row q-mb-sm">
        <div class="col-6 q-pr-xs">
          <container-box>
            <!--CLASS-->
            <template v-slot:content>
              <q-select
                class="row"
                label="CLASS."
                :options="keys(EClassification)"
                v-model="mon.evos[rank].class"
                dense
                borderless
              />
            </template>
          </container-box>
        </div>

        <div class="col-6 q-pl-xs">
          <container-box>
            <!--ELEMENT-->
            <template v-slot:content>
              <q-select
                class="row"
                label="ELEMENT"
                :options="keys(EElement)"
                v-model="mon.evos[rank].element"
                dense
                borderless
              />
            </template>
          </container-box>
        </div>
      </div>

      <container-box class="column q-mb-sm" v-if="rank != 'Fledgling'">
        <!--SIG. ATK-->
        <template v-slot:content>
          <div class="row text-h6 text-center"><div class="col">SIGNATURE ATTACK</div></div>
          <q-separator />
          <q-input class="row" label="NAME" v-model="mon.evos[rank].sigAtk.name" dense />
          <div class="row">
            <q-input
              class="col-6"
              type="number"
              label="RANK"
              v-model.number="mon.evos[rank].sigAtk.rank"
              input-class="text-center"
              dense
            />
            <q-select
              class="col-6"
              label="ELEMENT"
              :options="keys(EElement)"
              v-model="mon.evos[rank].sigAtk.element"
              dense
            />
          </div>
          <q-input class="row" label="EFFECT 1" v-model="mon.evos[rank].sigAtk.effect.one" dense autogrow />
          <q-input class="row" label="EFFECT 2" v-model="mon.evos[rank].sigAtk.effect.two" dense autogrow />
          <q-input
            class="row"
            label="EFFECT 3"
            v-model="mon.evos[rank].sigAtk.effect.three"
            dense
            autogrow
            borderless
          />
        </template>
      </container-box>

      <!--QUALITIES-->
      <talents-box title="Qualities" v-model="mon.evos[rank].qualities" v-if="rank != 'Fledgling'" />
    </div>
  </div>

  <q-dialog v-model="showImprDialog" :maximized="$q.screen.lt.sm">
    <q-card class="rounded-corners">
      <q-card-section class="row bg-red text-white items-center text-h6">
        <span class="col">SCORE IMPROVEMENTS</span>
        <q-btn class="col-shrink" flat dense rounded icon="mdi-close-circle" @click="showImprDialog = false" />
      </q-card-section>

      <q-card-section class="column q-pa-lg">
        <q-select class="row q-mb-md" v-model="selectedImpr" :options="keys(EScoreImpr)" dense>
          <template v-slot:after>
            <q-btn flat rounded dense icon="mdi-plus-circle" @click="anidex.imprSrc.improvements.push(selectedImpr)" />
          </template>
        </q-select>

        <div class="row items-center" v-for="(impr, i) in anidex.imprSrc.improvements" :key="`impr-${i}`">
          <span class="col">{{ impr }}</span>
          <q-btn
            class="col-shrink"
            flat
            rounded
            dense
            icon="mdi-delete"
            @click="anidex.imprSrc.improvements.splice(i, 1)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { Mon, EvoRank, EEvoRank, EClassification, EElement, MaxCurStat, ScoreImpr, EScoreImpr } from './models';

import { useQuasar } from 'quasar';
import { useAnidexStore } from 'src/stores/app-store';

import { baseStat, copyStruct, create, keys } from 'src/lib/utils';

import ContainerBox from './widgets/ContainerBox.vue';
import NumBox from './widgets/NumBox.vue';
import MaxCurBox from './widgets/MaxCurBox.vue';
import TextBox from './widgets/TextBox.vue';
import XpBox from './widgets/XpBox.vue';
import TalentsBox from './widgets/TalentsBox.vue';

const anidex = useAnidexStore();
const mon = defineModel<Mon>({ required: true });
const rank = ref<EvoRank>('Basic');
const selectedImpr = ref<ScoreImpr>('Max HP');
const showImprDialog = ref(false);

interface DerivedStats {
  hp: MaxCurStat;
  dmg: number;
  dodge: number;
  init: number;
}

const selectOpts = computed(() => anidex.campaign.mons.map((m, i) => ({ label: m.evos['Basic'].name, value: i })));

const $q = useQuasar();
const addMon = () => {
  anidex.campaign.mons.push(create.mon());
  anidex.campaign.config.mon = anidex.campaign.mons.length - 1;
};
const removeMon = (index: number) =>
  $q
    .dialog({
      title: `Remove ${anidex.campaign.mons[index].evos['Basic'].name}?`,
      cancel: true,
    })
    .onOk(() => {
      anidex.campaign.config.mon = 0;
      anidex.campaign.mons.splice(index, 1);
    });

const pointsTotal = computed((): number => {
  let t = 0;
  const stats = copyStruct(mon.value.evos[rank.value].stats);
  Object.keys(stats).forEach((key) => (t += stats[key as keyof typeof stats]));
  return t - baseStat(rank.value).min * 4;
});

const improvements = computed(() => ({
  available: Math.floor(anidex.bondSrc.bond.level / 2),
  selected: anidex.imprSrc.improvements.length,
}));

const derived = computed((): DerivedStats => {
  const stats = copyStruct(mon.value.evos[rank.value].stats);

  // Fledgling
  const derived: DerivedStats = {
    hp: {
      max: stats.heart * 3,
      cur: mon.value.evos[rank.value].hp.cur,
    },
    dmg: stats.power,
    dodge: stats.agility,
    init: stats.brains,
  };

  switch (rank.value) {
    case 'Basic':
      derived.hp.max = 5 + mon.value.evos[rank.value].stats.heart * 3;
      derived.dmg = stats.power * 2;
      break;

    case 'Super':
      derived.hp.max = 10 + mon.value.evos[rank.value].stats.heart * 4;
      derived.dmg = stats.power * 2;
      break;

    case 'Ultra':
      derived.hp.max = 15 + mon.value.evos[rank.value].stats.heart * 5;
      derived.dmg = stats.power * 3;
      break;

    case 'Giga':
      derived.hp.max = 20 + mon.value.evos[rank.value].stats.heart * 6;
      derived.dmg = stats.power * 4;
      break;
  }

  // Score Improvements
  anidex.imprSrc.improvements.forEach((impr) => {
    switch (impr) {
      case 'Max HP':
        if (derived.hp.max) derived.hp.max += 5;
        break;

      case 'Damage':
        derived.dmg += 2;
        break;

      case 'Dodge':
        derived.dodge++;
        break;

      case 'Initiative and Sig. Atk uses':
        derived.init++;
    }
  });

  return derived;
});
</script>
