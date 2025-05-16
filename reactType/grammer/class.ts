class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHi() {
    alert(this.name + "hi!");
  }
}

let user = new User("John");
user.sayHi();

// 클래스 상속: extends 상위클래스이름
class Student extends User {
  level: number;
  constructor(name: string, level: number) {
    //상위객체 constructor가 실행되고 하위가 실행되야 하는데
    // super()로 상위 constructor를 부른다.
    super(name);
    this.level = level;
  }
  study() {
    console.log(this.name, "학생 공부해");
  }
  sayLevel() {
    console.log(this.name, "은 레벨", this.level);
  }
}

const student = new Student("Lee", 3);
student.study();

// protected 상속시킨 하위 클래스에서 protected호출가능
class Korean {
  gender: boolean;
  constructor(gender: boolean) {
    this.gender = gender;
  }

  protected sayHi() {
    // private sayHi() { // 외부, 내부 다 오류남.
    console.log("hi", this.gender);
  }
}

class People extends Korean {
  sayBye() {
    this.sayHi();
  }
}

const users = new User("김개발");
users.sayHi(); //외부사용은 오류남
