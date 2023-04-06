/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #math #template-literal

  ### 질문

  Implement the `Absolute` type. A type that take string, number or bigint. The output should be a positive number string

  For example

  ```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
  ```

  > GitHub에서 보기: https://tsch.js.org/529/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer S}`
  ? `${S}`
  : `${T}`

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/529/answer/ko
  > 정답 보기: https://tsch.js.org/529/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
