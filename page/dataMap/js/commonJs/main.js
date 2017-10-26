
$(document).ready(function(){
	//页面初始化
	function resizeBody(){
		var current_w = $(window).width();
		var current_h = $(window).height();
		$("body").width(current_w);
		$("body").height(current_h);

		$('#nodeListContainer').css('height',($('.body-site-leftContent').height() - $('.body-site-leftContent').find('.items-list-content').height() - 10) +'px')
	}
	resizeBody()
	$(window).resize(function(){
		resizeBody()
	})
})

var useLocalStorageData = true;//是否使用缓存数据
/*
 * 数据返回操作函数，将数据保存到缓存中
 * */
function saveRetData (dataId,retData) {
	if (useLocalStorageData) { 
		localStorage[dataId] = retData;
	}
}

/*
 * 获得缓存中保存的后台返回的数据
 * */
function getRetData (dataId) {
	var getData =  localStorage[dataId];
	//console.log("获得缓存中保存的后台返回的数据:"+getData);
	return getData;
}

function onShowInfo(type) {
	var popup_html = '<div class="popup-container"><div class="popup-bg"></div><div class="popup-wrap">'+
		'<div class="popup-nav-site">'+
		'<div class="nav-title">'+selNode.name+'</div>'+
		'<div class="nav-items">'+
		'<ul class="nav-list">'+
		'<li class="select" hidden><a>系统信息</a></li>'+
		'<li class="force1" hidden><a>ER关系</a></li>'+
		'<li class="blood blood1" hidden><a>血缘</a></li>'+
		'<li class="blood blood2" hidden><a>影响</a></li>'+
		'<li class="blood blood3" hidden><a>全量</a></li>'+
		'<li class="blood blood4" hidden><a>相关</a></li>'+
		// '<li class="blood force2" hidden><a>ER关系</a></li>'+
		'</ul>'+
		'</div>'+
		'<div class="nav-close"></div>'+
		'</div>'+
		'<div class="popup-content-site">'+
		'<ul class="content-list">'+

		'<li hidden>'+
		'<div class="popup-content-item">'+
		'<div class="popup-content-item-header">'+
		'<ul class="popup-content-item_list popup-content-item_list_one clearfix">'+
		'<li class="select">业务信息</li>'+
		'<li>技术信息</li>'+
		'<li>操作信息</li>'+
		'</ul>'+
		'</div>'+

		'<div class="popup-content-item-details">'+
		'<div class="popup-content-item-header">'+
		'<ul class="popup-content-item_list popup-content-item_list_two clearfix">'+
		'<li class="select">系统信息</li>'+
		'<li>术语列表</li>'+
		'<li>业务规则</li>'+
		'</ul>'+
		'</div>'+
		'<div class="popup-content-item-table">'+
		'</div>' +
		'</div>'+


		'<div class="popup-content-item-details">'+
		'<div class="popup-content-item-header">'+
		'<ul class="popup-content-item_list popup-content-item_list_two clearfix">'+
		'<li class="select">逻辑模型</li>'+
		'<li>物理模型</li>'+
		'<li>技术规则</li>'+
		'<li>ETL程序</li>'+
		'</ul>'+
		'</div>'+
		'<div class="popup-content-item-table">'+
		'</div>' +
		'</div>'+


		'<div class="popup-content-item-details">'+
		'<div class="popup-content-item-header">'+
		'<ul class="popup-content-item_list popup-content-item_list_two clearfix">'+
		'<li class="select">ETL运行记录</li>'+
		'<li>用户使用记录</li>'+
		'<li>数据归档记录</li>'+
		'<li>数据备份恢复记录</li>'+
		'</ul>'+
		'</div>'+
		'<div class="popup-content-item-table">'+
		'</div>' +
		'</div>'+

		'</li>'+
		'<li class="chart-container" id="force1" hidden></li>'+
		'<li class="chart-container" id="blood1" hidden></li>'+
		'<li class="chart-container" id="blood2" hidden></li>'+
		'<li class="chart-container" id="blood3" hidden></li>'+
		'<li class="chart-container" id="blood4" hidden></li>'+
		'<li class="chart-container" id="force2" hidden></li>'+
		'</ul>'+
		'</div>'+
		'</div></div>';

	if($("body").find(".popup-container")){
		$("body").find(".popup-container").remove();
	}

	$("body").append(popup_html);

	$('ul.nav-list > li').hide();
	$('ul.content-list > li').hide();

	$(".popup-container").on("click",".nav-close",function(){
		$("body").find(".popup-container").remove();
	})

	$(".nav-items>.nav-list").on("click","li",function(){
		var thisIndex = $(this).index();
		$(this).addClass("select").siblings().removeClass("select");

		$(".content-list>li").eq(thisIndex).show().siblings().hide();

		if ($(this).hasClass('force1')) {
			if ($('#force1').html() == '') {
				console.log('加载系统ER');
				addForceLay('#force1',"force1")
				// d3.json("js/D3Data/forceDemo1.json", function(error, retdata) {
				// 	addForceLay('#force1',retdata)
				// })

				if (selNode) {
					$.ajax({
						url : "/metaDatas/1/"+selNode.nodeId,
						success : function(data) {
							var retdata = eval('(' + data + ')');
							addForceLay('#force1',retdata)
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(XMLHttpRequest.readyState);
							alert(textStatus);
						}
					});
				}



			}
		} else if ($(this).hasClass('force2')) {
			if ($('#force2').html() == '') {
				console.log('血缘2');

				if (selNode) {
					$.ajax({
						url : "/metaDatas/0/"+selNode.nodeId,
						success : function(data) {
							var retdata = eval('(' + data + ')');
							addForceLay('#force2',retdata)
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(XMLHttpRequest.readyState);
							alert(textStatus);
						}
					});
				}
			}
		} else if ($(this).hasClass('blood1')) {
			if ($('#blood1').html() == '') {
				console.log('加载流向1');
				// d3.json("js/D3Data/blood1.json", function(error, retdata) {
				// 	addBihiSankey('#blood1',retdata,'expanded')
				// })
				if (selNode) {
					$.ajax({
						url : "/directNodes/0/"+selNode.nodeId,
						success : function(data) {
							var retdata = eval('(' + data + ')');
							addBihiSankey('#blood1',retdata,'expanded')
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(XMLHttpRequest.readyState);
							alert(textStatus);
						}
					});
				}
			}
		} else if ($(this).hasClass('blood2')) {
			if ($('#blood2').html() == '') {
				console.log('加载流向2');
				// d3.json("js/D3Data/blood2.json", function(error, retdata) {
				// 	addBihiSankey('#blood2',retdata,'expanded')
				// })

				if (selNode) {
					$.ajax({
						url : "/directNodes/1/"+selNode.nodeId,
						success : function(data) {
							var retdata = eval('(' + data + ')');
							addBihiSankey('#blood2',retdata,'expanded')
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(XMLHttpRequest.readyState);
							alert(textStatus);
						}
					});
				}
			}
		} else if ($(this).hasClass('blood3')) {
			if ($('#blood3').html() == '') {
				console.log('加载流向3');
				// d3.json("js/D3Data/blood3.json", function(error, retdata) {
				// 	addBihiSankey('#blood3',retdata,'expanded')
				// })

				if (selNode) {
					$.ajax({
						url : "/directNodes/2/"+selNode.nodeId,
						success : function(data) {
							var retdata = eval('(' + data + ')');
							addBihiSankey('#blood3',retdata,'expanded')
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(XMLHttpRequest.readyState);
							alert(textStatus);
						}
					});
				}
			}
		} else if ($(this).hasClass('blood4')) {
			if ($('#blood4').html() == '') {
				console.log('加载流向4');
				// d3.json("js/D3Data/blood4.json", function(error, retdata) {
				// 	addBihiSankey('#blood4',retdata,'expanded')
				// })
				if (selNode) {
					$.ajax({
						url : "/directNodes/3/"+selNode.nodeId,
						success : function(data) {
							var retdata = eval('(' + data + ')');
							addBihiSankey('#blood4',retdata,'expanded')
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(XMLHttpRequest.status);
							alert(XMLHttpRequest.readyState);
							alert(textStatus);
						}
					});
				}
			}
		}
	})

	$(".popup-content-item_list_one").on("click","li",function(){
		var thisIndex = $(this).index();
		$(this).addClass("select").siblings().removeClass("select");

		$(".popup-content-item-details").hide();
		$(".popup-content-item-details").eq(thisIndex).show();

		$(".popup-content-item").hide();
		$(".popup-content-item").eq(0).show();
		if(thisIndex==0){
			$(".popup-content-item").eq(1).show();
		}
	})
	$(".popup-content-item_list_one").find('li:eq(0)').click();

	$(".popup-content-item_list_two").on("click","li",function(){
		var thisIndex = $(this).index();
		$(this).addClass("select").siblings().removeClass("select");
	})

	if (type < 2) {
		$('ul.nav-list > li:lt(2)').show();
		$('ul.nav-list > li:eq('+type+')').click();
	} else {
		$('ul.nav-list > li:gt(1)').show();
		$('ul.nav-list > li:eq('+type+')').click();
	}

}

var selNode;
var divSetting = {
	'systemArea':[
		{'type':'title','value':'系统区属性','data-attr':['data-id']},
		{'type':'attr','name':'name','title':'名称'},
		{'type':'attr','name':'des','title':'描述'},
		{'type':'attr','name':'includeSys','title':'包含系统数'},
		{'type':'attr','name':'includeTable','title':'包含事实表叔'},
		{'type':'attr','name':'includeField','title':'包含字段数'},
		{'type':'attr','name':'upstream','title':'上游关联系统域','data-attr':['data-id'],'opts': [
			{'optName': '系统信息', 'optType': 'link','link':['data-id']}
		]},
		{'type':'attr','name':'downstream','title':'下游关联系统域','opt':'link'},
		{'type':'attr','name':'detailInfo','title':'详细信息','opts': [
			{'optName': '系统信息', 'optType': 'button','optFn':'sysInfo'},
			{'optName': 'ER关系', 'optType': 'button','optFn':'erInfo'}
		]},
		{'type':'attr','name':'dataBlood','title':'数据流向','opts': [
			{'optName': '查看', 'optType': 'button','optFn':'blood'}
		]}
	]
}
//清除信息
function clearInfo(pNode) {
	pNode.selectAll('li.attr').remove();
}
//显示信息
function showInfo(obj,pNode) {
	console.log('showInfo:' + obj);
	// 发送交易 返回后显示节点信息
	var rightInfoData = {
		// "f_id":obj.id,
		// "f_type":obj.metadata,
		"名称":obj.name,
		"描述":obj.name+'描述信息',
		"所属系统":"应用系统区域",
		"包含事实表数":"600",
		"包含字段数":"12000",
		"上游系统":"数据仓库、ODS、手工数据",
		"下游系统":"高管驾驶舱、对外报送系统",
	};
	// clearInfo();
	for (var key in rightInfoData) {
		var li = pNode.append('li')
			.attr('class','attr attr '+ key);
		li.append('span').attr('class','t').text(key+':');
		li.append('span').attr('class','value').text(rightInfoData[key]);
	}
	if (obj.slevel && (obj.slevel == 1 || obj.slevel == 2)) {
		var infoLi = pNode.append('li')
			.attr('class','attr attr '+ key);
		infoLi.append('span').attr('class','t').text('详细信息:');
		var infobtn = infoLi.append('button').attr('class','val-btn').text('系统信息');
		var erBtn = infoLi.append('button').attr('class','val-btn').text('ER信息');

		var bloodLi = pNode.append('li').attr('class','attr attr '+ key);
		bloodLi.append('span').attr('class','t').text('数据流向:');
		var bloodbtn = bloodLi.append('button').attr('class','val-btn').text('查看');

		infobtn.on('click',function () { onShowInfo(0);})
		erBtn.on('click',function () { onShowInfo(1); })
		bloodbtn.on('click',function () { onShowInfo(2); })
	}
}

var onGetNodeInfo = function (node) {
	selNode = node;
	var pNode = d3.select('.details-content ul');
	clearInfo(pNode);
	showInfo(node,pNode);
}

var createDiv = function (divId,retData) {
	var _setting = divSetting[divId];
}

var mainInit = function () {
	d3.json("js/D3Data/allData0.json", function(error, data) {
		addBihiSankey('#chart',data,'collapsed',0)
	})
	return
	
	if (useLocalStorageData && getRetData('overView0')) {
		var retdata = eval('(' + getRetData('overView0') + ')');
		addBihiSankey('#chart',retdata,'collapsed',0);
	} else {
		$.ajax({
			url : "overView/0",
			success : function(data) {
				saveRetData('overView0',data);
				var retdata = eval('(' + data + ')');
				addBihiSankey('#chart',retdata,'collapsed',0)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			}
		});
	}
}

mainInit();