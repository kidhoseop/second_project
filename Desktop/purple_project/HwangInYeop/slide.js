$(function () {
  $('.slide-box').slick({
    adaptiveHight: !0,
    slidesToShow: 1,
    autoplay: true,
    autoPlaySpeed: 3500,
    // dots: true,
    arrows: false,
    pauseOnHover: true,
    // fade: true,
  })

  $('.login-page').click(function () {
    $(location).attr('href', '/login.html')
  })

  $(document).on('mouseenter', '.thumb-img', function () {
    var im = $(this).data('imgss')
    $('.good-image').css({ background: 'url(' + im + ')' })
  })
})

$('.product-row a').on('click', function (e) {
  $('.product-row a img').each(function (k, o) {
    var s = $(this).attr('src').replace
  })
})

// function openPostcode() {
//   new daum.Postcode({
//     oncomplete: function (data) {
//       document.getElementById('post-code').value = data.postcode1 + data.postcode2 + '' + data.address
//       // var addr = data.address.replace(/(\s|^)\)(.+\)$+~\S+/g,");
//       // document.getElementById('addr').value=addr;
//       document.getElementById('addr2').focus()
//     },
//   }).open()
// }
