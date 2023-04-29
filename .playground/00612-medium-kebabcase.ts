/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #보통 #template-literal

  ### 질문

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">;
  const foobarbaz: FooBarBaz = "foo-bar-baz";

  type DoNothing = KebabCase<"do-nothing">;
  const doNothing: DoNothing = "do-nothing";
  ```

  > GitHub에서 보기: https://tsch.js.org/612/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type KebabCase<S> = S extends `${infer First}${infer Second}${infer Rest}`
  ? Second extends Lowercase<Second>
    ? `${Lowercase<First>}${KebabCase<`${Second}${Rest}`>}`
    : `${Lowercase<First>}${KebabCase<`-${Lowercase<Second>}${Rest}`>}`
  : S

type RemoveDash<S> = S extends `${infer F}${infer R}`
  ? F extends '-'
    ? R
    : S
  : S

// type KebabCase<S> = S extends `${...infer F}${infer R}`
//   ? F extends Lowercase<F>
//     ? `${F}${KebabCase<R>}`
//     : `-${Lowercase<F>}${KebabCase<R>}`
//   : RemoveDash<S>

type Test = KebabCase<'FooBarBaz'>
type Test2 = Uppercase<'😎'>
type Test3 = Lowercase<'-'>
type Test4 = Uppercase<'-'>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/612/answer/ko
  > 정답 보기: https://tsch.js.org/612/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
