$(document).ready(function() {

  $('.hamburger').click(function() {
    $('.hamburger').hide();
    $('.hamburger-pressed').show();
    $('.film-navbar-collapse').show();
  });

  $('.hamburger-pressed').click(function() {
    $('.hamburger-pressed').hide();
    $('.hamburger').show();
    $('.film-navbar-collapse').hide();
  });

  $('.player').each(function() {
    var player = $(this);
    var play = $(this).find('.play-btn');
    var pause = $(this).find('.pause-btn');
    var track = $(this).find('audio').get(0);
    var progress = $(this).find('.track-progress');
    var tick;

    function playing() {
      var m = ("0" + Math.floor(track.currentTime / 60)).slice(-2);
      var s = ("0" + Math.floor(track.currentTime - m)).slice(-2);
      $(player).find('.track-timing .current').html(m + ":" + s);
      var currentProgress = "" + Math.floor((track.currentTime / track.duration) * 100) + "%";

      $(progress).stop();
      $(progress).animate({
        width: currentProgress
      }, 1000);
    }

    function reset(host) {
      $('.play-btn').show();
      $('.pause-btn').hide();
      $('.player').not($(host)).each(function() {
        var track = $(this).find('audio').get(0);
        track.pause();
        track.currentTime = 0;
        $('.track-progress').stop();
        $(this).find('.track-progress').width(0);
        $(this).find('.track-timing .current').html("00:00");
      });
    }
    track.ontimeupdate = function() {
      playing()
    };

    $(play).click(function() {
      reset(player);
      track.play();
      $(play).hide();
      $(pause).show();
      var m = ("0" + Math.floor(track.duration / 60)).slice(-2);
      var s = ("0" + Math.floor(track.duration - m)).slice(-2);
      $(player).find('.track-timing .total').html(m + ":" + s);
      // tick = setInterval(function () {
      //   playing();
      //   if (track.paused == true) {
      //     clearInterval(tick);
      //   }
      // }, 250)
    });
    $(pause).click(function() {
      track.pause();
      $(play).show();
      $(pause).hide();
      // clearInterval(tick);
    });
    $(track).bind("ended", function() {
      reset(".null");
      $(player).next('.player').find('.play-btn').click();
    });




    //get track duration and display as mm:ss
    track.onloadeddata = function() {
      var m = ("0" + Math.floor(track.duration / 60)).slice(-2);
      var s = ("0" + Math.floor(track.duration - m)).slice(-2);
      $(player).find('.track-timing .total').html(m + ":" + s);
    }

    $(window).load(function() {
      var m = ("0" + Math.floor(track.duration / 60)).slice(-2);
      var s = ("0" + Math.floor(track.duration - m)).slice(-2);
      $(player).find('.track-timing .total').html(m + ":" + s);
    });

  });

  // NONFUNCTIONAL - This function will reload all audio files after the user clicks 'play'
  // function recursive_load(player) {
  //   audio = $(player).find('audio').get(0);
  //   audio.load();
  //   console.log("loading...");
  //   audio.oncanplaythrough = function() {
  //     if ($(player).next().length) {
  //       recursive_load($(player).next());
  //     } else {
  //       console.log("Loading Completed.");
  //     }
  //   }
  // };
  // if ($('.player').length) {
  //   recursive_load($('.player').first());
  // }

});
