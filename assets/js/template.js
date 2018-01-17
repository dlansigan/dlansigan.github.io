$(document).ready(

	function(){

		$(window).scroll(
			function(){

				var scrollFactor = $("body").scrollTop() / $(window).height();
				var opacityVal = 1*scrollFactor + 0;
				$("#foreground-filter").css("opacity", opacityVal);
			}

		)
	})
$("#scrolltotop").click(
	function(){
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	})

$("#scrolltotop").hover(
	function(){
		$(this).css("cursor", "pointer");
	})
$(".expand-button").click(
  function(){
    var activeDetails = $(this).attr("value");
    if( $(activeDetails).height() == 0 ){
      $(activeDetails).animate({ height: "40vh"}, 1000);
      $(".pic-button-text").css("font-size", "100%");
    }
    else{
      $(activeDetails).animate({ height: "0"}, 1000);
      $(".pic-button-text").css("font-size", "200%");
    }
    $(".details").not(activeDetails).animate({ height: "0"}, 1000);
  }
);

$(".expand-button-x").click(
  function(){
    var activeDetails = $(this).attr("value");
    if( $(activeDetails).width() == 0 ){
      $(activeDetails).animate({ width: "50%"}, 1000);
    }
    else{
      $(activeDetails).animate({ height: "0"}, 1000);
    }
    $(".details").not(activeDetails).animate({ width: "0"}, 1000);
  }
);
