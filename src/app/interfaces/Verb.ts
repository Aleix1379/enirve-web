export interface VerbTranslation {
  spanish: string;
}

export interface Verb {
  id: number;
  present: string;
  translations: VerbTranslation;
  simple: string;
  participle: string;
  matched: boolean;
}
