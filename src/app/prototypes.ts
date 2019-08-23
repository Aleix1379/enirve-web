export class Prototypes {

  constructor() {
  }

  public static loadPrototypes() {
    Object.defineProperty(Number.prototype, 'between', {
        value: function (a: number, b: number, inclusive: boolean = true): boolean {
          const min = Math.min.apply(Math, [a, b]);
          const max = Math.max.apply(Math, [a, b]);
          return inclusive ? this >= min && this <= max : this > min && this < max;
        }
      }
    );
  }

}
