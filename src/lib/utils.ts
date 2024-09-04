import { uid } from 'quasar';
import { Campaign, EvoRank, Kid, Mon, MonEvo } from 'src/components/models';

export const copyStruct = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;

export const keys = (e: object): string[] =>
  Object.keys(e)
    .map((key) => e[key as keyof typeof e])
    .filter((value) => typeof value === 'string') as string[];

export const create = {
  campaign: (): Campaign => ({
    id: uid(),
    kid: create.kid(),
    mons: [create.mon()],
    config: {
      mon: 0,
      tab: 'kid',
      groupBond: true,
    },
  }),

  kid: (): Kid => ({
    id: uid(),
    name: 'New Kid',
    xp: 0,
    bond: {
      level: 1,
      points: {
        max: 6,
        cur: 6,
      },
      strain: 0,
    },
    about: {
      virtue: '',
      flaw: '',
      desire: '',
      specialItem: '',
    },
    traits: {
      logic: 2,
      reflex: 3,
      spirit: 4,
    },
    kidType: {
      label: '',
      feature: '',
    },
    stamina: {
      max: 10,
      cur: 10,
    },
    talents: [],
    harm: {
      shaken: false,
      one: '',
      two: '',
      three: '',
    },
    relationships: '',
    stuffAndTool: '',
  }),

  mon: (): Mon => ({
    id: uid(),
    nature: '',
    bond: {
      level: 1,
      points: {
        max: 6,
        cur: 6,
      },
      strain: 0,
    },
    sigAtkUses: {
      cur: 0,
    },
    evos: {
      Fledgling: templateEvo('Fledgling'),
      Basic: templateEvo('Basic'),
      Super: templateEvo('Super'),
      Ultra: templateEvo('Ultra'),
      Giga: templateEvo('Giga'),
    },
  }),
};

const templateEvo = (rank: EvoRank): MonEvo => ({
  name: `New Animon (${rank})`,
  class: 'Unknown',
  element: 'Neutral',
  stats: {
    heart: baseStat(rank).min,
    power: baseStat(rank).min,
    agility: baseStat(rank).min,
    brains: baseStat(rank).min,
  },
  hp: { cur: 0 },
  sigAtk: {
    name: '',
    rank: baseSigAtk(rank),
    element: 'Neutral',
    effect: {
      one: '',
      two: '',
      three: '',
    },
  },
  qualities: [],
});

export const baseStat = (rank: EvoRank): { min: number; max: number; points: number } => {
  switch (rank) {
    case 'Fledgling':
      return { min: 1, max: 3, points: 4 };
    case 'Basic':
      return { min: 1, max: 4, points: 8 };
    case 'Super':
      return { min: 2, max: 5, points: 6 };
    case 'Ultra':
      return { min: 2, max: 6, points: 8 };
    case 'Giga':
      return { min: 2, max: 6, points: 10 };
  }
};

const baseSigAtk = (rank: EvoRank): number => {
  switch (rank) {
    case 'Fledgling':
      return 0;
    case 'Basic':
      return 1;
    case 'Super':
      return 2;
    case 'Ultra':
      return 3;
    case 'Giga':
      return 4;
  }
};
