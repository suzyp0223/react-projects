/**
 * 타입가드- 타입 단언
 * 어떤 스코프 안에서 특정 타입을 보장하는 런타임 검사를 수행한다는 표현식
 */
//as

// 타입단언. string으로 추론이 잘되어 number로 단언하면 오류.
// "hello"를 리터럴타입 "hello"로 간주. 하지만 as string을 통해 이걸 string으로 다룸.
// "string 전체로 간주해라" 하고 강제로 단언하는것이 타입단언
const value = "hello"; // 리터럴 타입
const value1 = "hello" as number; // 리터럴타입을 number타입으로 단언
const value2 = "hello" as unknown as number; // unknown으로 타입선언하고 다시 number로 바꾸는 야매방법
const value3: string = "hello"; //타입선언. 명시적으로 타입선언. string을 리터럴이 아닌 일반 문자열로 간주함.
//is 타입서술어
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
const fish: Fish = { swim: () => console.log("swim") };
const bird: Bird = { fly: () => console.log("fly") };

function action(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

// in 연산자도 똑같이 타입가드 가능, 공통 프로퍼티가 있으면 안됨.
function action2(pet: Fish | Bird) {
  if ("swim" in pet) {
    pet.swim();
  } else {
    pet.fly();
  }
}

/**
 * instanceof
 * 어떤 객체가 어떤
 */
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const hello = new User('hello');
console.log(hello instanceof Object); //hello가 Object클래스의 인스턴스인가? //true
