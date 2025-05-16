// undefined 일땐 ' ? ' 옵셔널체이닝 사용.

const loggedUser: string = "John";

const users = [
  { name: "kim", age: 10 },
  { name: "Lee", age: 30 },
];

const loggedInUser = users.find((u) => u.name === loggedUser);
console.log(loggedInUser?.age);

/**
 *   any  보단 unknown 사용하는 것이 좋다
 * @param a
 */

function ex(a: any) {
  a.toUpperCase();
}

function ex2(a: unknown) {
  a.toUpperCase();

  if (a === "string") {
    a.toUpperCase();
  } else {
    console.log("문자열이 아닙니다.");
  }
}
