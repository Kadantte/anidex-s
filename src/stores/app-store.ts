import { defineStore } from 'pinia';
import { exportFile } from 'quasar';
import { AppStore, Campaign, Mon, HasBond } from 'src/components/models';
import { copyStruct } from 'src/lib/utils';

export const useAnidexStore = defineStore('anidex', {
  state: () =>
    <AppStore>{
      campaigns: [],
      config: {
        current: 0,
      },
    },
  getters: {
    campaign: (store): Campaign => store.campaigns[store.config.current],
    mon: (store): Mon => store.campaigns[store.config.current].mons[store.campaigns[store.config.current].config.mon],
    bondSrc: (store): HasBond =>
      store.campaigns[store.config.current].config.groupBond
        ? store.campaigns[store.config.current].kid
        : store.campaigns[store.config.current].mons[store.campaigns[store.config.current].config.mon],
  },
  actions: {
    exportData() {
      const now = new Date();
      exportFile(
        `Anidex-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.json`,
        JSON.stringify(<AppStore>{
          campaigns: this.campaigns,
          config: this.config,
        })
      );
    },

    loadData(d: AppStore) {
      this.config = d.config;
      d.campaigns.forEach((c) => {
        let overwrite = false;
        this.campaigns.forEach((t, j) => {
          if (c.id == t.id) {
            this.campaigns[j] = copyStruct(c);
            overwrite = true;
            return;
          }
        });
        if (!overwrite) this.campaigns.push(copyStruct(c));
      });
    },
  },
  persist: true,
});
