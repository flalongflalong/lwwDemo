//地图图例开始
//元数据资产的图例模拟数据
var assetsLegendColor = ['#3786ad', '#34b99a', '#d78a42'];
var assetsLegendInfo = ['业务元数据', '技术元数据', '操作元数据'];
//全景视图的模拟数据
var viewLegendColor = ['#3ebdf0', '#688bcb', '#28c9c0', '#3ed882'];
var viewLegendInfo = ['源系统数据区', '数据交换区', '数据集成区', '数据应用区'];

function showLegend(colorAry, infoAry, legendId) {
    for (var i = 0; i < colorAry.length; i++) {
        var liDom = '<li><span style="background:' + colorAry[i] + '"></span><p>' + infoAry[i] + '</p></li>';
        $('#' + legendId).append(liDom);
    }
}
showLegend(assetsLegendColor, assetsLegendInfo, 'assets_legend');
showLegend(viewLegendColor, viewLegendInfo, 'view_legend');
//地图图例结束

//系统更新时间开始
var systemUpdateTime = [{
    id: '1',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '2',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '3',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '4',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '5',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '6',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '7',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '8',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '9',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '10',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '11',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '12',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '13',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日 09:31:31'
}, {
    id: '14',
    name: 'xxxxxx系统',
    updateTime: '2017年8月23日  09:31:31'
}, ];

function updateTimeInfo(timeAry, id) {
    for (var i = 0; i < timeAry.length; i++) {
        var curUpdate = timeAry[i];
        var liUpdate = '<li><p>' + curUpdate.name + '</p><span>' + curUpdate.updateTime + '</span></li>';
        $('#' + id).append(liUpdate);
    }
}

updateTimeInfo(systemUpdateTime, 'assets_system_info');


//系统更新时间结束

//最近访问开始
var lastVisitTime = [{
    id: '1',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '2',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '3',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '4',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '5',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '6',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '7',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '8',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '9',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '10',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '11',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '12',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '11',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '13',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, {
    id: '14',
    name: 'xxxxxx系统',
    visitTime: '2017年8月23日 09:31:31'
}, ];

function visitTimeInfo(timeAry, id) {
    for (var i = 0; i < timeAry.length; i++) {
        var curVisit = timeAry[i];
        var liVisit = '<li><p>' + curVisit.name + '</p><span>' + curVisit.visitTime + '</span></li>';
        $('#' + id).append(liVisit)
    }
}

visitTimeInfo(lastVisitTime, 'assets_visit_time');
visitTimeInfo(lastVisitTime, 'view_visit_time');



//添加滚动条
$(function() {
    $('.name_visit_bottom').niceScroll({
        cursorcolor: '#cfcfcf',
        cursorborder: 'none'
        // autohidemode:false
    });
})

//最近访问结束




// 添加饼图开始

//模拟按元数据类型的数据
var datasetTotal = [{
    name: '操作 8%',
    percentage: '8%',
    value: 8
}, {
    name: '技术 72%',
    percentage: '72%',
    value: 72
}, {
    name: '业务 20%',
    percentage: '20%',
    value: 20
}]

var datasetSubclass = [{
    name: '数据备份回复记录 2%',
    value: 2
}, {
    name: '数据归档记录 2%',
    value: 2
}, {
    name: '系统用户使用记录 2%',
    value: 2
}, {
    name: 'ETL运行记录 2%',
    value: 2
}, {
    name: 'ETL程序 5%',
    value: 5
}, {
    name: '技术规则 35%',
    value: 35
}, {
    name: '物理模型 14%',
    value: 14
}, {
    name: '逻辑模型 18%',
    value: 18
}, {
    name: '业务规则 12%',
    value: 12
}, {
    name: '术语 2%',
    value: 2
}, {
    name: '系统信息 2%',
    value: 2
}, {
    name: '业务数据分类 2%',
    value: 2
}, {
    name: '概念模型 2%',
    value: 2
}];
//模拟只展示系统的数据 20662个表总共
var datasetSystem = [{
    name: 'ODS系统 6.84%',
    value: 1414
}, {
    name: '统一报表 20.17%',
    value: 4168
}, {
    name: '全流程信贷系统 7.73%',
    value: 1598
}, {
    name: '临时区 8.64%',
    value: 1786
}, {
    name: '关键业务指标应用系统 0.08%',
    value: 18
}, {
    name: '核心国结系统 9.03%',
    value: 1866
}, {
    name: '客户关系管理系统 6.37%',
    value: 1317
}, {
    name: '中小企业贷款管理系统 3.40%',
    value: 700
}, {
    name: '核心系统 13.70%',
    value: 2831
}, {
    name: '核心报表系统 2.10%',
    value: 433
}, {
    name: '核心柜面系统 2.04%',
    value: 421
}, {
    name: 'DS系统 10.13%',
    value: 2093
}, {
    name: '基础汇总区 8.97%',
    value: 1853
}, {
    name: '统一报表集市 0.80%',
    value: 164
}, ];
//三大类的颜色
var totalColor = ['#d78a42', '#34b99a', '#3786ad'];
//三大类对应的各个系统的颜色
var classColor = [
    '#efab7e', '#ed9857', '#de8237', '#ce7728',
    '#a3e3cb', '#7adbb8', '#48c6a0', '#16b58c',
    '#65d9e6', '#48cfe5', '#31bdde', '#18acd4', '#2697bf'
]
//单个饼图中各个系统的颜色
var systemColor = ['#4591dd', '#45c7dd', '#45b5ff', '#3e5ca4', '#4560ef',
    '#46c2fe', '#45a9ff', '#136ade', '#56b2ff', '#79c6f0',
    '#4669df', '#2b74dd', '#8fb1df', '#0ab6ff'
];
var width = 1380,
    height = 660;

// var width = $('#metadata_graph').width();
// var height = $('#metadata_graph').height();

// console.log(width);
// console.log(height);

// 创建一个分组用来组合要画的图表元素
var mainSvg = d3.select('#metadata_graph').append('svg')
    .attr('id', 'total_pie')
    .attr('width', width)
    .attr('height', height)
//把嵌套的双环饼图放到totalG这个g元素中
var totalG = mainSvg.append('g')
    .classed('main_total', true)
    .attr('transform', "translate(" + width / 2 + ',' + height * 3 / 7 + ')');
//把展示系统的饼图放到systemG这个g元素中
var systemG = mainSvg.append('g')
    .classed('main_system', true)
    .attr('transform', "translate(" + width / 2 + ',' + height * 3 / 7 + ')');

//绘制饼图的方法
function addPie(dataset, innerRadius, outerRadius) {
    if (dataset == datasetSystem) {
        main = systemG;
    } else {
        main = totalG;
    }


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
    var radius = 300; //控制折线的长度
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
        .attr('d', function(d) {
            return arc(d);
        });
    // 添加文字标签
    var texts = labels.selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
        .attr('dy', '0.35em')
        .text(function(d, i) {
            return d.data.name;
        })
        .style('opacity', 1);
    //根据判断画折线
    if (dataset == datasetSubclass || dataset == datasetSystem) {
        function chooseColor(i) {
            //根据判断选择饼图的颜色
            if (dataset == datasetSubclass) {
                return getColor(i, classColor);
            } else {
                return getColor(i, systemColor);
            }
        }
        arcs.attr('fill', function(d, i) {

            return chooseColor(i);
        })
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
            .attr('fill', function(d, i) {

                return chooseColor(i);
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
                return chooseColor(i);
            })
            .style('opacity', 0.5);
    } else {
        arcs.attr('fill', function(d, i) {
            return getColor(i, totalColor);
        })
        texts.attr('transform', function(d) {

                return 'translate(' + arc.centroid(d) + ')'; //arc.centroid(d) 能算出弧线的中心
            })
            .text(function(d) {
                return d.data.name;
            })
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .style('fill', function(d, i) {
                return '#fff';
            })
    }


};



function midAngel(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
//通过索引获取到每一个颜色值
function getColor(idx, colorAry) {

    return colorAry[idx % colorAry.length];
}

//绘制双环饼图中的内环饼图
addPie(datasetTotal, 0, 160);
//绘制双环饼图中的外环饼图
addPie(datasetSubclass, 180, 220)
//绘制只展示系统的单个饼图
addPie(datasetSystem, 100, 200);


// 添加饼图结束


//点击按钮切换饼图开始

//通过显示和隐藏存放饼图的g元素来切换饼图
// $('#metadata_class').prop('checked',true);
$('.main_system').hide();

//当ie浏览器刷新时，让单选按钮radio回复默认值
window.onload = function (){
  $('#metadata_class').prop('checked',true);
}

$('#metadata_class').on('click', function() {
    $('.main_system').hide();
    $('.main_total').show();
    $('#map_legend_pie').show();
});
$('#metadata_system').on('click', function() {
    $('.main_total').hide();
    $('.main_system').show();
    $('#map_legend_pie').hide();
});

//点击按钮切换饼图结束
//
//点击退出按钮
$('.exit').on('click', function() {
    location.href = '../index.html';
});

//点击左边列表的查看按钮
$('.map_view').on('click', function() {
    location.href = '../mms_views/dataMap.html';
});
