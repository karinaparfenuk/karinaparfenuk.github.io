/**
 * Инициализация функции маски для поля телефона
 * Документация: https://imask.js.org/guide.html
 */
function initPhoneMask() {
  $('input[type=tel]').each(function(index, element) {
    var mask = IMask(element, {
      mask: [
        {
          mask: '+7 (000) 000-00-00',
          startsWith: '+7',
          country: 'Russia',
        },
        {
          mask: '+7 (000) 000-00-00',
          startsWith: '7',
          country: 'Russia',
        },
        {
          mask: '0 (000) 000-00-00',
          startsWith: '8',
          country: 'Russia',
        },
        {
          mask: '+7 (000) 000-00-00',
          startsWith: '',
          country: 'unknown',
        },
      ],
      dispatch: function dispatch(appended, dynamicMasked) {
        var number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return dynamicMasked.compiledMasks.find(function(m) {
          return number.indexOf(m.startsWith) === 0;
        });
      },
    });
    $(this).blur(function() {
      var maskValue = mask.unmaskedValue;
      var startWith = 10;

      if (maskValue.charAt(0) === '8') {
        startWith = 11;
      }

      if (maskValue.length < startWith) {
        mask.value = '';
      }
    });
  });
}

$(function() {
  objectFitImages();
  initPhoneMask();
  $(document).on('click', '#open_menu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('132');
    $('aside.menu').addClass('opened');
  });
  $('#close_menu').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('aside.menu').removeClass('opened');
  });
  $('.doctor_slider').slick({
    slidesToShow: 1,
    variableWidth: true,
    adaptiveHeight: true,
  });
  var currentSlide = $('.doctor_slider').slick('slickCurrentSlide');
  $('.doctors span.current_slide_nomber').text(currentSlide + 1);
  $('.doctor_slider').on('afterChange', function(event, slick, currentSlide) {
    $('.doctors span.current_slide_nomber').text(currentSlide + 1);
  });
  $('.doctors button.blue_button,.doctors .doctor_slider_next').on(
    'click',
    function() {
      $('.doctor_slider').slick('slickNext');
    },
  );
  $('.doctors button.white_button,.doctors .doctor_slider_prev').on(
    'click',
    function() {
      $('.doctor_slider').slick('slickPrev');
    },
  );
  $('.team_slider').slick({
    slidesToShow: 3,
    arrows: false,
    variableWidth: true,
  });
  var currentSlide = $('.team_slider').slick('slickCurrentSlide');
  $('.team span.current_slide').text('0' + (currentSlide + 1));
  $('.team span.all_slides_count').text(
    '0' + $('.team_slider').slick('getSlick').slideCount,
  );
  $('.team .current_progress').css({
    width: '0%',
  });
  $('.team_slider').on('afterChange', function(event, slick, currentSlide) {
    var width = ((currentSlide + 1) / slick.slideCount) * 100;
    $('.team .current_progress').css({
      width: width + '%',
    });
    $('.team span.current_slide').text(
      currentSlide < 10 ? '0' + (currentSlide + 1) : currentSlide + 1,
    );
  });
  $('.team button.button_next').on('click', function() {
    $('.team_slider').slick('slickNext');
  });
  $('.team button.button_prev').on('click', function() {
    $('.team_slider').slick('slickPrev');
  });
});
