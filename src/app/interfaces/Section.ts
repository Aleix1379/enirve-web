import {Verb} from './Verb';

export interface Section {
  id: number;
  title: string;
  current: number;
  max: number;
  verbs: Verb[];
}
