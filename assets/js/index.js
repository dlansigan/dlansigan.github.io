$(document).ready(
	function(){
		$("#splash-container").delay(1000).animate({ left: "5vw" }, 2000);
		$("#splash-bg-container").delay(1000).fadeIn(2500);
	})

function scrollTo(pos){
	  	$("body").animate({ scrollTop: $(window).height()*pos }, 2000);
	}

function dropNav(){
		$("#nav").slideToggle(1000);
	}

$(".popup").click(
	function(){
		var box = $(this).attr("value");
		$(box).fadeIn(500);
		$(".info-box").not(box).fadeOut(500);
	});

$(".info-box").click(
	function(){
		$(".info-box").fadeOut(500);
	});

$(".detail-box-close").click(
	function(){
		$(".detail-box").fadeOut(500);
	});

$(".slide-in").click(
	function(){	
		var active = $(this).attr("value");
		if($(active).width() == 0){
			$(active).animate({ width: "50vw" }, 1000);
		} else{
			$(active).animate({ width: "0" }, 1000);
		}
		$(".details").not(active).animate({ width: "0"}, 1000);
	});