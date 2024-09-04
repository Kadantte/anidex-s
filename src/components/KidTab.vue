<template>
  <div class="column full-width">
    <container-box class="column q-mb-sm">
      <!--KID NAME ETC BOX-->
      <template v-slot:content>
        <q-input class="row" label="NAME" v-model="kid.name" dense />
        <div class="row">
          <q-input class="col" label="VIRTUE" v-model="kid.about.virtue" dense />
          <q-input class="col" label="FLAW" v-model="kid.about.flaw" dense />
        </div>
        <div class="row">
          <q-input class="col" label="DESIRE" v-model="kid.about.desire" dense />
          <q-input class="col" label="SPECIAL ITEM" v-model="kid.about.specialItem" dense />
        </div>
        <q-input class="row" label="KID TYPE" v-model="kid.kidType.label" dense />
        <q-input class="row" label="TYPE FEATURE" v-model="kid.kidType.feature" autogrow dense borderless />
      </template>
    </container-box>

    <div class="row">
      <!--COLUMNS-->
      <div :class="`column col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pr-xs' : ''}`">
        <container-box class="q-mb-sm">
          <!--TRAITS-->
          <template v-slot:content>
            <div class="row text-center text-h6"><span class="col"> TRAITS</span></div>
            <q-separator />
            <div class="row">
              <q-input
                class="col"
                type="number"
                label="LOGIC"
                v-model.number="kid.traits.logic"
                dense
                input-class="text-h6 text-center"
                borderless
                :min="2"
                :max="4"
              />
              <q-input
                class="col"
                type="number"
                label="REFLEX"
                v-model.number="kid.traits.reflex"
                dense
                input-class="text-h6 text-center"
                borderless
                :min="2"
                :max="4"
              />
              <q-input
                class="col"
                type="number"
                label="SPIRIT"
                v-model.number="kid.traits.spirit"
                dense
                input-class="text-h6 text-center"
                borderless
                :min="2"
                :max="4"
              />
            </div>
          </template>
        </container-box>

        <stamina-box v-if="$q.screen.lt.sm" v-model="kid.stamina" />

        <talents-box v-if="$q.screen.lt.sm" class="q-mb-sm" title="TALENTS" v-model="kid.talents" />

        <container-box class="q-mb-sm">
          <!--HARM-->
          <template v-slot:content>
            <div class="row full-width items-center text-bold">
              <div class="col-grow">HARM:</div>
              <q-checkbox class="col-shrink" label="Shaken" left-label v-model="kid.harm.shaken" dense />
            </div>
            <q-separator />
            <q-input class="row" label="1." v-model="kid.harm.one" dense />
            <q-input class="row" label="2." v-model="kid.harm.two" dense />
            <q-input class="row" label="3." v-model="kid.harm.three" dense borderless />
          </template>
        </container-box>

        <container-box :class="`${$q.screen.lt.sm ? 'q-mb-sm' : ''}`">
          <!--RELATIONSHIPS-->
          <template v-slot:content>
            <q-input class="row" label="RELATIONSHIPS" v-model="kid.relationships" autogrow dense borderless />
          </template>
        </container-box>
      </div>

      <div :class="`column col-xs-12 col-sm-6 ${$q.screen.gt.xs ? 'q-pl-xs' : ''}`">
        <stamina-box v-if="$q.screen.gt.xs" v-model="kid.stamina" />

        <talents-box v-if="$q.screen.gt.xs" class="q-mb-sm" title="TALENTS" v-model="kid.talents" />

        <container-box>
          <!--STUFF-->
          <template v-slot:content>
            <q-input class="row" label="STUFF & ANI-TOOL" v-model="kid.stuffAndTool" dense autogrow borderless />
          </template>
        </container-box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Kid } from './models';

import ContainerBox from 'src/components/widgets/ContainerBox.vue';
import TalentsBox from './widgets/TalentsBox.vue';
import StaminaBox from 'src/components/widgets/StaminaBox.vue';

const kid = defineModel<Kid>({ required: true });
</script>
