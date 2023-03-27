// hide nav films based on url query
$(document).ready(function () {

  // https://a24awards.com/?pga=true

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  var pga = getUrlParameter('pga');

  if (pga == 'true') {
    console.log("pga: ", pga);
    Cookies.set('pgaCookie', '1');

    var querystring = 'pga=true';

    $('a').each(function () {
      var href = $(this).attr('href');

      if (href) {
        href += (href.match(/\?/) ? '&' : '?') + querystring;
        $(this).attr('href', href);
      }
    });

  } else {
    Cookies.set('pgaCookie', '0');
  }




  var hideNav = Cookies.get('pgaCookie');

  console.log('hideNav', hideNav);

  if (hideNav == 1) {
    $(".navbar-films").addClass("hidden");
    $(".hamburgers").addClass("hidden");
  } else {
    $(".navbar-films").removeClass("hidden");
    $(".hamburgers").removeClass("hidden");
  }

  // $(".popup-close").click(hiddenNavCookieCloseCookie);

  // $(".popup-bg").click(function () {
  //   $(this).fadeOut("fast");
  //   hiddenNavCookieCloseCookie();
  // }).children().click(function (e) {
  //   return false;
  // });

});

// function hiddenNavCookieCloseCookie() {
//   $(".popup-bg").addClass("hidden");
//   Cookies.set('hiddenNavCookie', '1')
// }