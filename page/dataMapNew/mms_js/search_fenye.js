var data = [
    { 'id': 'q1321f551682411794e76a87cc962c47', 'name': '全流程信贷系统', 'description': '关于全流程信贷系统', 'belong': '源系统数据区' },
    { 'id': 'ic298f5fa9e24bc28d62168623b56e35', 'name': '客户关系管理系统', 'description': '关于客户关系管理系统', 'belong': '源系统数据区' },
    { 'id': 'u0e2b31298d841fbb1394d70afd16ec3', 'name': '统一报表', 'description': '关于统一报表', 'belong': '数据应用区' },
    { 'id': 'j9b73bedfcf6488cb29bdc4e97605404', 'name': '中小企业贷款管理系统', 'description': '关于中小企业贷款管理系统', 'belong': '源系统数据区' },
    { 'id': 's6fa7adfbb014cad9c1b7e591b80950d', 'name': '核心报表系统', 'description': '关于核心报表系统', 'belong': '源系统数据区' },
    { 'id': 'pecd26bd454a4c5298d22b0003d65d98', 'name': '核心系统', 'description': '关于核心系统', 'belong': '源系统数据区' },
    { 'id': 'n9dbb31102934c2aaefe1db1648e2433', 'name': '核心柜面系统', 'description': '关于核心柜面系统', 'belong': '源系统数据区' },
    { 'id': 'mae74486148e457f8cdb83116a4e29bd', 'name': '基础汇总区', 'description': '关于基础汇总区', 'belong': '数据集成区' },
    { 'id': 'nef417dd77e54957ae9e025a03f45cdf', 'name': '临时区', 'description': '关于临时区', 'belong': '数据集成区' },
    { 'id': 'ucbeb51a50d642a18a216cee5d1c1b03', 'name': '统一报表集市', 'description': '关于统一报表集市', 'belong': '数据集成区' },
    { 'id': 'p393ff814f524b09995f226fe57597e0', 'name': 'DS区', 'description': '关于DS区', 'belong': '数据交换区' },
    { 'id': 't2328e876ec14835b0fd0d6cc23e7822', 'name': 'ODS系统', 'description': '关于ODS系统', 'belong': '数据集成区' },
    { 'id': 'j379d21aa5fd46e69092203ab372d7d1', 'name': '核心国结系统', 'description': '关于核心国结系统', 'belong': '源系统数据区' },
    { 'id': 's8bae1fa626e4436a373ef34a4ecde6e', 'name': '关键业务指标应用系统', 'description': '关于关键业务指标应用系统', 'belong': '数据应用区' }
];




//回车事件
document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        search_fenye();
    }
};


//把结果进行整理	
function renderDatas(list) {
    debugger;
    var keyWord = $('#data_search').val();
    if (!(list instanceof Array)) {
        return;
    }
    $('#search_list').innerHTML = '';
    $('#serach_result').innerHTML = '';
    // $('#page').innerHTML = '';
    $('#import_div').remove();
    var Count = list.length; //记录条数  
    var PageSize = 3; //设置每页示数目
    var PageCount = Math.ceil(Count / PageSize); //计算总页数 
    var currentPage = 1; //当前页，默认为1。  
    // var len = list.length;

    var $item = null;
    // for(var i=0;i<Count;i++){//debugger;
    //     $item = $("<ul id='"+list[i].id+"'><li><span>"+(i+1)+"</span></li><li><span>"+list[i].name+"</span>"+"<span>系统描述："+list[i].description+"</span>"+"<span>所属系统域："+list[i].belong+"</span></li></ul>");
    //     $('#search_list').append($item);
    // }
    //分页
    for (var j = 1; j <= PageCount; j++) { //debugger;
        var pageN = '<a href="#" selectPage="' + j + '" >' + j + '</a>';
        $('#page').append(pageN);
    }
     //如果查询数据结果不足一页  单独循环
    if(list.length <= PageSize){
        for(i = 0;i<list.length;i++){
             addSearchListInfo(i);
        }
    }else {
        for (i = (currentPage - 1) * PageSize; i < PageSize * currentPage; i++) { //debugger;
            addSearchListInfo(i);
        }
    }
    function addSearchListInfo(i) {
        $item = $("<ul id='" + list[i].id + "'><li><span>" + (i + 1) + "</span></li><li><span>" + list[i].name + "</span>" + "<span>系统描述：" + list[i].description + "</span>" + "<span>所属系统域：" + list[i].belong + "</span></li></ul>");
        $('#search_list').append($item);
        $('#page a:eq(0)').addClass('clickState');
    }

    //点击按钮切换到当前页的数据
    $('a').click(function() { //debugger;
        var selectPage = $(this).attr('selectPage'); //获取当前点击a标签的标志位
        $(this).addClass('clickState').siblings().removeClass('clickState'); //当前点击元素添加样式 其他移除
        $('#search_list').html('');
        if (selectPage == PageCount) {
            for (i = (selectPage - 1) * PageSize; i < (PageSize * selectPage - 1); i++) {
                $item = $("<ul  id='" + list[i].id + "'><li><span>" + (i + 1) + "</span></li><li><span>" + list[i].name + "</span>" + "<span>系统描述：" + list[i].description + "</span>" + "<span>所属系统域：" + list[i].belong + "</span></li></ul>");
                $('#search_list').append($item);
            }
        } else {
            for (i = (selectPage - 1) * PageSize; i < PageSize * selectPage; i++) {
                $item = $("<ul id='" + list[i].id + "'><li><span>" + (i + 1) + "</span></li><li><span>" + list[i].name + "</span>" + "<span>系统描述：" + list[i].description + "</span>" + "<span>所属系统域：" + list[i].belong + "</span></li></ul>");
                $('#search_list').append($item);
            }
        }

        //获取当前点击的元素信息
        getEleInfo();

    });

    //获取当前点击的元素信息

    function getEleInfo() {
        $('#search_list ul').on('click', function() { //debugger;
            var clickId = $(this).attr("id");
            var clickName = $(this).children().children().eq(1)[0].innerText;
            clickHandleTotal(clickId); //跳转到当前点击系统
            $('#system_list').show();
            $('#system_list').css('top', '120px'); //让信息列表稍微往下移动一下，避免叠加到一起

            $('#search_back_btn').show();
            $('#search_back_btn').on('click', function() {
                $('#search_back_btn').hide();
                $('#system_list').hide();
                $('#serach_result').show();
            });
            // <!-- 返回其他搜索结果div结束 -->

        })
    }

    getEleInfo();

    var import_span = "<div id='import_div' style='float:left;'><span>关键词：" + keyWord + "</span><span>共" + list.length + "条搜索结果</span><span class='glyphicon glyphicon-remove' aria-hidden='true' onclick='close_search()'></span></div>";

    $('#search_list').before(import_span);

}

//模糊查询1:利用字符串的indexOf方法
// function searchByIndexOf(keyWord, list){
//     if(!(list instanceof Array)){
//         return ;
//     }
//     var len = list.length;
//     var arr = [];
//     for(var i=0;i<len;i++){
//         //如果字符串中不包含目标字符会返回-1
//         if(list[i].indexOf(keyWord)>=0){
//             arr.push(list[i]);
//         }
//     }
//     return arr;
// }


//正则匹配
function searchByRegExp(keyWord, list) { //debugger;
    if (!(list instanceof Array)) {
        return;
    }
    var len = list.length;
    var arr = [];
    var reg = new RegExp(keyWord);
    for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (list[i].name.match(reg)) {
            arr.push(list[i]);
        }
    }
    return arr;
}




//模糊搜索 分页功能
function search_fenye() { //debugger;
    var keyWord = $('#data_search').val();
    if ($('#data_search').val() == '请输入要搜索的内容...' || $('#data_search').val() == '' || $('#data_search').val() == null) {
        keyWord = '';
        alert('输入内容不能为空！')
        // $('#metadata_pie').show();
        $('#serach_result').hide();
    } else {
        $('#statistics_info').hide();
        $('#serach_result').show();
        $('#system_list').hide();
        //让单路径和多路径分析列表隐藏并设置路径分析的 flag 为 false
        hideSingleAndMutiple();
        $('#search_list').empty();
        $('#import_div').empty();
        $('#page').empty();
        $('#search_back_btn').hide();
        var dataList = searchByRegExp(keyWord, data);
        renderDatas(dataList);

    }

}

//关闭按钮
function close_search() {
    $('#serach_result').hide();
    $('#data_search').val('请输入要搜索的内容...');
}



//点击系统 定位
// function localNode(){debugger;

// }

// renderDatas(data);
