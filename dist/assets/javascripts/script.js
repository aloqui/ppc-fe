$(function () {
  let aboutTheCompany = $('.about-the-company-inner')
  $('p').addClass('animate--fade-in')

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  $('.carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  $('.banner__greetings h1, .banner__sub-title').children().each((index, el) => {
    let element = $(el)
    setTimeout(() => {
      element.css({
        'transform': 'translateY(0)',
        'opacity': '1'
      })
    }, 400 * (index - ((index / 2) - 1)))
  })

  $(window).scroll(debounce(function () {
    let scrollTop = $(window).scrollTop() + ($(window).height() / 1.5);
    console.log(scrollTop)
    if (scrollTop > aboutTheCompany.offset().top) {
      aboutTheCompany.find('p').each((index, el) => {
        let element = $(el)
        setTimeout(() => {
          element.css({
            'transform': 'translateY(0)',
            'opacity': '1'
          })
        }, 200 * (index - ((index / 2) - 1)))
      })
    }
  }, 50)).scroll()
})