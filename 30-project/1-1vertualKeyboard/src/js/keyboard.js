export class Keyboard {
  #containerEl;
  #switchEl;
  #fontSelectEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme.bind(this));
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont.bind(this));

    document.getElementById("input").addEventListener("input", (e) => this.#onInputHangul(e));

    document.addEventListener("keydown", (e) => this.#onKeyDown(e));
    document.addEventListener("keyup", (e) => this.#onKeyup(e));
    // this.#inputEl.addEventListener("input", this.#onInput.bind(this));

    this.#keyboardEl.addEventListener("mousedown", (e) => this.#onMouseDown(e));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }
  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;

    // if(isActive && !!val && val !== "Space" && val !== "Backspace") {
    // !["Space", "Backspace"].includes(val): val이 둘중 하나일 때 실행.
    if (isActive && !!val && !["Space", "Backspace"].includes(val)) {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }

    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
    // event.target.closest("div.key")?.classList.remove("active");
  }

  #onInputHangul(e) {
    const value = e.target.value;
    const hasHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);
    this.#inputGroupEl.classList.toggle("error", hasHangul);
  }
  // #onInput(event) {
  //   const hangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

  //   // 한글이 입력되면 입력 안된 것 처럼 빈문자열 넣어서 처리.
  //   this.#inputEl.value = event.target.value.replace(hangul, "");
  //   console.log(this.#inputEl.value);
  //   // console.log(event.target.value);  // this.#inputEl.value 코드와 동일
  // }
  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    // console.log(event.code);
    const hasHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(event.key);
    this.#inputGroupEl.classList.toggle("error", hasHangul);

    this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add("active");
  }
  #onKeyup(event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    if (this.#keyboardEl.querySelector(`[data-code=${event.code}]`)) {
      this.#keyboardEl.querySelector(`[data-code=${event.code}]`).classList.remove("active");
      // console.log("keyup");
    }
  }
  #onChangeTheme(event) {
    document.documentElement.setAttribute("theme", event.target.checked ? "dark-mode" : "");
  }
  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
