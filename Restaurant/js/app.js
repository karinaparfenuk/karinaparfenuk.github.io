/**
 * Инициализация функции маски для поля телефона
 * Документация: https://imask.js.org/guide.html
 */
function initPhoneMask() {
  $('input[type=tel]').each(function (index, element) {
    var mask = IMask(element, {
      mask: [{
        mask: '+7 (000) 000-00-00',
        startsWith: '+7',
        country: 'Russia'
      }, {
        mask: '+7 (000) 000-00-00',
        startsWith: '7',
        country: 'Russia'
      }, {
        mask: '0 (000) 000-00-00',
        startsWith: '8',
        country: 'Russia'
      }, {
        mask: '+7 (000) 000-00-00',
        startsWith: '',
        country: 'unknown'
      }],
      dispatch: function dispatch(appended, dynamicMasked) {
        var number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return dynamicMasked.compiledMasks.find(function (m) {
          return number.indexOf(m.startsWith) === 0;
        });
      }
    });
    $(this).blur(function () {
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

function goToSection(selector) {
  console.log(selector);
  $(".toggle_mobile_menu").removeClass("active");
  $(".mobile_menu").removeClass("active");
  $('html, body').animate({
    scrollTop: $(selector).offset().top
  }, 1000);
}

$(function () {
  objectFitImages();
  initPhoneMask();
  $("#datepicker").datepicker({
    dateFormat: "dd/mm/yyyy"
  });
  $(".toggle_mobile_menu").on("click", function (e) {
    if ($(".toggle_mobile_menu").hasClass("active")) {
      $(".toggle_mobile_menu").removeClass("active");
      $(".mobile_menu").removeClass("active");
    } else {
      $(".toggle_mobile_menu").addClass("active");
      $(".mobile_menu").addClass("active");
    }
  });
});