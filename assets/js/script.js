var interval1;
var timer1;
var interval2;
var timer2;

$(document).ready(function(){
  $('#projects-div .carousel-link:gt(0)').hide(); // to hide all but the first image when page loads
  $('#research-div .carousel-link:gt(0)').hide(); // to hide all but the first image when page loads

  timer1 = function(){
  interval1=setInterval(function () {
      if ( document.visibilityState=="visible" ) {
        $('#projects-div .carousel-link:first-child').fadeOut(1000)
            .next().fadeIn(1000).end().appendTo('#projects-div');
    }}, 5000);
  };

  timer2 = function(){
  interval2=setInterval(function () {
      if ( document.visibilityState=="visible" ) {
        $('#research-div .carousel-link:first-child').fadeOut(1000)
            .next().fadeIn(1000).end().appendTo('#research-div');
    }}, 5000);
  };

  timer1();
  timer2();
});

function nextImg(divID){
  $(divID+' .carousel-link:first-child').fadeOut(1000)
      .next().fadeIn(1000).end().appendTo(divID);
  if (divID=='#projects-div') {
    clearInterval(interval1);
    timer1();
  } else if (divID=='#research-div') {
    clearInterval(interval2);
    timer2();
  }
}

function prevImg(divID){
  $(divID+' .carousel-link:first-child').fadeOut(1000);
  $(divID+' .carousel-link:last-child').fadeIn(1000);
  $(divID+' .carousel-link:last-child').prependTo(divID);
  if (divID=='#projects-div') {
    clearInterval(interval1);
    timer1();
  } else if (divID=='#research-div') {
    clearInterval(interval2);
    timer2();
  }
}
