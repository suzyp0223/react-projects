/**
 * 추상클래스
 * 클래스, 클래스의 메서드에abstract 키워드를 사용해서 표현.
 * 추상 메서드느 정의만 되어있고, 구현은 되어있지 않음.
 * 추상 클래스는 인스턴스instance를 만들 수 없음.
 * 추상 크래스를 상속받은 하위 클래스에서 추상 클래스 내에 정의된 추상 메서드를 반드시 구현해야 함.
 */

abstract class Person {
  name: string;
  constructor(name: string) { //홍길동3
    this.name = name; //this.name에 홍길동이 들어감4
  }
  abstract getName(): string;

  printName() {
    console.log("hi", this.getName()); // getName이 호출되서 저장된 홍길동 출력6
  }
}

// 추상클래스에서 getName()선언만 했으니 하위에서 꼭 만들어야함.
class Student extends Person {
  constructor(name) { //홍길동1
    super(name); //홍길동2
  }
  getName() {
    return this.name;  // this.name에 홍길동이 저장됨5
  }

  sayBye() {
    console.log("Bye!");
  }
}

const someOne = new Student("홍길동");
someOne.printName();
console.log();