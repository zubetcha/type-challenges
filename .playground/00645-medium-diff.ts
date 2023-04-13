/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #보통 #object

  ### 질문

  Get an `Object` that is the difference between `O` & `O1`

  > GitHub에서 보기: https://tsch.js.org/645/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type Diff<First extends {}, Second extends {}> = {
//   [P in Exclude<
//     //  "age" | "gender"
//     keyof First | keyof Second, // "name" | "age" | "gender"
//     keyof First & keyof Second // "name"
//   >]: P extends keyof First
//     ? First[P]
//     : P extends keyof Second
//     ? Second[P]
//     : never
// }

type Diff<First extends {}, Second extends {}> = {
  [P in Exclude<
    //  "age" | "gender"
    keyof First | keyof Second, // "name" | "age" | "gender"
    keyof First & keyof Second // "name"
  >]: (First & Second)[P]
}

// type Diff<
//   First extends {},
//   Second extends {},
// > = keyof First extends keyof Second ? never : { [P in keyof First]: First[P] }

type Test = Diff<Foo, Bar>

// 깨닳음...

type Key2 = keyof Foo | keyof Coo
type Key = keyof Foo & keyof Coo

type Obj = Foo & Coo
type Obj2 = Foo | Coo

const obj1: Obj = {
  name: '',
  age: '',
  gender: 0,
}

type A = keyof { a: number } & keyof { b: number }

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/645/answer/ko
  > 정답 보기: https://tsch.js.org/645/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
