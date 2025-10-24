export interface Effect {
  id: string;
  name: string;
  description: string;
  prompt: string;
  multiImage?: boolean;
}