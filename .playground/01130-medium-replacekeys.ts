/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #보통 #object-keys

  ### 질문

  Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
  A type takes three arguments.


  For example:

  ```ts
  type NodeA = {
    type: 'A'
    name: string
    flag: number
  }

  type NodeB = {
    type: 'B'
    id: number
    flag: number
  }

  type NodeC = {
    type: 'C'
    name: string
    flag: number
  }


  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
  ```

  > GitHub에서 보기: https://tsch.js.org/1130/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// 1. 키가 T에도 있고 Y의 키에도 있다. Y[Key]
// 2. 키가 T에는 있고 Y의 키에는 없다. never
// 3. 키가 T에도 없고 Y의 키에도 없다. U[Key]
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]: P extends keyof Y ? Y[P] : P extends T ? never : U[P]
}

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type Test = ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>
type TestA = ReplaceKeys<NodeA, 'name' | 'flag', { name: number; flag: string }>
type TestB = ReplaceKeys<NodeB, 'name' | 'flag', { name: number; flag: string }>
type TestC = ReplaceKeys<NodeC, 'name' | 'flag', { name: number; flag: string }>

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>,
      ReplacedNodes
    >
  >,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/1130/answer/ko
  > 정답 보기: https://tsch.js.org/1130/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
