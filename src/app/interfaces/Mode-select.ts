export enum ValueModeSelect {
  Manual = 1,
  All = 2,
  Custom = 3,
  Random = 4
}

export enum ValueModeSort {
  Sort = 1,
  Random = 2
}

export enum ValueModeType {
  ByTime = 1,
  ByNumber = 2
}

export interface ModeSelect {
  value: ValueModeSelect | ValueModeSort | ValueModeType;
  text: string;
}
