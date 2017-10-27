
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


var selNode,curMapStr,systemClickNum = 0;
var onGetNodeInfo = function (node) {
	selNode = node;
}

//当点击系统元素时展示和取消一些列表---这几个函数在dataMapwxc.js中调用--开始
//第一次点击系统时隐藏元数据统计信息列表
function hideD3List() {
	$('#statistics_info').hide();
}

//第二次点击系统时显示元数据统计信息列表，隐藏单系统和多系统路径分析列表
function showD3List() {
	$('#system_list').hide();
	$('#single_system_path').hide();
	$('#multisystem_list').hide();
	$('#search_back_btn').hide();
	//$('#statistics_info').show();
	//当取消系统高亮时设置路径分析按钮的flag属性为false
	$('#system_relation_btn').attr('flag', false);
	flag = $('#system_relation_btn').attr('flag');
	//让前2个按钮禁用
	//titleDomLi.eq(0).addClass("false");
	//titleDomLi.eq(1).addClass("false");
	//把多系统路径分析列表中的div都删除，避免下次重复添加
	$('#multisystem_list>div').remove();
	//把系统的点击次数重置为0，否则添加不上之前点击的那个系统
	systemClickNum = 0;
}

/*选择离中心最近的 或者 鼠标所在的节点*/
function findScaleNode (el) {
	function distanceCAL(el) {
		//获取第一点的坐标
		var x1 = eval($('.bihi-svg').width()) * 0.5;
		var y1 = eval($('.bihi-svg').height()) * 0.5;
		//获取第二点的坐标
		var elB = el.getBoundingClientRect();
		var x2 = eval(elB.x + elB.width*0.5  - $('.bihi-svg').offset().left);
		var y2 = eval(elB.y + elB.height*0.5 - $('.bihi-svg').offset().top );

		var calX = x2 - x1;
		var calY = y2 - y1;
		return Math.pow((calX *calX + calY * calY), 0.5);
	}
	var nodeArray = d3.select(el).select("#nodes").selectAll(".node").each(function (d) { d.dataDis = distanceCAL(this) });
	var minDisNode = nodeArray.sort(function(a,b){ return a.dataDis - b.dataDis});
	var eNode = event && $( event.target ).closest("g.node");
	var hoverNode = eNode && nodeArray.filter(function (d) { return d.id == eNode.data('id') });
	var scaleNode = (hoverNode && hoverNode.node() && hoverNode) || minDisNode;
	$(scaleNode.node()).addClass('min-dis').siblings(".node").removeClass("min-dis");
	return scaleNode
}

var mainInit = function (el,url,expandedFlag,mapLeval) {
	if (curMapStr === (el+url+expandedFlag+mapLeval)) return false;
	$.ajax({
		url : url,
		success : function(data) {
			curMapStr = (el+url+expandedFlag+mapLeval),showD3List(),addBihiSankey(el?el:'#chart',data,(expandedFlag?'expanded':'collapsed'),mapLeval);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
}

mainInit(0,'../mms_data/xin.json',1,2);

//清除信息
function clearInfo(pNode) {
	pNode.selectAll('li.attr').remove();
}
//显示信息
function showInfo(obj,pNode) {
	// console.log(obj);
	// 发送交易 返回后显示节点信息
	// clearInfo();
	function setInfo (rightInfoData) {debugger;
		//循环展示数据
		for (var key in rightInfoData) {
			// console.log(rightInfoData)
			if(rightInfoData[key] !=''&& key!= 'data'&& key!= 'f_id'&& key!= 'f_type'&& key!= 'f_data_title'){
				var li = pNode.append('li').attr('class','attr attr '+ key);
				var keyCopy = key;
				if(keyCopy =='table_code'){
					li.append('span').attr('class','t').text('表代码'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='table_name'){
					li.append('span').attr('class','t').text('表名称'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='begin_time'){
					li.append('span').attr('class','t').text('生效时间'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='data_type'){
					li.append('span').attr('class','t').text('元数据类型'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='path'){
					li.append('span').attr('class','t').text('上下文路径'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='description'){
					li.append('span').attr('class','t').text('描述'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='tablespace'){
					li.append('span').attr('class','t').text('表空间'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}else if(keyCopy =='if_codetable'){
					li.append('span').attr('class','t').text('是否码表'+':');
					li.append('span').attr('class','value').text(rightInfoData[keyCopy]);
				}
				li.append('span').attr('class','t').text(key+':');
				li.append('span').attr('class','value').text(rightInfoData[key]);
			}
		}
	}
	$.ajax({
			// url : "/force/json_table/"+obj.cn+".json",//nodeId 参数
			url :"../mms_data/DM_PROJ_INFO.json",//nodeId 参数
			success : function(data) {debugger;
				var retData ;
				function abc(id){
					for(var i = 0;i<data.data.length;i++){
						if(id == data.data[i].id){
							retData = data.data[i]
						}
					}
				}
				var array = ['o35ef229a15340468a74d95aeaa75e6a','o6b93d18fd074117877c3118905f60f9','u3c60f731fed471ba66ddc483591c79d'];
				for(var i = 0;i<array.length;i++){
					var index = Math.floor(Math.random()*array.length);
				}
				abc(array[index]);
				setInfo(retData)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
				console.log(XMLHttpRequest.readyState);
				console.log(textStatus);
			}
		}
	)
}

if ($('#force1').html() == '') {
	// console.log('加载系统ER');
	//nodeid  参数
	$.ajax({
		url: "../mms_data/metadata_relation.json", //nodeId 参数
		success: function(data) {
			// console.log(data)
			addForceLay('#force1', data)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	})

}


