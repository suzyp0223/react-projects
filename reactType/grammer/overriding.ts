// 하위클래스에서 동일한 이름으로 정의하면 덮어씌워져 작동한다: 메서드 오버라이딩
class Person1 {
  sayHello() {
    console.log("hello!!!!!!");
  }
}

class highStudent extends Person1 {
  sayHello(name?: string) {

    if (name === undefined) {
      super.sayHello();  //상위의 메서드를 쓰고 싶을때 ( super.상위메서드 ) 이렇게 호출한다.
    } else {
      console.log("Hello", name);
    }
  }
}

const student = new highStudent();
student.sayHello('영수');
