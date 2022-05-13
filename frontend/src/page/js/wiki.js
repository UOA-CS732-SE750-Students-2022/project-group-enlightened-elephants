var isSearch = false;
// $(".search-img-a").css("display","none");
$(".search-text").fadeIn(400);
$(".search-title").focus();
$(".clear-ico").fadeIn(150);

$(document).ready(function(){
	//鼠标经过显示星星
	$("body").jstars({
		image_path:"imgs",
		style:'rand',
		frequency:15
	});
	

	//点击关闭按钮就恢复到原来的样子
	$(".clear-ico").on("click",function(){
		if(!isSearch){
			//如果不是搜索状态
			$(".search-title").val("");
			// $(".search-text").fadeOut(200,function(){
			// 	$(".search-img-a").fadeIn(400);
			// });
		}
		else if(isSearch){
			isSearch = false;
			//先恢复原状
			$(".search-ul").html("");
			$(".title").css("position","relative");
			$(".title").animate({left:'0'},500);
			$(".search-before").animate({top:"35%"},500,function(){
				$(".itro").fadeIn(300);
				$(".search-title").val("");
			// 	$(".search-text").fadeOut(200,function(){
			// 	$(".search-img-a").fadeIn(400);
			// });
			});
			
		}
	});

	//监听输入框回车事件
	$(".search-title").keydown(function(event){
		if(event.keyCode == 13){
			var keyword = $(".search-title").val();

			if(keyword == ""){
				//如果没有输入
				$(".title").css("position","relative");
				$(".title").animate({left:'-45%'},500);

				$(".search-before").animate({top:"-40px"},500,function(){
					$(".searching").fadeIn(200);
				});
				$(".itro").css("display","none");
				isSearch = true;
				$(".search-ul").html("");
				return;
			}

			//alert("got it");
			if(!isSearch){
				$(".title").css("position","relative");
				$(".title").animate({left:'-30%'},500);

				$(".search-before").animate({top:"-40px"},500,function(){
					$(".searching").fadeIn(200);
				});
				$(".itro").css("display","none");
				isSearch = true;

				//开始从wiki获取搜索到的东西了
				getFromWiki(keyword);
			}else if(isSearch){
				getFromWiki(keyword);
			}
		}
	});

	var getFromWiki = function(keyword){
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
			dataType:"jsonp",
			success:function(response){
				//console.log(response);
				showResults(response,keyword);
			},
			error:function(){
				alert("Sorry,there's something wrong within the search,please refresh this page and try again!");
			}
		});
	}

	var showResults = function(response,keyword){
		console.log(response);
		//console.log(response.query.search.length);
		$(".search-ul").html("");

		if(response.query.search.length == 0){
			//没搜到
			var str = '<a class="search-link" href="#">';
			str+='<li class="search-li"><h3 class="search-h3">^_^</h3>';
			str+='<p class="search-abs">Sorry,the word "'+keyword+'" is not existed in wiki\'s database</p>';
			//str+='<p class="search-time">'+response.query.search[i].timestamp+'</p></li></a>';
			var dot = $(str);
			$(".search-ul").append(dot);
			return;
		}

		for(var i=0; i < response.query.search.length;i++){
			var str = '<a class="search-link" href="https://en.wikipedia.org/wiki/'+response.query.search[i].title+'" target="_blank">';
			str+='<li class="search-li"><h3 class="search-h3">'+response.query.search[i].title+'</h3>';
			str+='<p class="search-abs">'+response.query.search[i].snippet+'</p>';
			str+='<p class="search-time">'+response.query.search[i].timestamp+'</p></li></a>';
			var dot = $(str);
			$(".search-ul").append(dot);
		}
	}

	var showError = function(keyword){

		alert("Sorry,there's something wrong within the search,please refresh this page and try again!");
	}


});
