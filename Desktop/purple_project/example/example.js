// const SHOWING_CLASS = "showing";
// const firstSlide = document.querySelector("li.slider_item");

// function slide(){
//     const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);

//     if(currentSlide){
//         currentSlide.classList.remove(SHOWING_CLASS);
//         const nextSlide = currentSlide.nextElementSibling;

//         if(nextSlide){
//             nextSlide.classList.add(SHOWING_CLASS);
//         }else{
//             firstSlide.classList.add(SHOWING_CLASS);
//         }
//     }else{
//         firstSlide.classList.add(SHOWING_CLASS);
//     }
// }
// slide();
// setInterval(slide, 2000);
$(document).ready(function(){
    $('.header_slide_box ul').slick({
        slidesToShow:1,
        slidesToScroll:1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2500,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });
    $('.header_slide_box ul').slick('init');
    $('.header_slide_box ul').slick('resize');
    
});
