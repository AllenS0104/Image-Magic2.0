export interface Effect {
  id: string;
  name: string;
  description: string;
  prompt: string;
  multiImage?: boolean;
}

export interface EffectCategory {
  name: string;
  effects: Effect[];
}
