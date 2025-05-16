const array: string[] = ["a", "b,", "c"];

// 길이가 1이고 튜플타입인 스트링
const array1: [string] = ["a"];

const array2: number[] = [1, 2, 3];
const array3: boolean[] = [true, true, false];
const array4: (string | number)[] = ["a", 0, "hello"];

// Tuple-  길이와 타입이 고정된 배열
let user: [string, number, boolean] = ["hi", 1, true];

// enum 타입- 이름이 있는 상수들이 열거되어있는 집합
enum BloodType {
  A,
  B,
  O,
  AB,
}

const myBloodType = BloodType.B;
console.log('myBloodType: ', myBloodType); 
