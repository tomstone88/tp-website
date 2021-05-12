var $play =  new Array(); //if a slide is being played
var $count = new Array(); //the current slide count
var $slidertimer = new Array(); //what holds the slider times

var $backgrounds = new Array(); //an array of backgrounds

var $path = "./images/bg/";
	
var $bg = new Array(); //this is the array for the first backing slider
var $cl = new Array(); //this is the array for the clone slider

$(document).ready(function(){
	
	$('.backing[slider="0"]').addSlider(["bg1.jpg","bg2.jpg","bg3.jpg"], 10000, true);//array of file names, slider time, then autoplay
	
	$('.backing[slider="1"]').addSlider(["oad1.jpg","oad2.jpg","oad3.jpg"], 10000, true);//array of file names, slider time, then autoplay
	
	resize($("#get-started"), "margin-top", 100, 280, $(window).height());
			
	$(window).resize(function () { 
		resize($("#get-started"), "margin-top", 100, 280, $(window).height());
		resizePages()
    });
	
	$('.background-nav li').live('click', function () {
	    
		bgselect($(this).attr('index'), $(this).parent().attr('slider'));
		
	});
	
	resizePages();
	
	$(document).keypress(function(e){
		if(e.keyCode==27){
			hideOverlay();
		}
	});
	
	$(document).on("focus blur", "input", function(event){
	    if (event.type == "focusin") {
	    	if (this.value === this.defaultValue) {
				this.value = '';
			}
	    }else{
	    	if (this.value === '') {
				this.value = this.defaultValue;
			}
	    }
	});	
    
});

(function($) {
    $.fn.addSlider = function($imagearray, $timer, $auto) {
    	
    	$bg.push($(this));
    	
    	var $sliderid = $(this).getSliderID();
    	
    	$play.push($auto);
    	$count.push(0);
    	$slidertimer.push($timer);
    	$backgrounds.push($imagearray);
    	$cl.push($('.clone[slider="'+$sliderid+'"]'))
       
    	populateBackgroundNav($sliderid);
    	backgroundFade($count[$sliderid], $slidertimer[$sliderid], $sliderid);
    	
    }
    $.fn.getSliderID = function() {
       
    	return $(this).attr('slider');
    	
    }
    
})(jQuery);

function hideOverlay(){
	
	$("#overlay").css({"opacity": "0"});
	
	setTimeout(function(){
		$("#overlay").css({"display": "none"});
	},700);
	
}

function showOverlay(){
	
	$("#overlay").css({"display": "block"});
	
	setTimeout(function(){
		
		$("#overlay").css({"opacity": "1"});
	},100);
	
}

function resizePages(){
	
	var $height = $(window).innerHeight();
	var $width = $(window).innerWidth();

	$('.page').css({height: $height, width: "100%"});
	
}

function populateBackgroundNav($sliderid){
	var $navCount = 0;
	
	while($navCount < $backgrounds[$sliderid].length){
		$('.background-nav[slider="'+$sliderid+'"]').append('<li slider="'+$sliderid+'" index="'+$navCount+'"></li>');
		$navCount++;
	}
}

function selectNav($bgcount,$sliderid){
	
	$('.selected[slider="'+$sliderid+'"]').removeClass("selected");
	$('li[index="'+$bgcount+'"][slider="'+$sliderid+'"]').addClass("selected");
	
}

function bgselect($bgcount, $sliderid){
	
	if($bgcount != $count[$sliderid]){
		showNthSlide($bgcount, $sliderid);
		$count[$sliderid] = $bgcount;
		pause($sliderid);
	}else{
		play($sliderid);
	}

}

function backgroundFade($bgcount, $timer, $sliderid){
	
	if($play[$sliderid]){

		showNthSlide($bgcount,$sliderid);
		
		$bgcount++;
		$count[$sliderid]++;
		
		if($bgcount >= $backgrounds[$sliderid].length){
			$bgcount = 0;
		}
		
		setTimeout(function () {
			
			if($play){
			
				backgroundFade($bgcount, $timer, $sliderid);
				
			}
	    	
		}, $timer);
		
	}

}

function showNthSlide($bgcount, $sliderid){
	
	var $load = new Image();
	var $imgsrc = $path+$backgrounds[$sliderid][$bgcount];
	var $image = "url('"+$imgsrc+"')";
	
	$load.src = $imgsrc;

	$load.onload = function() {
		
		selectNav($bgcount, $sliderid);
		
		if($bg[$sliderid].css("opacity") == 1){
			$cl[$sliderid].css({"background-image": $image});
			setTimeout(function () {
				
				$bg[$sliderid].css({"opacity": 0});
		    	
			}, 200);
		}else{
			$bg[$sliderid].css({"background-image": $image, "opacity": 1});
		}
	};	
}

function play($sliderid){
	$play[$sliderid] = true;
	backgroundFade($count[$sliderid], $slidertimer[$sliderid], $sliderid);
}

function pause($sliderid){
	$play[$sliderid] = false;
}

function resize($element, $side, $min, $correction, $measure){
	
	if(typeof($measure) === 'undefined'){
		$measure = $(window).width();
	}

	var $size = ($measure/2)-$correction;

	if($size < $min){
	    $size = $min;
	}

	if($side == "left"){
		$element.css({"left": $size});
	}else if($side == "right"){
		$element.css({"right": $size});
	}else if($side == "top"){
		$element.css({"top": $size});
	}else if($side == "bottom"){
		$element.css({"bottom": $size});
	}else if($side == "margin-left"){
		$element.css({"margin-left": $size});
	}else if($side == "margin-right"){
		$element.css({"margin-right": $size});
	}else if($side == "margin-top"){
		$element.css({"margin-top": $size});
	}else if($side == "margin-bottom"){
		$element.css({"margin-bottom": $size});
	}
	
}
