interface PersonType {
  name: string;
  age: number;
  isStudent: boolean;
  studentNum?: number;
}
let value: string = "hello";
const person: PersonType = {
  name: "길동",
  age: 10,
  isStudent: true,
  studentNum: 1,
};

const getPersonAge = (person: PersonType) => {
  console.log(person.age);

};
