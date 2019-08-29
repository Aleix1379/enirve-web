export interface Verb {
  id: number;
  completed: boolean;
}

export interface Progress {
  sectionId: number;
  verbs: Verb[];
}

export interface ActivityProgress {
  points: number;
  activity: Progress[];
}

export interface ActivityUpdateProgressVerbs {
  sectionId: number;
  verbs: number[];
}

export interface ActivityUpdateProgress {
  points: number;
  activity: ActivityUpdateProgressVerbs;
}

export interface User {
  code?: number;
  username: string;
  email: string;
  picture: string;
  password?: string;
  friends: number[];
  progress?: ActivityProgress;
}
