/**
 * 조건부 타입
 */
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

// createLabel의 : NameOrId<T>이 문자열 타입이 되고 type NameOrId로 넘어가서 false의 NameLabel이 호출,
// createLabel의 : NameOrId<T>의 값은 NameLabel이 된다.
let a = createLabel("typescript");
let b = createLabel(1234);
let c = createLabel(Math.random() ? "hello" : 12); //  NameLabel | IdLabel 타입 둘다 가능.

/**
 * 분산 조건부 타입, 수학의 분배법칙 ax + bx = (a + b)x
 * 제네릭 타입 위에서 조건부 타입은 유니언 타입을 만나면 분산적으로 동작함.
 */
type T = number | boolean;
type Test<T> = T extends number ? T : null; // number를 상속받으면 T 아니면 널,
type A = Test<T>; // 넘버 상속받아서 number와 null나옴.


/**
 * 조건부 타입의 추론
 * infer 키워드
 * extends 키워드와 함께 사용되며, 타입스크립트가 런타임에서 타입을 추론하게 됨.
 */

T extends infer U ? X : Y; // U 자리에 추론한 타입값을 할당.
// length라는 프로퍼티가 있으면 랭쓰 타입을 가져옴.
// 랭쓰 타입을 추론한 값이 U에 들어옴.
type LengthType<T> = T extends { length: infer U } ? U : never;
type w = LengthType<{ length: number }>; //그래서 U가 number가됨.
type w2 = LengthType<{ length: string }>; //그래서 U가 string.
