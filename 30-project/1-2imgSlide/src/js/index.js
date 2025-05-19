import '../css/style.css';
import Slider from './ImageSlider';

document.addEventListener('DOMContentLoaded', () => {
  new Slider(); // ✅ DOM 완전히 준비된 뒤에 실행
});
