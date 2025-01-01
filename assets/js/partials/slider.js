import Swiper, { Navigation, EffectFade, Autoplay } from 'swiper/bundle';
import 'swiper/css/bundle';
const  swiper = new Swiper('.slider', {
  
    spaceBetween: 10,
    grabCursor: true,
    speed: 500,
    loop: true,
    pagination: {
      el: '.slider__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 3,
        }
    },
});