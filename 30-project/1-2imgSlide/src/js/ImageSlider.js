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
    this.sliderListEl = this.sliderWrapEl?.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl?.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl?.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl?.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl?.querySelector('#control-wrap');
  }

  initAutoplay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  stopAutoplay() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
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
    this.nextBtnEl?.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl?.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl?.addEventListener('click', this.onClickIndicator.bind(this));
    this.controlWrapEl?.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    console.log('controlWrapEl:', this.controlWrapEl); // null이면 원인 확실
    const status = event.target.dataset.status;
    const isPlay = status === 'play';
    this.#autoPlay = isPlay;

    this.controlWrapEl.classList.toggle('play', isPlay);
    this.controlWrapEl.classList.toggle('pause', !isPlay);
    if (isPlay) {
      this.initAutoplay(); // ✅ 재시작
    } else {
      this.stopAutoplay(); // ✅ 멈춤
    }
  }

  onClickIndicator(event) {
    const li = event.target.closest('li');
    if (!li || !li.dataset.index) return; // li를 못 찾으면 무시

    const indexPosition = parseInt(li.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;
      this.setIndicator();
    }
  }

  moveToRight() {
    this.#currentPosition = (this.#currentPosition + 1) % this.#slideNumber;
    this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;

    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition =
      this.#currentPosition === 0 ? this.#slideNumber - 1 : this.#currentPosition - 1;
    this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;

    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
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
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    ulEl.appendChild(docFragment);
  }

  setIndicator() {
    const activeEl = this.indicatorWrapEl.querySelector('li.active');
    if (activeEl) activeEl.classList.remove('active');

    const newActive = this.indicatorWrapEl.querySelector(
      `ul li:nth-child(${this.#currentPosition + 1})`,
    );
    newActive?.classList.add('active');
  }
}
