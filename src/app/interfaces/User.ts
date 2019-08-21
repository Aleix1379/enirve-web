export interface Verb {
  id: number;
  completed: boolean;
}

export interface Progress {
  sectionId: number;
  verbs: Verb[];
}

export interface User {
  code?: number;
  username: string;
  email: string;
  picture: string;
  password?: string;
  progress?: {
    points: number;
    activity: Progress[];
  };
}
