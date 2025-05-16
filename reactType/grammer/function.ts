// 튜플타입
type MenuType = [string, number, number];
const menu1: [string, number, number] = ["치킨", 20000, 2];
const menu2: MenuType = ["햄버거", 300, 1];

const getReceipt = (arr: MenuType[]) => {
  let total = 0;
  //  계산코드
  return total;
};

getReceipt([menu1, menu2]);

// 타입추론
// return문이 없으면 타입이 void, 있으면 추론됨.
let x = 12;

const y = 12;

const student = {
  name: "김씨",
  age: 20,
  score: {
    국어: 100,
    수학: 90,
    영어: 80,
  },
};

// 함수타입. 함수에서 함수호출
type ShowMsgType = (msg: string) => void;

const showMsg: ShowMsgType = (msg) => {
  alert(msg);
};

const someFunc = (msg: string, showMsg: ShowMsgType) => {
  showMsg(msg.toUpperCase());
};

someFunc("hello", showMsg); // 출력: HELLO

// 선택적 매개변수와 기본 매개변수
// 매개변수parameter, 인자argument
const sum = (a: number, b: number) => {
  // 소괄호 안 a,b는 매개변수
  return a + b;
};

sum(3, 5); //sum안의 숫자는 인자
console.log(3, 5); // 8

//선택적 매개변수
const ex1 = (name: string, job: string) => {
  console.log(name, " ", job);
};
ex1("김가", "개발자");

// (name: string, job?: string) 옵셔널체이닐을 쓰면 오류가 안남.
// 이것이 선택적 매개변수  Optional Parameter
const ex2 = (name: string, job: string) => {
  console.log(name, " ", job);
};
ex2("김가");

// job: string = "학생" 여기서 "학생"은 기본값. 기본매개변수 Default Parameter
const ex3 = (name: string, job = "학생") => {
  console.log(name, " ", job);
};

// 나머지매개변수 ' ... ' 항상 매개변수 마지막에 적어야함
const func = (first: number, second: number, ...rest: number[]) => {
  console.log("first: ", first); // "first", 1
  console.log("second: ", second); // "second", 2
  console.log("rest: ", rest); // "rest" ,[3,4,5]
};
func(1, 2); // "first", 1 "second", 2 "rest", []
func(1, 2, 3, 4, 5);

// 타입이 다양할 땐 나머지매개변수 보단 명확하게 타입을 적는 것이 좋다.
const func2 = (...rest: (number | string)[]) => {
  console.log("rest", rest);
};
func2(1, 2, "hi");

// 유니언 타입 버티컬바 ' | '
const func3 = (id: string | number) => {
  if (typeof id === "string") {
    console.log("id", id.toUpperCase());
  } else {
    console.log("id", id);
  }
};
func3("abc");
func3(123);

// 교차타입
// x & y => 두타입을 합해 새로운 타입을 만듬.
type Person = {
  name: string;
  age: number;
};

type School = Person & {
  isStudent: boolean;
};

// Person, Student 같은 오브젝트 타입을 합쳐서 새로운 타입이 생겨남.
const func5 = (student: School) => {
  student.age;
  student.isStudent;
  student.name;
};

// 단, 아래처럼 쓰면 never 타입-존재할 수없는 타입
type SomeType = string & number;

// Type Aliases사용- 가독성 높아지고, 중복 줄어듬.
type Human = {
  name: string;
  age: number;
};

type HumanId = number | null;

type Korean = Human & {
  i: HumanId;
};
const user1: Human = {
  name: "Park",
  age: 10,
};

type TupleType = [number, string];
const tuple1: TupleType = [10, "hello"];
const tuple2: [number, string] = [20, "hi"];

//type과  interface차이
/*
 * 1. 모양
 */
type Person2 = {
  name: string;
  age: number;
};
interface People3 {
  name: string;
  age: number;
}
/*
 * 2. 타입 확장
 */
type School2 = Person2 & {
  id: number;
};
interface School3 extends People3 {
  id: number;
}
/**
 * 3. interface는 같은 이름으로 정의 할 시 자동으로 합쳐짐.
 */
type Person3 = {
  id: number;
};
type Person3 = {
  grade: number;
};

// 선언적 확장: 인터페이스는 이름이 같으면 확장됨., 객체에만 사용가능.
interface People4 {
  grade: number;
}
interface People4 {
  exam: boolean;
}
let myUser: People4;
myUser.exam;
myUser.grade;

// 유니언, 튜플은 타입엘리어스로만 작성가능.
// 유니언, 튜플 제외하고 interface를 사용할것을 추천.
type AB = "A" | "B";
type TupleType2 = [string, number];

//리터럴타입- (값이 변하면 안될때 사용)특정 값만 받는것 const b = 1; 리터럴타입으로 추론.
let a = 1;
const b = 1;
type BloodType = "A" | "B" | "O" | "AB"; //타입을 좁힌다-타입의 범위를 가능한 좁히는것,
let c = 2 as const; // 리터럴타입으로 고정되어 리터럴타입으로 추론됨.

const options = ["착한맛", "보통맛", "매운맛"] as const; // 수정이 불가능하게됨(고정값). string[]에서 리터럴타입이됨.
interface Item {
  //number, string으로 적을때 보다 값이 고정되어 문자열 오타로 오류날 확률을 줄임.
  code: 280 | 281 | 282 | 283;  //number;
  size: "small" | "medium" | "large" | "xlarge";  //string;
}
const selectedItem: Item {
  code: 0, //
  size: XL
}