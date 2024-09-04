<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red text-bold">
        <q-btn flat dense round icon="mdi-robot-vacuum" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> ANIDEX v{{ pkg.version }}</q-toolbar-title>

        <q-tabs v-model="anidex.campaign.config.tab">
          <q-tab name="kid" label="KID" />
          <q-tab name="mons" label="DEX" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <!--q-item-label header> Sidebar Woo! </q-item-label-->

        <q-btn
          class="full-width"
          label="New Campaign"
          flat
          @click="anidex.campaigns.push(create.campaign())"
          icon-right="add"
        />

        <q-item
          class="items-center"
          v-for="(c, i) in anidex.campaigns"
          :key="`campaign-${i}`"
          :active="anidex.config.current == i"
          clickable
          v-ripple
        >
          <q-item-section @click="anidex.config.current = i">{{ c.kid.name }}</q-item-section>
          <q-item-section v-if="anidex.campaigns.length > 1" side>
            <q-btn icon="delete" flat dense rounded @click="deleteCampaign(i)" />
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple @click="anidex.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            Export Character Data
            <q-tooltip>Download your campaign data as a .json file</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showDataLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            Load Character Data
            <q-tooltip>Load previously exported campaign data</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-cog" />
          </q-item-section>
          <q-item-section>
            <q-toggle
              v-model="anidex.campaign.config.groupBond"
              label="Bond Stats Per Animon"
              :false-value="true"
              :true-value="false"
              dense
            />
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple @click="showAbout = true">
          <q-item-section avatar>
            <q-icon name="mdi-information" />
          </q-item-section>

          <q-item-section> About </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showDataLoad" :maximized="$q.screen.lt.sm">
      <q-card>
        <q-card-section class="text-center text-h6 bg-grey text-white">Load Character Data</q-card-section>

        <q-card-section class="text-subtitle">
          Please bear in mind that this data will overwrite any existing versions of the same character.
        </q-card-section>

        <q-card-section>
          <q-file v-model="fileToLoad" standout label="Select File" accept=".json" />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="load" color="primary" @click="loadData" flat />
          <q-btn label="close" color="warning" @click="showDataLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAbout" :maximized="$q.screen.lt.sm">
      <q-card>
        <q-card-section class="row text-center text-h6 bg-grey text-white items-center">
          <div class="col">About</div>
          <q-btn icon="mdi-close-circle" flat rounded dense @click="showAbout = false" />
        </q-card-section>

        <q-card-section>
          <p>Animon Story is copyright &copy; Zak Barouh</p>
          <p>
            Please submit feature requests and bug reports to the
            <a href="https://github.com/nboughton/anidex" target="_blank">github project</a>
          </p>
          <p>
            If you like my work and want support it, you can <a href="https://ko-fi.com/tiberianpun">buy me a coffee</a>
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as pkg from 'src/../package.json';
import { useAnidexStore } from 'src/stores/app-store';
import { AppStore } from 'src/components/models';
import { create } from 'src/lib/utils';
import { useQuasar } from 'quasar';

const anidex = useAnidexStore();

const showAbout = ref(false);
const showDataLoad = ref(false);
const fileToLoad = ref<null | File>(null);
const loadData = () => {
  const f: File = fileToLoad.value as File;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const data = JSON.parse(ev.target?.result as string) as AppStore;
    anidex.loadData(data);
    showDataLoad.value = false;
  };
  reader.readAsText(f);
};

const $q = useQuasar();
const deleteCampaign = (index: number) =>
  $q
    .dialog({
      title: 'Delete this character and their dex?',
      cancel: true,
    })
    .onOk(() => {
      anidex.config.current = anidex.config.current > 0 ? index - 1 : 0;
      anidex.campaigns.splice(index, 1);
    });

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
