// 在svg上添加数据全景地图开始


// (function($) {


var systemInfo;
var systemPathInfo;

var titleDomLi = $("#state li");
//获取系统信息
$.ajax({
    url: '../mms_data/xin.json',
    success: function(data) {
        // var retdata = eval('(' + data + ')');
        systemInfo = data.nodes;
    }
});
//获取系统路径信息
$.ajax({
    url: '../mms_data/stream.json',
    success: function(data) {
        systemPathInfo = data;
    }


});
//获取表信息
$.ajax({
    url: '../mms_data/chart.json',
    success: function(data) {
        chartInfo = data.nodes;
    }
});


//存储当前系统的ID,当点击进入系统按钮时通过系统ID获取当前系统的详细信息
var currentSystemId = null;
//定义一个数组用来存储当前点击系统的ID
var systemIdArray = [];
//定义多系统列表中第一个展示的系统ID
var preSystemId;
//定义当多系统路径分析列表显示时系统的点击次数
var systemClickNum = 0;
//定义路径按钮的点击次数
var pathClickNum = 0;
var flag;

function clickHandleTotal(id) {
    //通过flag属性来判断是否已经点击过了路径分析按钮，如果值为true，则表示已经点击过了
    flag = $('#system_relation_btn').attr('flag');

    if (flag == 'true') {

        currentSystemId = id;

        //获取系统路径分析信息，并填充到列表中
        showPathAnalyze('single', currentSystemId, 'news');
        
        //隐藏搜索列表
        $('#serach_result').hide();
        $('#search_back_btn').hide();
        $('#system_list').hide();
        $('#single_system_path').show();
        $('#statistics_info').hide();

        $('#system_relation_btn').on('click', function() {
            // location.href = '../mms_views/dataMap.html';
            $('#single_system_path').hide();
        });


        //当点击时，把当前点击的系统的ID存储到数组中
        systemIdArray.push(currentSystemId);
        preSystemId = systemIdArray.slice(0, 1)[0];

        //根据ID的数量来判断是否显示多系统路径分析列表
        if (systemIdArray.length > 1) {

            var repeatIdArr = systemIdArray.filter(function(item, index) {

                if (currentSystemId == item) {
                    return item;
                }
            });
            if (repeatIdArr.length > 1) { //表示当前点击的这个系统之前点击过
                console.log('当前点击的系统已经展示在列表中了!');
            } else { //隐藏单系统分析列表，展示多系统分析列表
                systemClickNum++;
                if (systemClickNum == 1) {
                    //往多系统列表中添加第一个系统列表
                    addSystemList(preSystemId);
                    showPathAnalyze('multiple', preSystemId, preSystemId);
                }
                //当显示多系统列表后，再点击路径分析按钮就退到首页
                if (systemClickNum >= 1) {
                    $('#path_analyze_title').on('click', function() {
                        // location.href = '../mms_views/dataMap.html';
                    });
                }
                //往多系统列表中添加除第一个列表以外的系统列表
                addSystemList(currentSystemId);
                //添加除第一个列表以外的系统列表
                showPathAnalyze('multiple', currentSystemId, currentSystemId);
                $('#multisystem_list').show();
            }


        }
    } else {
        // 通过系统ID切换展示系统信息
        toggleSystem(id);
    }
}


//切换系统列表所有的状态变化
function toggleAllState(titleInfo, serviceInfo, serviceSubClass) {
    //去掉遮罩层
    for (var i = 0; i < 5; i++) {
        $('#tool_title_mask>li:eq(' + i + ')').css('display', 'none');
    }
    //切换饼图和信息列表的显示和隐藏
    $('#metadata_pie').hide();
    $('#system_list').show();
    //动态获取系统的标题
    $('#system_title_per>p').text(titleInfo);
    //展示系统的具体信息
    addServiceInfo(serviceInfo);
    //展示各个系统中子类的详细信息
    toggleInfoStateTotal(serviceSubClass);

}




// 在svg上添加数据全景地图结束



// 添加饼图开始
//模拟按元数据类型的数据
var datasetTotal = [{
    name: '操作元数据',
    percentage: '29%',
    value: 54
}, {
    name: '技术元数据',
    percentage: '30%',
    value: 58
}, {
    name: '业务元数据',
    percentage: '41%',
    value: 78
}]

var datasetSubclass = [{
    name: '数据备份回复记录',
    value: 12
}, {
    name: '数据归档记录',
    value: 14
}, {
    name: '系统用户使用记录',
    value: 8
}, {
    name: 'ETL运行记录',
    value: 20
}, {
    name: 'ETL程序',
    value: 6
}, {
    name: '技术规则',
    value: 8
}, {
    name: '物理模型',
    value: 12
}, {
    name: '逻辑模型',
    value: 32
}, {
    name: '业务规则',
    value: 8
}, {
    name: '术语',
    value: 10
}, {
    name: '系统信息',
    value: 20
}, {
    name: '业务数据分类',
    value: 23
}, {
    name: '概念模型',
    value: 17
}];

var datasetSystem = [{
    name: 'ODS系统',
    value: 8
}, {
    name: '统一报表',
    value: 5
}, {
    name: '全流程信贷系统',
    value: 6
}, {
    name: '临时区',
    value: 6
}, {
    name: '关键业务指标应用系统',
    value: 5
}, {
    name: '核心国结系统',
    value: 4
}, {
    name: '客户关系管理系统',
    value: 3
}, {
    name: '中小企业贷款管理系统',
    value: 4
}, {
    name: '核心系统',
    value: 3
}, {
    name: '核心报表系统',
    value: 3
}, {
    name: '核心柜面系统',
    value: 3
}, {
    name: 'DS系统',
    value: 3
}, {
    name: '基础汇总区',
    value: 3
}, {
    name: '统一报表集市',
    value: 2
}, ];

//三大类的颜色
var totalColor = ['#d78a42', '#34b99a', '#3786ad'];
//三大类对应的各个系统的颜色
var classColor = [
    '#efab7e', '#ed9857', '#de8237', '#ce7728',
    '#a3e3cb', '#7adbb8', '#48c6a0', '#16b58c',
    '#65d9e6', '#48cfe5', '#31bdde', '#18acd4', '#2697bf'
]

var width = 500,
    height = 400;

// 创建一个分组用来组合要画的图表元素
var main = d3.select('.metadata_pie').append('svg')
    .attr('id', 'total_pie')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .classed('main', true)
    .attr('transform', "translate(" + width / 2 + ',' + height / 2 + ')');


function addPie(dataset, innerRadius, outerRadius) {


    // 转换原始数据为能用于绘图的数据
    var pie = d3.pie()
        .sort(null)
        // .padAngle(.01)
        .value(function(d) {
            return d.value;
        });
    // pie是一个函数
    var pieData = pie(dataset);
    // 创建计算弧形路径的函数
    var radius = 100; //控制折线的长度
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    var outerArc = d3.arc()
        .innerRadius(1.2 * outerRadius)
        .outerRadius(1.2 * outerRadius);
    var oArc = d3.arc()
        .innerRadius(outerRadius)
        .outerRadius(outerRadius);
    var slices = main.append('g').attr('class', 'slices');
    var labels = main.append('g').attr('class', 'labels');
    // 添加弧形元素（g中的path）
    var arcs = slices.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('fill', function(d, i) {
            // return getColor(i,classColor);
            if (d.data.value >= 54) {
                return getColor(i, totalColor);
            } else {
                return getColor(i, classColor);
            }
        })
        .attr('d', function(d) {
            return arc(d);
        });
    // 添加文字标签
    var texts = labels.selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
        .attr('dy', '0.35em')
        .attr('fill', function(d, i) {
            return getColor(i, classColor);

        })
        .text(function(d, i) {
            return d.data.name;
        })
        .style('opacity', 1);

    if (dataset == datasetSubclass) {
        var lines = main.append('g').attr('class', 'lines');
        texts.style('text-anchor', function(d, i) {
                return midAngel(d) < Math.PI ? 'start' : 'end';
            })
            .attr('transform', function(d, i) {
                // 找出外弧形的中心点
                var pos = outerArc.centroid(d);
                // 改变文字标识的x坐标
                pos[0] = radius * (midAngel(d) < Math.PI ? 1.2 : -1.2);

                return 'translate(' + pos + ')';
            })



        var polylines = lines.selectAll('polyline')
            .data(pieData)
            .enter()
            .append('polyline')
            // .attr('points', function(d) {
            //     return [arc.centroid(d), arc.centroid(d), arc.centroid(d)];
            // })
            .attr('points', function(d, i) {
                var pos = outerArc.centroid(d);
                pos[0] = radius * (midAngel(d) < Math.PI ? 1.2 : -1.2);

                return [oArc.centroid(d), outerArc.centroid(d), pos];
            })
            .style('stroke', function(d, i) {
                return getColor(i, classColor);
            })
            .style('opacity', 0.5);
    } else {
        texts.attr('transform', function(d) {

                return 'translate(' + arc.centroid(d) + ')'; //arc.centroid(d) 能算出弧线的中心
            })
            .text(function(d) {
                return d.data.name;
            })
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', function(d, i) {
                return '#fff';
            })
    }


};



function midAngel(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
}

function getColor(idx, colorAry) {

    return colorAry[idx % colorAry.length];
}

addPie(datasetTotal, 0, 60);
addPie(datasetSubclass, 65, 100)



// 添加饼图结束



//搜索框那一栏的title选项卡开始

// var toolTitleControl = $('#tool_title_control');
// var liWidth = [101, 77, 90, 87, 86];
// var positionLeft = [0, 101, 178, 268, 355];
// var positionLw = [{
//     width: 101,
//     left: 0
// }, {
//     width: 77,
//     left: 101
// }, {
//     width: 90,
//     left: 178
// }, {
//     width: 87,
//     left: 268
// }, {
//     width: 86,
//     left: 355
// }];

// for (var i = 0; i < 5; i++) {
//     toolTitleControl.append($('<li></li>'));
// }

// var liControlTotal = $('#tool_title_control>li');

// for (var i = 0; i < liWidth.length; i++) {
//     liControlTotal.eq(i).css('width', liWidth[i])
// }





// // 添加遮罩层

// var toolTitleMask = $('#tool_title_mask');
// for (var i = 0; i < 5; i++) {
//     toolTitleMask.append($('<li></li>'));
// }

// var liTotalMask = $('#tool_title_mask>li');


// for (var i = 0; i < positionLw.length; i++) {
//     liTotalMask.eq(i).css({ 'width': positionLw[i].width, 'left': positionLw[i].left })
// }


// liTotalMask.eq(3).css('display', 'none');
// liTotalMask.eq(4).css('display', 'none');


// liControlTotal.eq(3).on('click', function() {
//     hideSomeInfo();
//     // this.setAttribute()
//     $(this).attr({ 'id': 'path_analyze_title', 'flag': true });
// });


// function hideSomeInfo() {
//     $('#dataMap_control').hide();
//     $('#arrow_down').hide();
//     $('#metadata_pie').hide();
//     $('#tool_title').removeClass('tool_title').addClass('tool_title_change');

//     for (var i = 0; i < 5; i++) {
//         if (i != 3) {
//             liTotalMask.eq(i).css('display', 'block');
//         }
//     }
// }


//搜索框那一栏的title选项卡结束

// 5个title选项卡点击弹出层开始

//获取弹出层
var dataPopups = $('#data_popups');
//获取遮罩层
var fullScreenMask = $('#full_screen_mask');
//获取每个数据关系的div
var metadataRelation = $('#metadata_relation');
var ERRelation = $('#ER_relation');
var versionCompare = $('#version_compare');
var metaPersonalCenter = $('#meta_personal_center');
var chartPathAnalyze = $('#chart_path_analyze');
var fieldPathAnalyze = $('#field_path_analyze');
var otherPathAnalyze = $('#other_path_analyze');



//获取弹出层标题
var popupTitle = $('#popups_title>p');
var popupTitleArray = ['元数据关系', '版本浏览', '个人中心', '血缘影响分析', '元数据资产'];

function popupRelation(someOne, popTitle) {
    someOne.css('display', 'block').siblings().css('display', 'none');
    dataPopups.css('display', 'block');
    fullScreenMask.css('display', 'block');
    popupTitle.text(popTitle)
}


// liControlTotal.eq(0).on('click', function() {

//     popupRelation(metadataRelation, popupTitleArray[0]);
// });

// liControlTotal.eq(1).on('click', function() {

//     popupRelation(ERRelation, popupTitleArray[1]);
// });

// liControlTotal.eq(2).on('click', function() {


//     popupRelation(versionCompare, popupTitleArray[2]);
// });

// liControlTotal.eq(4).on('click', function() {

//     popupRelation(metaPersonalCenter, popupTitleArray[3]);
// });

// $('#relation_close,#full_screen_mask').on('click', function() {
//     $('#full_screen_mask').css('display', 'none')
//     dataPopups.css('display', 'none');
//     toggleImg(0);
// });




// 5个title选项卡点击弹出层结束

//点击单个个人中心
// //
// $('#tool_personal_center').on('click', function() {
//     popupRelation(metaPersonalCenter, popupTitleArray[3]);

// });


// 左下角图例开始

//元数据图例信息
var metadateColor = [{
    color: '#6cc4ec',
    info: '源系统数据区'
}, {
    color: '#849cce',
    info: '数据交换区'
}, {
    color: '#dca867',
    info: '数据集成区'
}, {
    color: '#70bf70',
    info: '数据应用区'
}];

//进入系统后的表级图例
var reportColor = [{
    color: '#007ac6',
    info: '接口表-输入'
}, {
    color: '#60f9fe',
    info: '接口表-输出'
}, {
    color: '#6cc8f9',
    info: '加工表'
}];

//表路径分析图例
var chartColor = [{
    color: '#0076bd',
    info: '接口表-输入'
}, {
    color: '#74eaf1',
    info: '接口表-输出'
}, {
    color: '#74c2f1',
    info: '加工表'
}, {
    color: '#dfffff',
    info: '血缘分析'
}, {
    color: '#9bff9b',
    info: '影响分析'
}];


//字段路径分析图例
var fieldColor = [{
    color: '#ed8e26',
    info: '接口表-输入'
}, {
    color: '#ea73b9',
    info: '接口表-输出'
}, {
    color: '#abc7f4',
    info: '加工表'
}, {
    color: '#aeffff',
    info: '血缘分析'
}, {
    color: '#84ff84',
    info: '影响分析'
}];

//标准执行信息
var standardExecutColor = [{
    color: '#2a9801',
    info: '完整落地'
}, {
    color: '#86c668',
    info: '部分落地'
}, {
    color: '#ffbd00',
    info: '落地中'
}, {
    color: '#d9d9d9',
    info: '未落地'
}]

//建设状态信息
var buildStateColor = [{
    color: '#3f88ce',
    info: '已建设'
}, {
    color: '#abddfe',
    info: '建设中'
}, {
    color: '#bfbebc',
    info: '待建设'
}];


//数据质量信息
var dataQualityColor = [{
    color: '#6fbe84',
    info: '数据质量高'
}, {
    color: '#feda82',
    info: '数据质量中'
}, {
    color: '#ff8400',
    info: '数据质量低'
}, {
    color: '#bfbeba',
    info: '无数据质量信息'
}]



//使用情况信息
var serviceCondition = [{
    color: '#8b91d8',
    info: '日访问>1000'
}, {
    color: '#c5b0f3',
    info: '日访问>500'
}, {
    color: '#e9cffd',
    info: '日访问>200'
}, {
    color: '#efe0fe',
    info: '日访问<200'
}, {
    color: '#bfbebb',
    info: '无访问'
}]


//切换图例信息
function legendInfo(infoId, infoArray, titleId, titleName) {
    if ($('#' + infoId + ' #legend_info_condition')) {
        $('#' + infoId + ' #legend_info_condition').remove();
    }
    $('#' + infoId).append($('<ul id="legend_info_condition" class="legend_info_condition"></ul>'));
    var legendInfoCondition = $('#' + infoId + ' #legend_info_condition');
    for (var i = 0; i < infoArray.length; i++) {
        var liInfo = $('<li><span style="background:' + infoArray[i].color + '"></span><p class="legend_news">' + infoArray[i].info + '</p></li>');
        legendInfoCondition.append(liInfo);
    }

    $('#' + titleId).html(titleName)
}
//默认元数据图例信息
legendInfo('map_legend_area', metadateColor, 'legend_title', '地图图例');
// $('#map_legend').hide();
// 左下角图例结束



// 右边统计信息开始

var metadataTopArray = [{
    info: '全行系统总数',
    num: '150'
}];

var metadataBottomArray = [{
    info: '源系统数据区',
    num: '7'
}, {
    info: '数据交换区',
    num: '1'
}, {
    info: '数据集成区',
    num: '4'
}, {
    info: '数据应用区',
    num: '2'
}];


// 元数据统计信息
var metadataInfoTop = $('#metadata_sta_top');
for (var i = 0; i < metadataTopArray.length; i++) {
    metadataInfoTop.append($('<li><p>' + metadataTopArray[i].info + '</p><span>' + metadataTopArray[i].num + '个</span></li>'));
}

var metadataInfoBottom = $('#metadata_sta_bottom');
for (var i = 0; i < metadataBottomArray.length; i++) {
    metadataInfoBottom.append($('<li><p>' + metadataBottomArray[i].info + '</p><span>' + metadataBottomArray[i].num + '个</span></li>'));
}




// 右边统计信息结束



// 左边5个数据按钮切换开始

// var dataOption = $('#data_option');
// var dataControl = $('#dataMap_control');
// var toolTitle = $('#tool_title');
// var toolPersonalCenter = $('#tool_personal_center');
// var index = 0;
// var preHeight = 84; //每一个数据框(li标签)的高度
// var distance = 0; //每一个数据框要移动的距离



//给ul标签里添加5个li标签，用于数据选项控制
var dataOptionControl = $('#data_option_con');
for (var i = 0; i < 　5; i++) {
    dataOptionControl.append($('<li></li>'));
}

//切换选项时共同的变化
function publicChange(img, distance, option1, option2, option3) {
    dataOption.removeClass().addClass('data_option ' + img);
    dataOption.css('transform', 'translate(0,' + distance + 'px)');
    dataControl.css('overflow', option1);
    toolTitle.css('display', option2);
    toolPersonalCenter.css('display', option3);
}



// //给每一个数据选项框注册点击事件
// $('#data_option_con>li:eq(0)').on('click', function() {
//     index = 0;
//     distance = -1 * index * preHeight;
//     publicChange('option_img0', distance, 'hidden', 'block', 'none');
//     //获取地图图例数据
//     legendInfo(metadateColor);
//     $('#statistics_info').css('display', 'block');
//     //添加title遮罩层
//     for (var i = 0; i < 3; i++) {
//         $('#tool_title_mask>li:eq(' + i + ')').css('display', 'block');
//     }
// })


// $('#data_option_con>li:eq(1)').on('click', function() {
//     index = 1;
//     distance = -1 * index * preHeight + 1;
//     publicChange('option_img1', distance, 'hidden', 'none', 'block');
//     //获取图例信息数据
//     legendInfo(standardExecutColor);
//     $('#statistics_info').css('display', 'none');

// })


// $('#data_option_con>li:eq(2)').on('click', function() {
//     index = 2;
//     distance = -1 * index * preHeight + 1;
//     publicChange('option_img2', distance, 'hidden', 'none', 'block');
//     //获取图例信息数据
//     legendInfo(buildStateColor);
//     $('#statistics_info').css('display', 'none');
// })


// $('#data_option_con>li:eq(3)').on('click', function() {
//     index = 3;
//     distance = -1 * index * preHeight + 1;
//     publicChange('option_img3', distance, 'hidden', 'none', 'block');
//     //获取图例信息数据
//     legendInfo(dataQualityColor);
//     $('#statistics_info').css('display', 'none');
// })


// $('#data_option_con>li:eq(4)').on('click', function() {
//     index = 4;
//     distance = -1 * index * preHeight;
//     publicChange('option_img4', distance, 'hidden', 'none', 'block');
//     //获取图例信息数据
//     legendInfo(serviceCondition);
//     $('#statistics_info').css('display', 'none');
// })


// $('#arrow_down').on('click', function() {
//     dataOption.css('transform', 'translate(0,0');
//     dataControl.css('overflow', 'visible');
// });

// $('#arrow_up').on('click', function() {
//     dataControl.css('overflow', 'hidden');
//     dataOption.css('transform', 'translate(0,' + distance + 'px)');
// })


// //左边5个数据框切换按钮结束



//搜索框开始

var searchInfo;
var defaultValue = '请输入要搜索的内容...';
$('#data_search').on('focus', function() {
    searchInfo = $(this).val();
    if (searchInfo == defaultValue) {
        $(this).val('');
    }
});

$('#data_search').on('blur', function() {
    searchInfo = $(this).val();
    if (searchInfo.trim() == '') {
        this.value = defaultValue;
    }
})

$('#search_btn').on('click', function() {
    // console.log(searchInfo);
});

//搜索框结束

// 版本比较开始

$('#tree1').ace_tree({
    dataSource: treeDataSource,
    multiSelect: true,
    loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
    'open-icon': 'icon-minus',
    'close-icon': 'icon-plus',
    'selectable': true,
    'selected-icon': 'icon-ok',
    'unselected-icon': 'icon-remove'
});
$('#tree2').ace_tree({
    dataSource: treeDataSource2,
    loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
    'open-icon': 'icon-folder-open',
    'close-icon': 'icon-folder-close',
    'selectable': false,
    'selected-icon': null,
    'unselected-icon': null
});

//版本比较滚动条，但是有问题，没出来滚动条
// $(function (){
//     $('#version_compare_list').niceScroll({
//         cursorcolor:'#cfcfcf',
//         cursorborder:'none'
//         // autohidemode:false
//     });
//     console.log($('#version_compare_list'));
// })


// 版本比较结束


// 新版系统信息列表开始----新版开始

function toggleSystem(id) {
    metadataInfo = systemInfo;
    for (var i = 0; i < metadataInfo.length; i++) {
        var systemId = metadataInfo[i].id;
        if (systemId == id) {
            var currentSystem = metadataInfo[i];
            //获取当前系统的名称
            var currentSystemName = currentSystem.cn;

            // 获取当前子类数据---数据仓库系统业务信息
            var currentServiceContent = currentSystem.info[0].info;
            // 获取当前子类数据---数据仓库系统技术信息
            var currentTechnologyContent = currentSystem.info[1].info;
            // 获取当前子类数据---数据仓库系统操作信息
            var currentOperateContent = currentSystem.info[2].info;
            //存储当前系统ID
            currentSystemId = id;

            //切换三大类的内容
            toggleStateCon(currentServiceContent, currentTechnologyContent, currentOperateContent, id);
            //切换当前系统的名称
            $('#system_title_per>p').text(currentSystemName);


        }


    }


    $('#serach_result').hide(); //隐藏搜索结果
    //显示系统信息列表
    $('#system_list').show();
    //根据判断调整系统列表的显示位置
    if ($('#search_back_btn').css('display') == 'none') {
        $('#system_list').css('top', '70px')
    } else {
        $('#system_list').css('top', '120px')
    }

    addContentInfo('system_content_list_ul', currentServiceContent);

    //当先点击完系统元素后，再点击路径分析时显示路径分析列表
    $('#system_relation_btn').on('click', function() {
        showPathAnalyze('single', currentSystemId, 'news');
        $('#single_system_path').show();
        $('#system_list').hide();
        // $('#tool_search').hide();
        $('#search_back_btn').hide();
        $('#serach_result').hide();
        $('#statistics_info').hide();
        //当显示一个系统路径分析时，再点击路径分析按钮时就退到首页
        $('#system_relation_btn').on('click', function() {
            // location.href = '../mms_views/dataMap.html';
            $('#single_system_path').hide();
        });

    });

    //当点击时，把当前点击的系统的ID存储到数组中
    systemIdArray.push(currentSystemId);
    //只保存最后点击的系统ID，防止ID重复
    systemIdArray.splice(0, systemIdArray.length - 1);

}

//添加子类中信息的函数--新版

function addContentInfo(contentId, systemContent) {
    if ($('#' + contentId + '>li')) {
        $('#' + contentId + '>li').remove();
    }
    for (var i = 0; i < systemContent.length; i++) {
        var subCur = systemContent[i];
        var contentInfo;
        if (subCur.name == '系统主要功能') {
            contentInfo = '<li class="system_content_public" style="height:100px;"><p>' + subCur.name + '</p><span style="display:inline-block;" class="content_info_span">' + subCur.info + '</span></li>'
        } else {
            contentInfo = '<li class="system_content_public" style="height:50px;"><p>' + subCur.name + '</p><span class="content_info_span">' + subCur.info + '</span></li>'
        }


        $('#' + contentId).append(contentInfo);
        //给展示系统子类信息的li标签中的span标签加滚动条
        $(function() {
            $('.content_info_span').niceScroll({
                cursorcolor: '#cfcfcf',
                cursorborder: 'none',
                // autohidemode:false
            });

        })
    }

}


//给系统列表中的内容部分加滚动条
$(function() {
    $('.content_info_span').niceScroll({
        cursorcolor: '#cfcfcf',
        cursorborder: 'none',
        // autohidemode:false
    });

})


//点击三大类标题切换背景颜色
$('#system_title_tab>p').on('click', function() {
    $(this).css({ 'background': '#fff', 'color': '#000' }).siblings('p').css({ 'background': '#0969c0', 'color': '#fff' });
});

//点击三大类切换内容
var systemPDoms = $('#system_title_tab>p');

function toggleStateCon(serviceInfo, technologyInfo, operateInfo, id) {
    systemPDoms.eq(0).on('click', function() {

        addContentInfo('system_content_list_ul', serviceInfo);
    });

    systemPDoms.eq(1).on('click', function() {

        addContentInfo('system_content_list_ul', technologyInfo);
    });

    systemPDoms.eq(2).on('click', function() {

        addContentInfo('system_content_list_ul', operateInfo);
    });
}


// 新版系统信息列表结束-----新版结束



//表信息列表开始


//点击三大类标题切换背景颜色
$('#chart_title_tab>p').on('click', function() {
    $(this).css({ 'background': '#fff', 'color': '#000' }).siblings('p').css({ 'background': '#0969c0', 'color': '#fff' });
});



//切换表级信息中的技术元数据中的表和字段标题背景颜色
$('#chart_report_title_con>p').on('click', function() {

    // $(this).css({ 'background': '#fff', 'padd': '1px solid #fff' }).siblings('p').css({ 'background': '#ededed', 'borderBottom': 'none' });
    $(this).addClass('bg_style_selected').removeClass('bg_style_default').siblings('p').addClass('bg_style_default').removeClass('bg_style_selected');
});

//当点击搜索按钮时，让单路径和多路径分析列表隐藏并设置路径分析的 flag 为 false ，在search_fenye.js中调用
function hideSingleAndMutiple(){
    $('#single_system_path').hide();
    $('#multisystem_list').hide();
    //当取消系统高亮时设置路径分析按钮的flag属性为false
    $('#system_relation_btn').attr('flag', false);
    flag = $('#system_relation_btn').attr('flag');
    //把多系统路径分析列表中的div都删除，避免下次重复添加
    $('#multisystem_list>div').remove();
    //把系统的点击次数重置为0，否则添加不上之前点击的那个系统
    systemClickNum = 0;
}



//在yuan.js中调用
function showReportList() {
    $('#chart_list').show();

}

// //切换表中业务，技术，操作元数据信息-----所有系统的表数据都在一个json文件中
// function toggleChart(id) {
//     //当前点击表的所属系统ID
//     var curChartSysId = getSystemInfo();
//     for (var i = 0; i < chartInfo.length; i++) { //遍历系统，找出当前系统
//         //表数据中的系统ID
//         var subChartId = chartInfo[i].id;
//         if (subChartId == curChartSysId) {
//             var curChartInfo = chartInfo[i].chart;
//             console.log(curChartInfo);
//             for (var j = 0; j < curChartInfo.length; j++) { //找到系统后，遍历系统中的表，找出当前的表
//                 //当前点击的表ID
//                 var curChartID = curChartInfo[j].id;
//                 if (curChartID == id) {
//                     var curChartNew = curChartInfo[j].info;
//                     console.log(curChartNew);
//                     //获取表中的业务元数据信息
//                     var curChartService = curChartNew[0].info;
//                     //获取表中的技术元数据信息
//                     var curChartTechonly = curChartNew[1].info;
//                     console.log(curChartTechonly);
//                     //获取表中的操作元数据信息
//                     var curChartOperate = curChartNew[2].info;
//                     console.log(curChartService, curChartTechonly, curChartOperate);

//                     //切换表中的业务，技术，操作元数据
//                     changeChartInfo(curChartService, curChartTechonly, curChartOperate);
//                     //默认显示业务元数据信息
//                     addContentInfo('chart_content_list_ul', curChartService)
//                 }
//                 console.log(curChartID);
//             }

//         }

//     }
// }



//切换表中业务，技术，操作元数据信息-----单个表信息
function toggleChart(id) {
    //获取表的信息
    var perInfo = chartInfo[0].chart[0].info;
    //获取表中的业务元数据信息
    var curChartService = perInfo[0].info;
    //获取表中的技术元数据信息
    var curChartTechonly = perInfo[1].info;
    //获取表中的操作元数据信息
    var curChartOperate = perInfo[2].info;

    //切换表中的业务，技术，操作元数据
    changeChartInfo(curChartService, curChartTechonly, curChartOperate);
    //默认显示业务元数据信息
    addContentInfo('chart_content_list_ul', curChartService)

}

//切换技术元数据中的表和字段的div显示
function toggleZiduanDiv(domDiv) {
    if (domDiv.text() == '技术元数据') {
        $('#chart_content_list').hide();
        $('#chart_report_content_list').show();
    } else {
        $('#chart_content_list').show();
        $('#chart_report_content_list').hide();
    }
}


//切换表中的业务，技术，操作元数据
function changeChartInfo(serviceInfo, technologyInfo, operateInfo) {
    //获取技术元数据中的表信息
    var tecChartInfo = technologyInfo.subClass[0].subClass;
    //获取技术元数据中的字段信息
    var tecZiduInfo = technologyInfo.subClass[1].subClass;
    //点击业务元数据
    $('#chart_title_tab>p:eq(0)').on('click', function() {
        toggleZiduanDiv($(this));
        addContentInfo('chart_content_list_ul', serviceInfo)
    });
    //点击技术元数据
    $('#chart_title_tab>p:eq(1)').on('click', function() {
        toggleZiduanDiv($(this));
        //默认显示表的信息
        addContentInfo('chart_report_list_chart_ul', tecChartInfo);

        //点击表
        $('#chart_report_title_con>p:eq(0)').on('click', function() {
            $('#chart_report_list_chart').show();
            $('#chart_report_list_ziduan').hide();
            addContentInfo('chart_report_list_chart_ul', tecChartInfo);

        });
        //点击字段
        $('#chart_report_title_con>p:eq(1)').on('click', function() {
            $('#chart_report_list_chart').hide();
            $('#chart_report_list_ziduan').show();
            if ($('#chart_report_list_ziduan_ul>li')) {
                $('#chart_report_list_ziduan_ul>li').remove();
            }
            //遍历字段中的信息
            for (var i = 0; i < tecZiduInfo.length; i++) {
                var liZiduan = '<li><div><p>' + tecZiduInfo[i].name + '</p><span class="ziduan_arrow_up"></span></div><ul style="margin:0;" id="subZiduan_ul_' + i + '"></ul></li>'
                $('#chart_report_list_ziduan_ul').append(liZiduan);
                //获取字段中每一个标题下的信息
                var titleZiduanInfo = tecZiduInfo[i].subClass;
                //给字段中的每一个标题中添加信息列表
                addContentInfo('subZiduan_ul_' + i, titleZiduanInfo);

            }
            //当点击字段时默认显示第一个标题下的内容
            $('#subZiduan_ul_0').show();
            //设置第一个标题右边的箭头向下
            $('#chart_report_list_ziduan_ul>li:eq(0)>div').find('span').addClass('ziduan_arrow_down');
            //点击字段中的每个标题让其内容显示和隐藏
            $('#chart_report_list_ziduan_ul>li>div').on('click', function() {
                if ($(this).next().css('display') == 'none') {
                    $(this).next().show().parent().siblings().find('ul').hide();
                    $(this).find('span').addClass('ziduan_arrow_down').removeClass('ziduan_arrow_up');
                    $(this).parent().siblings().find('div>span').addClass('ziduan_arrow_up').removeClass('ziduan_arrow_down');
                } else {
                    $(this).next().hide();
                    $(this).find('span').addClass('ziduan_arrow_up').removeClass('ziduan_arrow_down');
                }
            });



        });
    });

    //点击操作元数据
    $('#chart_title_tab>p:eq(2)').on('click', function() {
        toggleZiduanDiv($(this));
        addContentInfo('chart_content_list_ul', operateInfo);
    });
}


// //给字段信息列表加滚动条
$(function() {
    $('#chart_report_list_ziduan').niceScroll({
        cursorcolor: '#cfcfcf',
        cursorborder: 'none',
        // autohidemode:false
    });

})

//表信息列表结束


// 系统信息列表开始



// 通过系统ID切换展示系统信息以及让选中的当前系统的g元素高亮
// function toggleSystem(id) {
//     if (id == '1') {
//         metadataInfo = chartInfo;
//         $('#system_join_btn').html('路径分析');
//     } else {
//         metadataInfo = systemInfo;
//         $('#system_join_btn').html('进入系统');
//     }
//     for (var i = 0; i < metadataInfo.length; i++) {
//         var systemId = metadataInfo[i].id;
//         var parentClass = metadataInfo[i].parent_class;
//         if (parentClass) {
//             if (systemId == id) {
//                 var currentSystem = metadataInfo[i];
//                 //获取当前系统的名称
//                 var currentSystemName = currentSystem.cn;
//                 // 获取当前系统业务元数据
//                 var currentServiceInfo = currentSystem.info[0].define;
//                 //获取当前系统技术元数据
//                 var currentTechnologyInfo = currentSystem.info[1].define;
//                 //获取当前系统操作元数据
//                 var currentOperateInfo = currentSystem.info[2].define;
//                 // 获取当前子类数据---数据仓库系统业务信息
//                 var currentServiceSubClass = currentSystem.info[0].info.subClass;
//                 // 获取当前子类数据---数据仓库系统技术信息
//                 var currentTechnologySubClass = currentSystem.info[1].info.subClass;
//                 // 获取当前子类数据---数据仓库系统操作信息
//                 var currentOperateSubClass = currentSystem.info[2].info.subClass;
//                 //存储当前系统ID
//                 currentSystemId = id;

//                 //切换系统列表所有的状态变化
//                 toggleAllState(currentSystemName, currentServiceInfo, currentServiceSubClass);
//                 //切换业务，技术，操作信息这3个大类的详细信息
//                 toggleThreeClassState(currentServiceInfo, currentServiceSubClass, currentTechnologyInfo, currentTechnologySubClass, currentOperateInfo, currentOperateSubClass);
//                 //当切换系统时默认显示业务信息
//                 changeState($('#system_title_tab>p:eq(0)'), currentServiceInfo, currentServiceSubClass);

//             }
//         }

//     }





//     $('#serach_result').hide(); //隐藏搜索结果
//     //根据判断调整系统列表的显示位置
//     if ($('#search_back_btn').css('display') == 'none') {
//         $('#system_list').css('top', '10px')
//     } else {
//         $('#system_list').css('top', '50px')
//     }

//     // var singleFlag = $('#path_analyze_title').attr('flag');
//     // $('#path_analyze_title').on('click', function() {
//     //     console.log(singleFlag);
//     //     if (singleFlag) {
//     //         // location.href = '../mms_views/dataMap.html';
//     //     }

//     // });

//     //当先点击完系统元素后，再点击路径分析时显示路径分析列表
//     // titleDomLi.eq(2).on('click', function() {
//     //     var sysFlag = $('#chart').css('display');
//     //     if (sysFlag == 'none') {
//     //         console.log('hello');
//     //     } else {
//     //         // hideSomeInfo();
//     //         showPathAnalyze('single', currentSystemId, 'news');
//     //         $('#single_system_path').show();
//     //         $('#system_list').hide();
//     //         $('#search_back_btn').hide();
//     //         $('#serach_result').hide();
//     //         $('#statistics_info').hide();
//     //         //当显示一个系统路径分析时，再点击路径分析按钮时就退到首页
//     //         $('#path_analyze_title').on('click', function() {
//     //             // location.href = '../mms_views/dataMap.html';
//     //             $('#single_system_path').hide();
//     //         });
//     //     }

//     // });




//     // //当先点击完系统元素后，再点击路径分析时显示路径分析列表
//     // titleDomLi.eq(2).on('click', function() {
//     //     if (pathClickNum <= 1) {
//     //         showPathAnalyze('single', currentSystemId, 'news');
//     //         $('#single_system_path').show();
//     //         $('#system_list').hide();
//     //         $('#search_back_btn').hide();
//     //         $('#serach_result').hide();
//     //         $('#statistics_info').hide();
//     //         //当显示一个系统路径分析时，再点击路径分析按钮时就退到首页
//     //         $('#path_analyze_title').on('click', function() {
//     //             // location.href = '../mms_views/dataMap.html';
//     //             $('#single_system_path').hide();
//     //         });
//     //     }
//     // });




//     //当点击时，把当前点击的系统的ID存储到数组中
//     systemIdArray.push(currentSystemId);
//     //只保存最后点击的系统ID，防止ID重复
//     systemIdArray.splice(0, systemIdArray.length - 1);
//     //让左边4个按钮的前2个禁用按钮回复正常状态
//     $('#state li').removeClass('false');

// }




//通过系统ID展示当前系统的路径分析列表,num表示单系统或多系统
function showPathAnalyze(num, curSysId, suffixId) {
    //如果当前列表为单系统列表时，根据判断先删除再添加
    if ($('.upstream_system_info>li')) {
        $('.upstream_system_info>li').remove();
    }
    if ($('.downstream_system_info>li')) {
        $('.downstream_system_info>li').remove();
    }

    for (var i = 0; i < systemPathInfo.length; i++) {
        var systemPathId = systemPathInfo[i].id;
        //通过系统ID获取当前系统路径分析信息
        if (curSysId == systemPathId) {
            var upstreamInfo = systemPathInfo[i].upstream;
            var downstreamInfo = systemPathInfo[i].downstream;
            var systemPathName = systemPathInfo[i].name;
        }

    }
    if (upstreamInfo == undefined) {
        $('#' + num + '_upstream_list_' + suffixId).hide();
    } else {
        //添加上游系统信息
        $('#' + num + '_upstream_list_' + suffixId).show();
        for (var j = 0; j < upstreamInfo.length; j++) {
            var upCur = upstreamInfo[j];
            var upLi = $('<li><p>' + upCur.name + '</p><span>' + upCur.belong + '</span></li>');
            $('#' + num + '_upstream_info_ul_' + suffixId).append(upLi);
        }
    }
    if (downstreamInfo == undefined) {
        $('#' + num + '_downstream_list_' + suffixId).hide();
    } else {
        // 添加下游系统信息
        $('#' + num + '_downstream_list_' + suffixId).show();
        for (var j = 0; j < downstreamInfo.length; j++) {
            var downCur = downstreamInfo[j];
            var downLi = $('<li><p>' + downCur.name + '</p><span>' + downCur.belong + '</span></li>');
            $('#' + num + '_downstream_info_ul_' + suffixId).append(downLi);
        }
    }

    //动态获取系统名称
    $('#' + num + '_system_title_' + suffixId + '>p').text(systemPathName);


}

//点击系统路径分析列表的进入系统按钮
// $('.path_analyze_btn').on('click', function() {
//     var pathBtnInfo = $(this).text();
//     if (pathBtnInfo == '进入系统') {
//         hideSomeList(currentSystemId);
//     }

// });



//展示系统的具体信息
function addServiceInfo(serviceInfo) {
    if ($('#system_info_news>p')) {
        $('#system_info_news>p').remove();
    }

    $('#system_info_news').append($('<p>' + serviceInfo + '</p>'));
}



//如果子类多于3个，就再添加一个div
function addInfoDiv(idNum) {
    var infoDiv = '<div class="subClass_info_box">' +
        '<div class="subClass_title" id="subClass_title_' + idNum + '"></div>' +
        '<div class="subClass_message" id="subClass_message_' + idNum + '">' +
        '<ul id="subClass_message_list_' + idNum + '"></ul>' +
        '</div>' +
        '</div>'

    return infoDiv;
}



// 添加子类标题的函数
function addSubTitle(startIndex, endIndex, tabId, serviceSubClass) {
    var classLen;
    if (endIndex < 3) {
        classLen = endIndex;
    } else {
        classLen = 3;
    }
    for (var i = startIndex; i < classLen; i++) {
        var cur = serviceSubClass[i];
        var titleInfo = '<p>' + cur.name + '</p>';
        $('#subClass_title_' + tabId).append(titleInfo)
    }
}


//添加子类中信息的函数

function addSubInfo(index, infoId, serviceSubClass) {
    var curSubInfo = serviceSubClass[index].subClass;
    for (var i = 0; i < curSubInfo.length; i++) {
        var subCur = curSubInfo[i];
        var subClassInfo;
        if (subCur.name == '系统简介' || subCur.name == '表简介') {
            subClassInfo = '<li style="height:100px;"><p>' + subCur.name + '</p><span class="subClass_info_span">' + subCur.info + '</span></li>'
        } else if (subCur.name.length <= 6 && subCur.info <= 9) {
            subClassInfo = '<li style="height:40px;line-height:40px;"><p>' + subCur.name + '</p><span class="subClass_info_span">' + subCur.info + '</span></li>'
        } else {
            subClassInfo = '<li><p>' + subCur.name + '</p><span class="subClass_info_span">' + subCur.info + '</span></li>'
        }



        $('#subClass_message_list_' + infoId).append(subClassInfo);
        //给展示系统子类信息的li标签中的span标签加滚动条
        $(function() {
            $('.subClass_info_span').niceScroll({
                cursorcolor: '#cfcfcf',
                cursorborder: 'none',
                // autohidemode:false
            });

        })
    }

}



//判断子类的长度，如果大于3并且小于6，就再添加一个div列表展示剩余的子类信息
function addSubInfoOther(serviceSubClass) {
    if (3 < serviceSubClass.length && serviceSubClass.length < 7) {
        $('#system_subClass_news').append(addInfoDiv('two'))
        var len = serviceSubClass.length;
        addSubTitle(3, len, 'two', serviceSubClass);
        addSubInfo(3, 'two', serviceSubClass);

        // 点击子类标题切换信息展示
        showInfoJlq('two', 3, serviceSubClass);
    }
}


//展示系统信息的子类信息列表加滚动条
// $(function() {
//     $('#system_subClass_news').niceScroll({
//         cursorcolor: '#cfcfcf',
//         cursorborder: 'none',
//         // autohidemode:false
//     });

// })
// 



// 点击子类标题切换信息展示
function showInfoJlq(classId, num, serviceSubClass) {
    var subClassTitleBtnOne = $('#subClass_title_' + classId + '>p');
    for (var i = 0; i < subClassTitleBtnOne.length; i++) {
        var curBth = subClassTitleBtnOne[i];
        curBth.onclick = (function(i) {
            return function() {
                if ($('#subClass_message_list_' + classId + '>li')) {
                    $('#subClass_message_list_' + classId + '>li').remove();
                }
                $(this).css('borderBottom', '1px solid #fff').siblings('p').css('borderBottom', 'none')
                addSubInfo(i + num, classId, serviceSubClass);
            }

        })(i)
    }
}

//展示各个系统中子类的详细信息
function toggleInfoStateTotal(serviceSubClass) {
    //先把原有的信息删除，再重新添加，否则会重复添加
    if ($('.subClass_info_box')) {
        $('.subClass_info_box').remove();
    }
    //添加第一个展示前3个子类信息的空div
    $('#system_subClass_news').append(addInfoDiv('one'));
    var len = serviceSubClass.length;
    //默认显示前3个
    addSubTitle(0, len, 'one', serviceSubClass);
    //添加前3个子类信息
    addSubInfo(0, 'one', serviceSubClass);
    //添加超出3个以外的子类信息
    addSubInfoOther(serviceSubClass);
    // 点击子类标题切换信息展示
    showInfoJlq('one', 0, serviceSubClass);

}


//切换业务，技术，操作这三个大类开始

function changeState(domNode, serviceInfo, serviceSubClass) {

    //展示系统的具体信息
    addServiceInfo(serviceInfo);
    //展示各个系统中子类的详细信息
    toggleInfoStateTotal(serviceSubClass);
    $(domNode).css({ 'background': '#fff', 'color': '#000' }).siblings('p').css({ 'background': '#0969c0', 'color': '#fff' });
}

//切换业务，技术，操作信息这3个大类的详细信息
function toggleThreeClassState(serviceInfo1, serviceSubClass1, serviceInfo2, serviceSubClass2, serviceInfo3, serviceSubClass3) {
    var systemTitleTab = $('#system_title_tab>p');
    //点击业务信息展示详细信息
    $(systemTitleTab[0]).on('click', function() {
        changeState(this, serviceInfo1, serviceSubClass1);

    })
    //点击技术信息展示详细信息
    $(systemTitleTab[1]).on('click', function() {
        changeState(this, serviceInfo2, serviceSubClass2);
    })
    //点击操作信息展示详细信息
    $(systemTitleTab[2]).on('click', function() {
        changeState(this, serviceInfo3, serviceSubClass3);
    })
}



//切换业务，技术，操作这三个大类结束

//给定义概念的li标签加滚动条
// $(function() {
//     $('#system_info_news').niceScroll({
//         cursorcolor: '#cfcfcf',
//         cursorborder: 'none',
//         // autohidemode:false
//     });

// })

//给系统信息列表中的内容div加滚动条
$(function() {
    $('#system_content_list').niceScroll({
        cursorcolor: '#cfcfcf',
        cursorborder: 'none',
        // autohidemode:false
    });

})

// 系统信息列表结束

//给表信息列表中的内容div加滚动条
$(function() {
    $('#chart_content_list').niceScroll({
        cursorcolor: '#cfcfcf',
        cursorborder: 'none',
        // autohidemode:false
    });

})


//点击系统信息列表的进入系统按钮

// $('#system_join_btn').on('click', function() {

//     hideSomeList(currentSystemId);

// });



//点击表信息列表的路径分析按钮

$('#chart_path_btn').on('click', function() {
    $('#chart_list').hide();
    $('#path_analyze_options').show();
    popupRelation(chartPathAnalyze, popupTitleArray[3]);
});


function joinChart() {

    hideSomeList(currentSystemId);

}


function hideSomeList(currentSysId) {
    // $('#map_logo_title').hide();
    $('#system_back_btn').show();
    $('#report_system').show();
    $('#dataMap_control').hide();
    $('#arrow_down').hide();
    $('#tool_title').hide();
    $('#search_back_btn').hide();
    $('#system_list').hide();
    $('#chart').hide();
    $('#single_system_path').hide();
    $('#multisystem_list').hide();
    $('#multisystem_list').hide();
    $('#statistics_info').hide();
    getSystemInfo(currentSysId);
    // defaultBtnStyle(0, defaultImgAry);
    // legendInfo(reportColor);
    legendInfo('map_legend', reportColor, 'legend_title', '地图图例');

    $('#chart').hide();
    $('#chart_map').show();
    $('#map_info_shouye').hide();
}

var curSID;
// //通过ID获取当前系统的信息
function getSystemInfo(currentSysId) {
    for (var i = 0; i < metadataInfo.length; i++) {
        var id = metadataInfo[i].id;

        if (currentSysId == id) {
            // $('#system_area').html(metadataInfo[i].parent_class);
            // $('#system_name').html(metadataInfo[i].cn);
            console.log('系统ID：' + id, ',系统名称：' + metadataInfo[i].cn, ',所属区域：' + metadataInfo[i].parent_class);
            curSID = id;
        }
    }
    return curSID;
}

//点击返回按钮
$('#system_back_btn').on('click', function() {
    location.href = '../mms_views/dataMap.html';
});

//统一报表的title按钮开始

var reportToolControl = $('#report_tool_control');
var reportLiWidth = [99, 74, 86, 83];
for (var i = 0; i < reportLiWidth.length; i++) {
    var reportToolLi = $('<li></li>');
    reportToolLi.css('width', reportLiWidth[i]);
    reportToolControl.append(reportToolLi);
}


var reportLiDom = $('#report_tool_control>li');
reportLiDom.eq(0).on('click', function() {
    popupRelation(metadataRelation, popupTitleArray[0]);
})

reportLiDom.eq(1).on('click', function() {
    popupRelation(ERRelation, popupTitleArray[1]);
})

reportLiDom.eq(2).on('click', function() {
    popupRelation(versionCompare, popupTitleArray[2]);
})

reportLiDom.eq(3).on('click', function() {
    popupRelation(metaPersonalCenter, popupTitleArray[3]);
})

//统一报表的title按钮结束

//点击进入系统按钮结束

//多系统路径分析开始

//动态添加要展示的单个系统的列表
function addSystemList(curSysId) {
    var curSystemList = '<div class="current_system_list" id="current_system_list_' + curSysId + '">' +
        '<div class="system_title_per" id="multiple_system_title_' + curSysId + '">' +
        '<p></p>' +
        '<span></span>' +
        '</div>' +
        '<div class="multiple_path_analyze">' +
        '<div class="multiple_upstream_list" id="multiple_upstream_list_' + curSysId + '">' +
        '<div class="upstream_title_public">上游系统</div>' +
        '<div class="path_info_public">' +
        '<ul class="path_info_ul_public" id="multiple_upstream_info_ul_' + curSysId + '"></ul>' +
        '</div>' +
        '</div>' +
        '<div class="bultiple_downstream_list" id="multiple_downstream_list_' + curSysId + '">' +
        '<div class="downstream_title_public">下游系统</div>' +
        '<div class="path_info_public">' +
        '<ul class="path_info_ul_public" id="multiple_downstream_info_ul_' + curSysId + '"></ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="system_btn">' +
        '<button class="system_join_btn" id="multiple_path_btn_' + curSysId + '">进入系统</button>' +
        '</div>' +
        '</div>';


    $('#multisystem_list').prepend(curSystemList)



    //给多系统列表中的每一个系统列表添加滚动条
    $(function() {
        $('.multiple_path_analyze').niceScroll({
            cursorcolor: '#cfcfcf',
            cursorborder: 'none',
            autohidemode: 'hidden'
        });
    })


    $('#multiple_path_btn_' + curSysId).on('click', function() {
        hideSomeList(curSysId);
    });

}
//给多系统路径分析列表添加滚动条
$(function() {
    $('#multisystem_list').niceScroll({
        cursorcolor: '#cfcfcf',
        cursorborder: 'none',
        // autohidemode: 'hidden'
    });
})




//多系统路径分析结束
//点击弹出层的关闭按钮和遮罩层
$('#relation_close,#full_screen_mask').on('click', function() {
    $('#full_screen_mask').css('display', 'none')
    dataPopups.css('display', 'none');
    $('#state li').removeClass('false');
});

//左边4个按钮开始
// $(".test_btn").on("click", function() {
//     $('#state li').removeClass('false');
// })
// $("#state li").on("mouseover", function() {
//     $(this).addClass("hover");
// })
// $("#state li").on("mouseout", function() {
//     $(this).removeClass("hover");
// })

//获取元数据资产的div
var assetaPie = $('#assets_pie');

// var defaultImgAry = ['../mms_images/img/relation_default.PNG', '../mms_images/img/browse_default.PNG', '../mms_images/img/assets_default.PNG','../mms_images/img/center_default.PNG'];



// //点击元数据关系按钮
// titleDomLi.eq(0).on('click', function() {
//     popupRelation(metadataRelation, popupTitleArray[0]);
//     toggleImg(0);
//     $('#path_analyze_info').hide();
//     $('#path_analyze_options').hide();
// });


// //点击版本浏览按钮
// titleDomLi.eq(1).on('click', function() {
//     popupRelation(versionCompare, popupTitleArray[1]);
//     toggleImg(1);
//     $('#path_analyze_info').hide();
//     $('#path_analyze_options').hide();
// });


// //点击元数据资产
// titleDomLi.eq(2).on('click',function (){
//     popupRelation(assetaPie, popupTitleArray[4]);
//     toggleImg(2);
//     $('#path_analyze_info').hide();
//     $('#path_analyze_options').hide();
// });


// //点击个人中心
// titleDomLi.eq(3).on('click', function() {
//     popupRelation(metaPersonalCenter, popupTitleArray[2]);
//     toggleImg(3);
//     $('#path_analyze_info').hide();
//     $('#path_analyze_options').hide();
// });

// //点击路径分析
// // titleDomLi.eq(2).on('click', function() {
// //     pathClickNum++;
// //     toggleImg(2);
// //     $(this).attr('id', 'path_analyze_title');
// //     $('#metadata_statistics').hide();
// // });



// function toggleImg(index) {
//     var liDom = titleDomLi.eq(index)
//     liDom.siblings().removeClass("selected").addClass("false");
//     liDom.removeClass("hover");
//     liDom.toggleClass("selected");
//     var img_path = liDom.children(0).children(0)[0].src;
//     //"file:///C:/Users/Administrator/Desktop/dataMap_icon/img/path_default_selected.PNG";
//     if (!liDom[0].className.indexOf('selected')) {
//         liDom.children(0).children(0)[0].src = img_path.substring(0, img_path.length - 4) + "_selected.PNG";
//         liDom.attr('flag', true);
//     } else {
//         liDom.children(0).children(0)[0].src = img_path.substring(0, img_path.length - 13) + ".PNG";
//         liDom.attr('flag', false);
//         // if(!$(this).siblings().className.indexOf('false')){
//         liDom.siblings().removeClass("false");
//         $('#single_system_path').hide();
//         $('#multisystem_list').hide();
//         // }
//     }
// }

// //设置按钮的默认状态
// function defaultBtnStyle(startIndex, imgAry) {
//     for (var i = startIndex; i < imgAry.length; i++) {
//         $("#state li:eq(" + i + ")").find('img').attr('src', imgAry[i]);
//         $("#state li:eq(" + i + ")").removeClass("selected").removeClass("false");

//     }
//     $('#path_analyze_title').attr('flag', false);
// }



//4个按钮结束


//点击系统信息列表的按钮开始

//点击系统关系(路径分析)
$('#system_relation_btn').on('click', function() {
    $(this).attr('flag',true)
});

//点击元数据关系
$('#metadata_relation_btn').on('click', function() {
    popupRelation(metadataRelation, popupTitleArray[0]);
    $('#path_analyze_info').hide();
    $('#path_analyze_options').hide();
});

//点击元数据资产
$('#metadata_asstes_btn').on('click', function() {
    popupRelation(assetaPie, popupTitleArray[4]);
    $('#path_analyze_info').hide();
    $('#path_analyze_options').hide();
});

//点击版本比较
$('#version_compare_btn').on('click', function() {
    popupRelation(versionCompare, popupTitleArray[1]);
    $('#path_analyze_info').hide();
    $('#path_analyze_options').hide();
});

//点击添加视图
$('#add_view_btn').on('click', function() {
    hideSomeList(currentSystemId);
});




//点击系统信息列表的按钮结束



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

//当点击系统元素时取消信息列表---这个函数在dataMapwxc.js中调用--结束

//进入表级页面后的操作开始


// titleDomLi.eq(2).on('click', function() {
//     var sysFlag = $('#chart').css('display');
//     if (sysFlag == 'none') {
//         alert('hello');
//     }
// });


// function reportOperate() {
//     titleDomLi.eq(2).on('click', function() {
//         alert('jlq-=-----hello-------------');
//         return false;
//     });
// }

function toggleState(id1, id2) {
    $('#' + id1).prop('checked', false)
    $('#' + id2).prop('checked', false);
}
//点击血缘分析
$('#blood_analyze').on('click', function() {
    $(this).prop('checked', true);
    toggleState('impact_analyze', 'cross_sysytem');
    popupRelation(chartPathAnalyze, popupTitleArray[3]);
    // $('#path_analyze_info').show();
    // $('#small_map_title>p').html('T_DM_CORP_CUST_DPST_ACCT');
    // legendInfo('path_analyze_legend', chartColor, 'path_legend_title', '系统加工关系图例');
})

//点击影响分析
$('#impact_analyze').on('click', function() {
    $(this).prop('checked', true);
    toggleState('blood_analyze', 'cross_sysytem');
    popupRelation(fieldPathAnalyze, popupTitleArray[3]);
    // $('#path_analyze_info').show();
    $('#path_analyze_options').show();
    // $('#small_map_title>p').html('字段1');
    // legendInfo('path_analyze_legend', fieldColor, 'path_legend_title', '表加工关系图例');
})

//点击全链分析
$('#cross_sysytem').on('click', function() {
    $(this).prop('checked', true);
    toggleState('blood_analyze', 'impact_analyze');
    popupRelation(otherPathAnalyze, popupTitleArray[3]);
    // $('#path_analyze_info').show();
    $('#path_analyze_options').show();
    // $('#small_map_title>p').html('字段2');
    // legendInfo('path_analyze_legend', fieldColor, 'path_legend_title', '表加工关系图例');
})


$('#statstics_close').on('click', function() {
    $('#statistics_info').hide();
});


function hideSomeListWxc() {
    $('#chart_map').hide();
    $('#chart').show();
    $('#report_system').hide();
    $('#chart_list').hide();
    $('#map_info_shouye').show();
}



//进入表级页面后的操作结束

//logo那一行右边的按钮开始

//点击当前li标签改变背景颜色
$('#metadata_control_ul>li').on('click', function() {
    $(this).addClass('bg_color').siblings('li').removeClass('bg_color');
});

var conLiDoms = $('#metadata_control_ul>li');
//点击元数据地图按钮
conLiDoms.eq(0).on('click', function() {
    $('#personal_center_page').hide();
    $('#metadata_analyze_page').hide();
    $('#metadata_relation_page').hide();
    $('#view_control').show();
    $('#tool_search').show();
    $('#map_info_shouye').show();
    $('#chart').show();
});

//点击元数据关系按钮
conLiDoms.eq(1).on('click', function() {
    hideSomePage();
    $('#personal_center_page').hide();
    $('#metadata_analyze_page').hide();
    $('#view_control').show();
    $('#tool_search').show();
    $('#metadata_relation_page').show();
});

//点击元数据分析按钮
conLiDoms.eq(2).on('click', function() {
    hideSomePage();
    $('#personal_center_page').hide();
    $('#metadata_relation_page').hide();
    $('#metadata_analyze_page').show();
});

//点击用户名按钮
conLiDoms.eq(3).on('click', function() {
    hideSomePage();
    $('#metadata_analyze_page').hide();
    $('#metadata_relation_page').hide();
    $('#personal_center_page').show();

});

function hideSomePage() {
    $('#view_control').hide();
    $('#tool_search').hide();
    $('#map_info_shouye').hide();
    $('#chart').hide();
    $('#chart_map').hide();
    $('#system_list').hide();
    $('#serach_result').hide();
    $('#search_back_btn').hide();
    $('#single_system_path').hide();
    $('#multisystem_list').hide();
    $('#chart_list').hide();
}
//logo那一行右边的按钮结束

//左边两个视图按钮开始
$('#view_control>div').on('click', function() {
    $(this).addClass('view_con_bg').siblings('div').removeClass('view_con_bg');
});

//左边两个视图按钮结束


// })(jQuery)
