// 리드온니 지정자는 값이 바뀔 일 없을 때 사용.
class User2 {
  // readonly name: string = '홍길동'; //가능.
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHi() {
    this.name = "김개발"; //readonly 프로퍼티를 주면 값을 할당하는게 불가능함.
    alert(this.name + "hi!"); //김개발로 덮어짐.
  }
}

let user2 = new User2("John");
user2.sayHi();

// _변수명: 프라이빗 변수를 의미
// 셋터 없으면 자동으로 리드온니가됨.
// 값을 보호하기 위해 많이 씀.
class C {
  private _count = 0;

  get count() {
    return this._count;
  }

  //_count 를 직접 바꾸는걸 막기위해 셋터 사용.
  set count(value) {
    //인자로 받은 value를 값으로 할당: set
    if (value < 0) {
      throw new Error("에러 value가 0보다 작습니다");
    }
    this._count = value;
  }
}

const c = new C(); //인스턴스. 인스턴스를 통해서 클래스 값이나 함수에 접근

c.count = 10;
console.log(c.count); // 셋터 사용해서 값이 10으로 바뀜.


// static: 인스턴스 통해서 접근할 필요없음.
class K {
  static score = 100;

  //static에서 못쓰는 변수 이름 name, length:
  static name = "hi";
  static length = 0;

  static printScore() {
    console.log(K.score);
  }
}
console.log(K.score);
K.printScore();
