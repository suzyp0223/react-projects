//제네릭: 사용처에서 타입을 정해 전달.
// T 타입변수: 무슨타입인지 알 수 없은건 any와 동일

// 타입변수T./ 매개변수(인자) 타입과 리턴타입이 동일.
function identity<T>(arg: T): T {
  return arg;
}
// 타입변수로 string작성. 들어오는 타입, 나가는 타입이 string 이됨.
let outPut = identity<string>("문자열");

// <T>(arg: T) => T: 인자 T, 리턴타입 T
type IdentityType = <T>(arg: T) => T;
// const identity2: <T>(arg: T) => T = (arg) => {
const identity2: IdentityType = (arg) => {
  return arg;
};

function identity3<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
let output = identity3<number>([1, 2, 3]);

//튜플타입으로 리턴
function mix<T, U>(arg1: T, arg2: U): [T, U] {
  return [arg1, arg2];
}
mix<number, string>(3, "hello");

/** 클래스에서 제네릭 사용 */
class List<T> {
  data: T[];
  constructor(data: T[]) {
    this.data = data;
  }

  add(item: T) {
    this.data = [...this.data, item];
  }
}
const list = new List<number>([]); // 초기배열
list.add(1);

/** 인터페이스에서 제네릭 사용 */
interface Person<T> {
  name: string;
  id: T;
}

let person: Person<number> = {
  name: "abc",
  id: 10,
};

/**
 * 제네릭 제약조건
 * extends
 */
interface Lengthwise {
  length: number;
}
function identity4<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
identity4(100); //Lengthwise 의 length라는 프로퍼티가 있는 것만 가능.
identity4({ name: "na", length: 100 }); //랭스에 숫자가 있는 객체타입
