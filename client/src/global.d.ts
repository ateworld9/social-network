declare module "*.module.css";
declare module "*.module.scss";

// add an element to the end of a tuple
type Push<L extends any[], T> = ((r: any, ...x: L) => void) extends (
  ...x: infer L2
) => void
  ? { [K in keyof L2]-?: K extends keyof L ? L[K] : T }
  : never;

// convert a union to an intersection: X | Y | Z ==> X & Y & Z
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// convert a union to an overloaded function X | Y ==> ((x: X)=>void) & ((y:Y)=>void)
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

// convert a union to a tuple X | Y => [X, Y]
// a union of too many elements will become an array instead
type UnionToTuple<U> = UTT0<U> extends infer T
  ? T extends any[]
    ? Exclude<U, T[number]> extends never
      ? T
      : U[]
    : never
  : never;

// each type function below pulls the last element off the union and
// pushes it onto the list it builds
type UTT0<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? Push<UTT1<Exclude<U, A>>, A>
  : [];
type UTT1<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? Push<UTT2<Exclude<U, A>>, A>
  : [];
type UTT2<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? Push<UTT3<Exclude<U, A>>, A>
  : [];
type UTT3<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? Push<UTT4<Exclude<U, A>>, A>
  : [];
type UTT4<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? Push<UTT5<Exclude<U, A>>, A>
  : [];
type UTT5<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? Push<UTTX<Exclude<U, A>>, A>
  : [];
type UTTX<U> = []; // bail out
