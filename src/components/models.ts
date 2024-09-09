export interface HasID {
  id: string;
}

export interface HasName {
  name: string;
}

export interface MaxCurStat {
  max?: number;
  cur: number;
}

export interface Talent extends HasName {
  rank: number;
}

export interface AppStore {
  campaigns: Campaign[];
  config: {
    current: number;
  };
}

export enum ETabs {
  kid,
  mons,
}

export type Tabs = keyof typeof ETabs;

export interface Campaign extends HasID {
  kid: Kid;
  mons: Mon[];
  config: {
    mon: number;
    tab: Tabs;
    groupBond: boolean;
  };
}

export interface HasBond {
  bond: {
    level: number;
    points: MaxCurStat;
    strain: number;
  };
}

export interface HasScoreImpr {
  improvements: ScoreImpr[];
}

export interface Kid extends HasID, HasName, HasBond, HasScoreImpr {
  xp: number;
  about: {
    virtue: string;
    flaw: string;
    desire: string;
    specialItem: string;
  };
  traits: {
    logic: number;
    reflex: number;
    spirit: number;
  };
  kidType: {
    label: string;
    feature: string;
  };
  stamina: MaxCurStat;
  talents: Talent[];
  harm: {
    shaken: boolean;
    one: string;
    two: string;
    three: string;
  };
  relationships: string;
  stuffAndTool: string;
}

export enum EClassification {
  Dragon,
  Beast,
  Avian,
  Insect,
  Plant,
  Aquatic,
  Celestial,
  Infernal,
  Machine,
  Fairy,
  Nightmare,
  Unknown,
}

export type Classification = keyof typeof EClassification;

export enum EElement {
  Fire,
  Water,
  Nature,
  Electric,
  Earth,
  Wind,
  Light,
  Dark,
  Mirage,
  Neutral,
}

export type Element = keyof typeof EElement;

export enum EEvoRank {
  Fledgling,
  Basic,
  Super,
  Ultra,
  Giga,
}

export type EvoRank = keyof typeof EEvoRank;

export enum EScoreImpr {
  'Max HP',
  Damage,
  Dodge,
  'Initiative and Sig. Atk uses',
}

export type ScoreImpr = keyof typeof EScoreImpr;

export interface MonEvo extends HasName {
  class: Classification;
  element: Element;
  stats: {
    heart: number;
    power: number;
    agility: number;
    brains: number;
  };
  hp: MaxCurStat;
  sigAtk: {
    name: string;
    rank: number;
    element: Element;
    effect: {
      one: string;
      two: string;
      three: string;
    };
  };
  qualities: Talent[];
}

export interface Mon extends HasID, HasBond, HasScoreImpr {
  nature: string;
  sigAtkUses: MaxCurStat;
  evos: Record<EvoRank, MonEvo>;
}
