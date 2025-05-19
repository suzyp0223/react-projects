export default class ImageSlider {
  #currentPosition = 0;
  #slideNumber = 0;
  #slideWidth = 0;
  #intervalId;
  #autoPlay = true;

  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;
  controlWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoplay();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderListEl.querySelector('#control-wrap');

    console.log('nextBtnEl:', this.nextBtnEl);
    console.log('previousBtnEl:', this.previousBtnEl);
    console.log('indicatorWrapEl:', this.indicatorWrapEl);

    console.log('sliderWrapEl:', this.sliderWrapEl);
    console.log('nextBtnEl:', this.nextBtnEl); // ✅ null이면 여기서 확인됨
  }

  initAutoplay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener('click', this.onClickIndicator.bind(this));
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    const status = event.target.dataset.status;
    const isPlay = status === 'play';

    this.#autoPlay = isPlay;
    this.controlWrapEl.classList.toggle('play', isPlay);
    this.controlWrapEl.classList.toggle('pause', !isPlay);

    if (isPlay) {
      this.initAutoplay();
    } else {
      clearInterval(this.#intervalId);
    }
  }

  onClickIndicator(event) {
    const li = event.target.closest('li');
    if (!li) return; // li를 못 찾으면 무시
    console.log('li clicked:', li); // ✅ li가 맞는지
    console.log('data-index:', li.dataset.index); // ✅ 이게 있어야 함

    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;
      this.setIndicator();
    }
    console.log('indexPosition: ', indexPosition);
  }

  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    // this.#currentPosition = (this.#currentPosition + 1) % this.#slideNumber;

    this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    // this.#currentPosition =
    // this.#currentPosition === 0 ? this.#slideNumber - 1 : this.#currentPosition - 1;

    this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;
    this.setIndicator();
  }

  // 인디케이터 생성
  createIndicator() {
    const ulEl = this.indicatorWrapEl.querySelector('ul');
    if (!ulEl) {
      console.error('❌ indicator-wrap 안에 <ul>이 없습니다.');
      return;
    }
    ulEl.innerHTML = ''; // ✅ 기존 인디케이터 초기화

    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i++) {
      const li = document.createElement('li');
      li.dataset.index = i; // 🔧 슬라이드 인덱스 번호 부여
      docFragment.appendChild(li);
    }
    ulEl.appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');

    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }

  /**
   *   setIndicator() {
    const activeEl = this.indicatorWrapEl.querySelector('li.active');
    if (activeEl) activeEl.classList.remove('active');

    const newActive = this.indicatorWrapEl.querySelector(
      `ul li:nth-child(${this.#currentPosition + 1})`
    );
    newActive?.classList.add('active');
  }
   */
}
