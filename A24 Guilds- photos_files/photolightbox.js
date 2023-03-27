var gIndex = 0;
var images = [];
var thumbPos = 0;
var thumbIndex = 0;
var numThumbs = 0;

$(".photo-block img, .preview").click(function (e) {
  e.preventDefault();
  openPhoto($(this));
  gIndex = $(this).closest(".photo-block").index();
  if ($(this).closest(".photo-block").is(":first-child")) {
    $(".prev-img img").hide();
    $(".next-img img").show();
  } else if ($(this).closest(".photo-block").is(":last-child")) {
    $(".prev-img img").show();
    $(".next-img img").hide();
  } else {
    $(".prev-img img").show();
    $(".next-img img").show();
  }
})

function openPhoto(clicked) {
  reset();
  hideThumbs();
  $(".photo-player").show();
  var w = $(".photo-player").width();
  var h = $(".photo-player").height();
  var src = clicked.attr("data-desktop-image");
  $(".frame").attr("src", src);
  $("#page-wrap, .md-photos, .xs-photos, .footer-block").addClass("playing");
}

function reset() {
  $(".photo-player").hide();
  $("#page-wrap, .md-photos, .xs-photos, .footer-block").removeClass("playing");
  $(".md-photos, .xs-photos").show();
}

function hideThumbs() {
  if ($(".col-xs-8 .photo-block").length == 1) {
    // changed this to show thumbs but hide arrows
    // $(".md-photos, .xs-photos").hide();
    $(".next-img, .prev-img").hide();
  }
}

function nextImg() {
  if (gIndex == 0) {
    $(".prev-img img").show();
  }
  gIndex++;
  $(".frame").attr("src", images[gIndex]);
  if (gIndex == $(".col-xs-8 .photo-block").length - 1) {
    $(".next-img img").hide();
  }
}

function prevImg() {
  if (gIndex == $(".col-xs-8 .photo-block").length - 1) {
    $(".next-img img").show();
  }
  gIndex--;
  $(".frame").attr("src", images[gIndex]);
  if (gIndex == 0) {
    $(".prev-img img").hide();
  }
}

function thumbsLeft() {
  if (thumbIndex + 5 == numThumbs) {
    $(".next img").show();
  }
  thumbPos += 500;
  $(".thumbs-inner").css({
    "transform": "translateX(" + thumbPos + "px)",
    "-webkit-transform": "translateX(" + thumbPos + "px)"
  });
  thumbIndex--;
  if (thumbIndex == 0) {
    $(".previous img").hide();
  }
}

function thumbsRight() {
  if (thumbIndex == 0) {
    $(".previous img").show();
  }
  thumbPos -= 500;
  $(".thumbs-inner").css({
    "transform": "translateX(" + thumbPos + "px)",
    "-webkit-transform": "translateX(" + thumbPos + "px)"
  });
  thumbIndex++;
  if (thumbIndex + 5 >= numThumbs) {
    $(".next img").hide();
  }
}

$(document).ready(function () {
  openPhoto($(".photo-block:first-child img"));
  //$("body > .body-container:not(.lg)").hide();
  for (i = 0; i < $(".col-xs-8 .photo-block").length; i++) {
    var foo = $(".col-xs-8 .photo-block")[i];
    images.push($(foo).find("img").attr("data-desktop-image"));
  }
  numThumbs = images.length;
  if (numThumbs <= 5) {
    $(".next img").hide();
  }
  $(".previous img").click(function (e) {
    thumbsLeft();
  })
  $(".next img").click(function (e) {
    thumbsRight();
  })
  $(".next-img img").click(function (e) {
    nextImg();
  })
  $(".prev-img img").click(function (e) {
    prevImg();
  })
})