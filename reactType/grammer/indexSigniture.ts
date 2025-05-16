/**
 * 인덱스  시그니처
 * 객체의 키 이름을 아직 모르고, 타입만 알고 있는 경우 사용한다.
 * 어떤 타입이 올지 알 수 있는 상황이라면,
 * 인덱스 시그니처를 사용하기보다는 최대한 정확하게 타입을 정의하는 것이 나음.
 * 런타임에 객체 프로퍼티를 정말 알 수 없는 경우에만 사용할 것
 */
interface UserType {
  [index: string]: string;
}

const user: UserType = { userName: "Lee", age: "20" };

// 인덱스시그니처와 같이 사용하는 다른 프로퍼티
interface NumberDic {
  [index: string]: number | string;
  length: number;
  name: string;
}

interface Test {
  readonly [index: string]: number | string;
}

let arr: Text;
arr[2] = "abcd"; // readonly를 사용하면 타입은 사용가능, 할당은 불가능함.

/**
 * 인덱스 타입과 인덱스 시그니처
 */
type Point = {
  x: number;
  y: number;
};
type P = keyof Point; // 동일함 type P = 'x' | 'y';

type Arrayish = { [n: number]: unknown }; // key가 number, 값 unknown
type A = keyof Arrayish; //  [n: number] 이걸 가져옴. 결국 type A = number; 와 같은 코드

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// 들어온건 number지만 사실은 string 키임. 그래서 type M = string | number; 와 같음.


//자주쓰는 keyof, typeof
// as const 붙이면 readonly됨. 가져다 쓰기만함.
const DevelopStatus = { //리터럴타입
  read: '준비 중',
  develop: '개발 중',
  complete: '개발 완료',
} as const;

//read, develop, complete의 유니언타입이됨.
let myStatus: keyof typeof DevelopStatus = 'ready';
