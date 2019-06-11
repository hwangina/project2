$(function(){
	var H; // window's height
	var W; // window's width
	
	var page=0; // page present index
	var total=3; // page total index
	
	var timer; // resize 동작 오류 방지 timer
	
	/* basic setting data */
	$(".keyvisual li").eq(0).addClass("active");
	$(".leftArea .tab div.notice").addClass("active");
	
	/* highlight */
	$(".brandStorybtn a").hover(
		function(){
			$(this).addClass("active");
		},
		function(){
			$(this).removeClass("active");
		}
	);
	$(".brandStorybtn a").focusin(function(){
		$(this).addClass("active");
	});
	$(".brandStorybtn a").focusout(function(){
		$(this).removeClass("active");
	});
	$(".tabBtn").click(function(e){
		e.preventDefault();
		
		$("div.content").removeClass("active");
		$(this).parent().addClass("active");
		
	});
	
	/* Resize */
	$(window).resize(function(){
		clearTimeout(timer);
		
		timer=setTimeout(function(){
			responsive()
		}, 50);
	});
	$(window).trigger("resize");
	
	/* skip nav */
	$(".skip_nav a").focusin(function(){
		$(this).addClass("active");
	});
	$(".skip_nav a").focusout(function(){
		$(this).removeClass("active");
	});
	$(".skip_nav a").click(function(e){
		e.preventDefault();
		
		$(".brandStorybtn a").focus();
	});
	
	/* GNB */
	// PC
	$("#GNB li").hover(
		function(){
			$(this).addClass("active");
			$(this).find("ul").stop().slideDown(300);
		},
		function(){
			$(this).removeClass("active");
			$(this).find("ul").stop().slideUp(300);
		}
	);
	$("#GNB > ul > li").focusin(function(){
		$(this).addClass("active");
		$(this).find("ul").slideDown(300);
	});
	$("#GNB ul ul li:last-child").focusout(function(){
		$(this).parent().parent().removeClass("active");
		$(this).parent("ul").slideUp(300);
	});
	// Mobile
	$(".menu_btn").click(function(e){
		e.preventDefault();
		
		if($(this).hasClass("close")){
			$(this).removeClass("close");
			$("#GNB").slideUp(300);
			$("body").removeClass("static");
		}
		else{
			$(this).addClass("close");
			$("#GNB").slideDown(300);
			$("body").addClass("static");
		}
	});
	
	/* visual interval */
	var visualTime=setInterval(function(){
		var n=0; // keyvisual present index
		var totalArt=2; // keyvisual total index
		
		if(n < totalArt)	n++;
		else				n=0;
		
		$(".keyvisual li").removeClass("active");
		$(".keyvisual li").eq(n).addClass("active");
	}, 4000);
	
	/* brand gallery */
		
	var galleryTime=setInterval(function(){
		moveGallery()
	}, 4000);
	
	/* title align */
	var alignwidth=$("#CScenter .rightArea .background").width();
	$("#CScenter .rightArea img").css({"margin-left":(alignwidth/2)*-1});
	console.log(alignwidth);
	
	/* API */
	function responsive(){
		W = $(window).width();
		H = $(window).height();
		
		var headers=0;
		var footers=0;
		
		if(W >= 1280){ // wide PC
			headers=142;
			footers=250;
				
			$(".keyvisual .gallery").css({width:629});
			$("section").css({height:H});
			$("section#CScenter").css({height:H-footers});
			$("#brand .wrap").prepend($(".brandGallery"));
			$("#brand .wrap").prepend($(".brandStory"));
			$("#brand .wrap").prepend($(".printGallery"));
			$("#market .contWrap").css({"padding-top":0});
			$("#CScenter .tab").css({"margin-top":(H-footers-320)/2})
		}
		else if(W >= 770){ // basic PC mediaQuery1280
			headers=142;
			footers=250;
			var resHeight=$(".keyvisual .gallery").height();
			
			$("section").css({height:H});
			$("section#CScenter").css({height:H-footers});
			$(".keyvisual .gallery").css({width:resHeight-55});
			$("#brand .wrap").prepend($(".brandGallery"));
			$("#brand .wrap").prepend($(".brandStory"));
			$("#brand .wrap").prepend($(".printGallery"));
			var galleryWidth=$(".printGallery").width();
			$(".printGallery").css({height:galleryWidth});
			$("#market .titWrap").css({height:H-80});
			$("#market .contWrap").css({"padding-top":0});
		}
		else if(W >= 440){ // tablet mediaQuery770
			headers=60;
			footers=250;
			
			$("section").css({height:"auto"});
			$("#brand .wrap").prepend($(".brandGallery"));
			$("#brand .wrap").prepend($(".printGallery"));
			$("#market .contWrap").css({height:H});
			$("#market .contWrap").css({"padding-top":W*93/100});
		}
		else{ // mobile mediaQuery440
			headers=60;
			footers=250;
			
			$("section").css({height:"auto"});
			$("#brand .wrap").prepend($(".brandGallery"));
			$("#brand .wrap").prepend($(".printGallery"));
			$("#market .contWrap").css({"padding-top":W*93/100});
		}
		// basic CSS setting
		$(".keyvisual").css({height:H-headers});
	}
	function moveGallery(){
		var n=0; // gallery present art
		var pos=-120; // one time moving width
		var attrArt=$(".brandGallery ul li:first-child img").attr("src");
		var Printing=$(".brandGallery ul li:nth-child(4) img").attr("src");
		
		$(".brandGallery ul").append("<li><a href=''><img src='" + attrArt + "' alt='gallery image'></a></li>"); // 맨 뒤에 first-li의 복제본을 더함
		$(".brandGallery ul").animate({left:pos}, 400, function(){ // ul 이동
			$(".brandGallery ul li:first-child").remove(); // first-li 삭제
			$(".brandGallery ul").css({left:0}); // ul 위치 원복
		});
		$(".printGallery img").attr({"src":Printing}); // select li img를 프린팅
	}
	
	responsive()
});