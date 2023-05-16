/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #보통 #array #promise

  ### 질문

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > GitHub에서 보기: https://tsch.js.org/20/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// readonly
// promise.resolve

type PromiseReturnType<T extends Readonly<any[]>, Array extends any[] = []> = T extends [infer First, ...infer Rest]
  ? First extends Promise<Awaited<First>>
    ? PromiseReturnType<Rest, [...Array, Awaited<First> extends number ? number : Awaited<First>]>
    : PromiseReturnType<Rest, [...Array, First]>
  : Promise<Array>

type A = 'abc' // string
type Num = 3 // number

// declare function PromiseAll<T extends Readonly<any[]>>(values: T): PromiseReturnType<[...T]>
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P] }>

type Test = PromiseReturnType<readonly [1, 2, 3]>
type Test2 = readonly [1, 2, 3] extends [infer First, ...infer Rest] ? true : false

type Tuple = [1, 2, 3]
type Test200<T extends any[]> = { [P in keyof T]: T[P] }
type TT = Promise<{ [P in keyof Tuple]: Tuple[P] }>
type Testtt = Expect<Equal<Tuple, Test200<Tuple>>>

type TestTest = Promise<{ '0': 0; '1': 1; '2': 2; '3': 3; length: 4 }>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/20/answer/ko
  > 정답 보기: https://tsch.js.org/20/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
