'use strict';

var OPACITY = { // 透明度的值
        NODE_DEFAULT: 0.8, // 节点的默认透明度0.8
        NODE_FADED: 0.2, // 节点消失的透明度0.11
        NODE_HIGHLIGHT: 1, // 节点突出的透明度 1
        LINK_DEFAULT: 0.8, // 连接的默认透明度0.8
        LINK_FADED: 0.1, // 连接消失的透明度0.1
        LINK_HIGHLIGHT: 1 // 连接突出的透明度1
    },
    NODE_WIDTH = 500, // 节点的宽度 40
    NODE_HEIGHT = 0.3, // 节点的高度 5
    NODE_SPACING = 80, // 单个节点的间距 15
    NODE_SPACING_B = 5, // 单个节点的间距b 5
    LINK_SPACING = 1, // 连接的间距 1
    NODE_SPACEINGARRAY = [15, 20, 10, 1], //节点的间距数组
    NODE_SPACEINGARRAY_B = [10, 5, 2, 1], //节点的间距数组B
    NODE_YDISTANCEMUL = 15, // 节点的Y的距离 15
    NODE_YDISTANCEMUL_B = 5, // 节点的Y的距离B，5
    THICKNESS_MIN = 2, // 最小厚度 2
    TYPES = ["Structure", "Unstructured", "Integrated", "BigData"], //类型数组
    TYPE_COLORS = ["#50BBEC", "#6C8BC7", "#D89949", "#54B554"], //类型颜色数组
    TYPE_HIGHLIGHT_COLORS = ["#41ABFF", "#7E8BC7", "#D88610", "#54CE54"], // 类型突出数组颜色
    TEXT_NORMAL_COLOR = "#2e2e2e", //文本正常的颜色
    OUTER_MARGIN = 0, // 外边距的距离0
    ZOOM_MIN = -0.5, // zoom的最小值 0.5
    ZOOM_MAX = 5, // zoom的最大值 5
    TEXT_BIG_SIZE = [20, 14, 12, 12], // 文本的大的尺寸数组 20,14,12,12
    TRANSITION_DURATION = 100, // 过渡的时间
    COLLAPSER = {
        RADIUS: 8, // 人字板的半径
        SPACING: 2 // 人字板的间距
    },
    MARGIN = {
        TOP: 2 * (COLLAPSER.RADIUS + OUTER_MARGIN), //margin.top 2*8+0
        RIGHT: OUTER_MARGIN, //0
        BOTTOM: OUTER_MARGIN, //0
        LEFT: OUTER_MARGIN //0
    },
    LAYOUT_INTERATIONS = 32, //布局的相互作用 32
    REFRESH_INTERVAL = 7000, //刷新的间隔
    SERRCH_WORD = "", //搜索字
    toolbarArray = [ //定位按钮 数组
        { id: 'tool-refresh', class: 'glyphicon glyphicon-screenshot', name: '定位' }
    ],
    mapLevelArray = [ // 地图级数组
        { id: "title", name: "地图层级", 'sRange': [] },
        { id: "0", name: "&emsp;区", 'sRange': [0, 0.15] },
        { id: "1", name: "&emsp;域", 'sRange': [0.15, 0.25] },
        { id: "2", name: "&emsp;系统", 'sRange': [0.25, 100.0] },
        { id: "3", name: "&emsp;Top表", 'sRange': [1.0, 100] },
        { id: "4", name: "&emsp;表", 'sRange': [1.0, 100] }
    ],
    userLevel = 4; //量 2


var sankeyConf = {}; // 声明一个空对象
function resetConf(node) { //封装一个复位配置 函数,
    sankeyConf[node] = { nodeid: node, reDrawConunt: 0, oldTransfrom: {}, redrawOver: false, mapL: 0, mapLevelRange: [] };
    // 此时的 node参数 代表 id为chart 的div

    return sankeyConf[node];

}
var xinData;
var top5Data;
var yuanData;
$.ajax({
    url: "../mms_data/xin.json",
    success: function(data) {
        xinData = data;
        // addBihiSankey('#chart', data, 'expanded', 1)

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }
});

$.ajax({
    url: "../mms_data/yuan40.json",
    success: function(data) {
        // addBihiSankey('#chart', data, 'expanded', 3)
        top5Data = data;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }
});

$.ajax({
    url: "../mms_data/yuan.json",
    success: function(data) {
        // addBihiSankey('#chart', data, 'expanded', 4)
        yuanData = data;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }
});

/**
 *
 * @node 数据地图所加载的div id 或 classm
 * @data 数据地图数据
 * @flag 数据地图是否展开
 * @mapLevel 数据地图层级
 */
function addBihiSankey(node, data, flag, mapLevel) { // 封装一个函数，命名为(添加铋层桑基图)
    var _conf = sankeyConf[node] || resetConf(node); // 声明一个变量，把sankeyConf[node] 或者 restConf(node)赋值给他
    var oldTransfrom = _conf.oldTransfrom, //记录当前位置 缩放
        mapL = mapLevel; //当前地图层级

    var parentNode = d3.select(node); // 声明一个变量，把d3.select(node)赋值给parentNode
    parentNode.selectAll('div.chart-body').remove(); // 移除div下的class为chart-body的类选择器
    parentNode.selectAll('div#tooltip').remove(); // 移除div下的class为tooltip的类选择器
    parentNode.selectAll('div#mapLevel').remove(); // 移除div下的id为mapLevel的选择器
    parentNode.selectAll('div#toolbar').remove(); // 移除div下的id为toolbar的选择器


    // var listBody = parentNode.append("div").attr("class", "chart-left"), // 声明一个 命名为(body列表)的变量，把d3.select(node)下添加的div赋值给它
    var svgBody = parentNode.append("div").attr("class", "chart-body"), // 同上
        isMain, colorScale, highlightColorScale, zoom, tooltip, //在声明一堆局部变量
        bihisvg, bihiG, biHiSankey, path, defs, isTransitioning,
        toolbar, toolbarNodes, toolbarNodesEnter, arrowNodes, arrowNodesEnter,
        mapLevelElem, mapLevelSvg, mapLevelArrow, mapLevelButC, mapLevelNodes, mapLevelEnter, mapImg;
    // 是主要的
    isMain = function() {
        if (node === '#chart') { return true }
        return false // 如果条件是 node === #chart 执行ture,破则执行false
    };
    // 局部变量 colorScale(颜色规模) 把序列比例尺的 输入域的值是type(类型)数组和输出域的值type_colors(颜色类型) 的颜色数组赋值给 colorScale变量
    colorScale = d3.scaleOrdinal().domain(TYPES).range(TYPE_COLORS);
    highlightColorScale = d3.scaleOrdinal().domain(TYPES).range(TYPE_HIGHLIGHT_COLORS); //颜色突出变量 同上输入域同上输出域是 highlightColorScale变量
    zoom = d3.zoom() // 定义一个zoom鼠标滑轮放大缩小
        .scaleExtent([ZOOM_MIN, ZOOM_MAX]) // 设置zoom的缩放范围,最大值是0.5,最大值是5
        .on('zoom', redraw); // 绑定zoom事件，redraw当用户点击按钮时，重绘数据图表

    //获取 node的宽高 
    function getNodeWH(nodeName) { //#chart的容器

        var n = d3.select(nodeName); //声明一个变量n，把当前选择的nodeName赋值给n
        if (n.node() == null || $(n.node()).css('display') == 'none') return false;
        return {

            'w': Math.round(n.style('width').split('px')[0]),
            'h': Math.round(n.style('height').split('px')[0])
        }
    };

    var WIDTH = getNodeWH(node).w - MARGIN.LEFT - MARGIN.RIGHT,
        HEIGHT = getNodeWH(node).h - MARGIN.TOP - MARGIN.BOTTOM;

    // 禁止用户中断操作，让动画完成
    var disableUserInterractions = function(time) {
            isTransitioning = true;
            setTimeout(function() {
                isTransitioning = false;
            }, time);
        },
        // 隐藏提示框
        hideTooltip = function(flag) {
            if (!flag) tooltip.attr('data-node','null');
            return tooltip.transition() // 提示框过渡
                .duration(TRANSITION_DURATION) // 过渡时间
                .style("opacity", 0); //透明度0
        },
        // 显示提示框
        showTooltip = function() {
            return tooltip
                .style("left", d3.mouse($(d3.event.target).parents('.chart-container')[0])[0] + 10 + "px") // 鼠标的位置是相对于页面的水平位置 ，从目标节点的祖先元素 .chart-container +10px的位置开始显示
                .style("top", d3.mouse($(d3.event.target).parents('.chart-container')[0])[1] + 15 + "px")
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", 1);
        },
        //给toolbar 定位按钮设置的函数 刷新svg 函数,给图定位到100,50的位置
        refreshSvg = function(obj) {
            
            _conf.redrawOver = false;
            var k = _conf.oldTransfrom.k,
                x = -520,
                y = -170;
            var t = d3.zoomIdentity.translate(x, y).scale(k); // 设置一个恒等变换， 原点平移到100,50，缩放给k
            obj.bihisvg.transition() // svg的过渡
                .duration(500)
                .call(zoom.transform, t) // svg强制指向zoom事件的transform的t缩放效果
                .on('end', function() { // 在结束zoom事件时，取消鼠标双击时间
                    bihisvg.call(zoom).on("dblclick.zoom", null);
                    _conf.redrawOver = true;
                });

        },
        downloadSvg = function(obj) { // 下载svg                      
            var canvas = obj.bihisvg.select('g').node(); // 选择 obj参数 所代表的元素 下的bihisvg下的g的第一个不为空的元素。
            var saveOptions = { w: 200, h: 300 }
            saveSvgAsPng(canvas, 'test.png', saveOptions);
        };

    //图表容器,给svg获取 属性，width,height
    bihisvg = svgBody.append("svg") // 在 body 下添加一个 svg画布，把它赋值给 bihisvg变量
        .attr('class', 'bihi-svg') // 获取 class为 bihi-svg 的选择器
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT) // 获取宽度 
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);
    bihiG = bihisvg.append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");
    bihiG.append("g").attr("id", "expandNodes");
    bihiG.append("g").attr("id", "links");
    bihiG.append("g").attr("id", "nodes");

    //提示信息
    tooltip = parentNode.append("div").attr("id", "tooltip");
    tooltip.style("opacity", 0)
        .append("p")
        .attr("class", "value");

    //定位工具条
    toolbar = parentNode.append("div").attr("id", "toolbar")
        .attr('class', 'toolbar');
    toolbarNodes = toolbar.selectAll(".tool-item")
        .data(toolbarArray, function(d) { return d.id; });
    toolbarNodes.exit().remove();
    toolbarNodesEnter = toolbarNodes.enter().append("span")
        .attr("class", function(d) { return "tool-item " + d.class + "" });
    toolbarNodesEnter.append('span')
        .attr('class', 'tool-title')
        .text(function(d) { return d.cn; });
    toolbarNodesEnter.on('click', function(d) {
        if (d.id == 'tool-refresh') { refreshSvg(_conf) } else if (d.id == 'tool-download') { downloadSvg(_conf) }
    });
    _conf.bihisvg = bihisvg;
    _conf.toolbar = toolbar;

    // 地图层级
    if (isMain()) {

        mapLevelElem = parentNode.append("div").attr("id", "mapLevel")
            .attr('class', 'mapLevel mapLevel-' + userLevel);
        mapLevelSvg = mapLevelElem.append('svg')
            .attr("width", 100)
            .attr("height", (90 + userLevel * 30));
        mapLevelSvg.append('rect')
            .style("opacity", 0.3)
            .style("fill", "gray")
            .attr("height", 160)
            .attr("width", 8)
            .attr("x", 75)
            .attr("y", 45);

        mapLevelArrow = mapLevelSvg.append("polygon")
            .attr('fill', 'snow')
            .attr('stroke', 'gray')
            .attr('stroke-miterlimit', '10')
            .attr('stroke-width', '1')
            .attr('points', '12,15 35,15 35,30 12,30 1,22.5')
            .attr('transform', 'translate(56,' + (32 + (mapLevel ? mapLevel * 34 : 0)) + ')');

        mapLevelButC = mapLevelElem.append('div')
            .attr('class', 'map-Level-btn-c');
        mapLevelNodes = mapLevelButC.selectAll(".level-item")
            .data(mapLevelArray.filter(function(d) {
                return (d.id <= userLevel) || (d.id == 'title');
            }), function(d) { return d.id; });

        mapLevelEnter = mapLevelNodes.enter().append("div")
            .attr("class", function(d) { return "level-item level-item-" + d.id + "" })
            .attr('data-levelId', function(d) { return d.id })
            .attr('data-sRange', function(d) { return d.sRange });
        mapLevelEnter.append("span")
            .html(function(d) {
                return d.name;
            })

        mapLevelEnter.append('img')
            .attr('class', 'mapimg')
            .attr('src', function(d) {
                if (d.id == 'title') {
                    return '../mms_images/images/title.jpg'
                }
                if (d.id == '0') {
                    return '../mms_images/images/qu.jpg'
                }
                if (d.id == '1') {
                    return '../mms_images/images/yu.jpg'
                }
                if (d.id == '2') {
                    return '../mms_images/images/xitong.jpg'
                }
                if (d.id == '3') {
                    return '../mms_images/images/biao.jpg'
                }
                if (d.id == '4') {
                    return '../mms_images/images/biao.jpg'
                }
            })
        // mapLevelEnter.on('click', function(d) {
        //     
        //     console.log(d);
        //     if (d.id == mapL || d.id == 'title') return false;
        //     _conf.mapLevelRange = d.sRange;
        //     _conf.redrawOver = false;
        //     mapLevelArrow
        //         .transition()
        //         .duration(TRANSITION_DURATION)
        //         .attr('transform', 'translate(56,' + (25 + d.id * 34) + ')');

        //     setTimeout(function() {
        //         mapL = d.id;
        //         // if (useLocalStorageData && getRetData('overView2')) {
        //         //     var retdata = eval('(' + getRetData('overView2') + ')');
        //         //     addBihiSankey_Y('#chart-yuan',retdata,'expanded',d.id);
        //         //     return true;
        //         // }
        //         $.ajax({
        //             url: "../mms_data/xin.json",
        //             success: function(data) {
        //                 // saveRetData('overView2', data);
        //                 // var retdata = eval('(' + data + ')');
        //                 addBihiSankey('#chart', data, 'expanded', d.id)
        //             },
        //             error: function(XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest.status);
        //                 alert(XMLHttpRequest.readyState);
        //                 alert(textStatus);
        //             }
        //         });
        //     }, TRANSITION_DURATION);
        // })
    }

    //箭头节点
    // defs = bihiG.append("defs");
    // arrowNodes = defs.selectAll(".arrowHead")
    //     .data(TYPES, String);
    // arrowNodes.exit().remove();
    // arrowNodesEnter = arrowNodes.enter().append("marker")
    //     .attr("id", function(d) { return node.split('#')[1] + "arrowHead" + d })
    //     .style("fill", function(d) { return colorScale(d.replace(/ .*/, "")); })
    //     .attr("viewBox", "0 0 6 10")
    //     // .style("opacity","0.8")
    //     .attr("refX", "1")
    //     .attr("refY", "5")
    //     .attr("markerUnits", "strokeWidth")
    //     .attr("markerWidth", "1")
    //     .attr("markerHeight", "1")
    //     .attr("orient", "auto")
    //     .append("path")
    //     .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

    // 设置桑基图
    biHiSankey = d3.biHiSankey();

    biHiSankey.nodeWidth(NODE_WIDTH) //桑基图的节点宽度40px
        .nodeHeight(NODE_HEIGHT) //桑基图的节点高度5px
        .nodeSpacing(NODE_SPACING) //桑基图的节点间距15px
        .linkSpacing(LINK_SPACING) //桑基图的连接线间距1

    if (!isMain() && selNode && selNode.slevel == 4) {
        biHiSankey.nodeSpacingArray(NODE_SPACEINGARRAY_B) // 如果条件不是isMain,selNode,selNode.slevel == 2 桑基图的节点间距数组，执行b 10,5,2,1
            .yDistanceMul(NODE_YDISTANCEMUL_B); //节点y轴的距离执行b,5
    } else {
        biHiSankey.nodeSpacingArray(NODE_SPACEINGARRAY) //否则执行 节点间距数组30,20,2,1，
            .yDistanceMul(NODE_YDISTANCEMUL); // 节点的距离执行
    }
    biHiSankey.size([WIDTH, HEIGHT]); // 桑基图的绘制范围

    path = biHiSankey.link().curvature(0.7); // 绘制路径是桑基图的线性绘制路径。curvature是路径连线的弧度。

    //图形更新
    function update() {
        var link, linkEnter, node, nodeEnter, expandedNodes, expandedNodesEnter, leftElem, leftNodes, leftNodesEnter; //声明一堆未赋值的变量
        // 包含的子节点函数。 
        function containChildren(node) {
            node.children.forEach(function(child) {
                child.state = "contained";
                child.parent = this;
                child._parent = null;
                containChildren(child); // 递归，自己调用自己本身。
            }, node);
        }
        // 扩大，延伸 ，
        function expand(node) {
            node.state = "expanded"; ////节点的状态，扩大延伸
            node.children.forEach(function(child) { // 给node参数所代表的值 的子节点循环，
                child.state = "collapsed"; //child参数代表的子节点的状态，崩溃
                child._parent = this; // 把this赋值给 child参数代表的子节点的父节点 
                child.parent = null; // child参数代表的子节点的父节点的值为，null空
                containChildren(child); // 调用containChildren(node)的函数，参数给child代表的子节点
            }, node);
        }

        function collapse(node) {
            node.state = "collapsed"; // node参数代表的值的状态 = 崩溃
            containChildren(node); // 调用(containChildren包含的子节点函数)，参数给node,代表当前拖拽的节点。
        }

        function restoreLinksAndNodes() { // 恢复链接和节点

            linkEnter // 线的进入变量
                .style("stroke", getNodeColor) //线的边框颜色
                .transition()
                .duration(TRANSITION_DURATION) //过渡时间100毫秒
                .style("opacity", OPACITY.LINK_DEFAULT); // 透明度

            nodeEnter // 节点的变量
                .classed('svg-g-sel', false) // 不开启svg-g-sel的选择器
                .selectAll("rect") // 选择所有矩形
                .style("fill", getNodeColor); // 矩形的填充色，填充色是一个封装的(函数)

            nodeEnter // 节点进入变量
                .select('text') // 选择单个text文本
                .classed('svg-text-sel', false); // 不开启 svg-text-sel 选择器

            nodeEnter.filter(function(n) { return n.state === "collapsed"; }) //节点进入变量
                .transition()
                .duration(TRANSITION_DURATION) //过渡时间100毫秒
                .style("opacity", OPACITY.NODE_DEFAULT); // 透明度0.8
        }
        // 封一个函数，显示节点的信息
        function showNodeInfo(d) {


            if (d3.event.defaultPrevented) return; // zoomed，如果条件是d3.event的事件默认行为，执行return返回
            console.log('click:' + d)
            if (d3.select(this).classed('svg-g-sel')) {
                restoreLinksAndNodes();
                //当第2次点击系统时隐藏系统列表信息，显示元数据统计信息列表
                showD3List();

                return false;
                //如果是当前节点的class为svg-g-sel的话，执行恢复线和节点的函数，restoreLinksAndNodes(); return false 阻止时间默认行为
            } else {
                //根据判断让数据中有系统信息的才让列表显示
                if (d.info) {
                    clickHandleTotal(d.id);
                }

                //隐藏元数据统计信息列表
                hideD3List();
            }

            var fixesPos = false; //是否需要定位
            if (d3.select(this).classed('node-item')) { fixesPos = true } // 如果条件是，当前选择的节点是class为node-item的话，则开启定位

            // leftNodesEnter       // 左边节点进入变量
            //     .classed('sel',false);  // 不开启class为sel的选择器
            nodeEnter // 节点变量
                .select('text') // 选择单个text文本
                .classed('svg-text-sel', false); // 不开启class为svg-text-sel的选择器

            if (d.state !== "expanded") { // 参数d的状态，不是放大的时候
                fadeUnconnected(d) // 执行在588行封装好的函数(未连接的，颜色变淡，)
                highlightConnected(d, fixesPos) // 执行封装好的函数 (高亮下的链接，不定位)
            }
            // 右侧信息
            if (isMain()) { onGetNodeInfo(d) } //如果条件是isMain的话执行， onGetNodeInfo 得到d参数所代表的节点名称

            // d3.event.stopPropagation()
        }
        // 显示隐藏的子节点。node参数代表当前双击选中的节点
        function showHideChildren(node) {
            // d3.event.sourceEvent.stopPropagation()
            if (node.slevel >= mapL) return false; // 如果node.slevel >= d.id的话返回false;
            disableUserInterractions(2 * TRANSITION_DURATION); // 调用禁止用户中断操作 (函数)，时间2 * 100 毫秒
            hideTooltip(); // 调用 隐藏提示框
            if (!node.children || node.children.length == 0) return false; // 如果不是当前选择节点的子节点， 返回false;
            if (node.state === "collapsed") { expand(node); } // 当前选中节点的 状态， === 崩溃collapsed， 执行扩大，延伸
            else { collapse(node); } //否则collapse 折叠

            biHiSankey.relayout(); // 重新布局桑基图
            update(); // 调用图形更新 (函数) 
            linkEnter.attr("d", path); // 线进入变量 获取的 路径绘制方式是 桑基图的默认绘制方式
            restoreLinksAndNodes(); // 调用 恢复连线和节点 的(函数)
            d3.event.stopPropagation(); // 阻止事件冒泡
        }

        // (选中的节点高亮) 有联系的高亮,g参数表示当前选中的对象，fixesPos表示false
        function highlightConnected(g, fixesPos) {
            // 左边节点进入，过滤符合条件的数据， return返回 d === g, 开启 class为sel的选择器中的样式
            // leftNodesEnter.filter(function (d) {return d === g;}).classed('sel',true);
            // 声明一个变量，命名为G节点，把bihisvg下g.node的属性data-id="g.id"赋值给他
            var findGnode = bihisvg.select("g.node[data-id='" + g.id + "']");
            findGnode
                .classed('svg-g-sel', true) //findGnode的选择器样式开启
                .transition() // 过渡
                .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                .style("opacity", OPACITY.NODE_DEFAULT) // 透明度0.8
                .select("rect") // 选择矩形，给选中矩形的填充色高亮
                .style("fill", function(d) {
                    return getNodeColor(d, 'high') // return 返回 getNodeColor(d,t) 封装的节点颜色函数， d节点设置high
                })
                .style("fill-opacity", OPACITY.NODE_HIGHLIGHT); // 点击矩形 高亮下的透明度为1

            findGnode
                .select('text').classed('svg-text-sel', true); // 给文本添加 class为 svg-text-sel的选择器，
            //(给链接线设置点击状态下高亮) 过滤 linkEnter 下符合条件的对象，return返回d.source === g,然后给这个对象设置属性
            var highLinkArray = linkEnter.filter(function(d) { return d.source === g; })
                // .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
                .transition()
                .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                .style("stroke", function(d) {
                    d.state = 'HIGH'; // d参数所代表的是当前选中的对象的 状态 = HIGH 高亮
                    return getNodeColor(d.source, 'high') // return 返回 getNodeColor(d,t) 封装的节点颜色函数， d.source节点设置high
                })
                .style("opacity", OPACITY.LINK_HIGHLIGHT); // 透明度为1，link_highlight为高亮下的显示
                bihiG.selectAll('.link-tarck').remove();//清除已有箭头
               //连接线动画效果
               highLinkArray.nodes().forEach(function (h,a) {
                var fSize = $(h).css('stroke-width').split('px')[0]
                bihiG.selectAll('#links').append("text")
                    .attr("class","link-tarck")
                    .attr("x", 0)
                    .attr("y", 170)
                    // .attr("y", 60)
                    .attr("dy", fSize*0.25)
                    // .attr("dy", fSize*0.25)
                    .attr("font-size",'400')
                    // .attr("font-size",'2000')
                    .attr('fill', '#00ff00')
                    .text('→')
                    // .text('·')
                    .append('animateMotion')
                    .attr('begin',0)
                    .attr('dur','5s')
                    .attr('rotate','auto')
                    .attr('repeatCount','indefinite')
                    .attr('path',$(h).attr('d'))
                ;
            })

            linkEnter.filter(function(d) { return d.target === g; }) // 同上，只不过这个是个 d.target节点设置 选中状态下high高亮 
                // .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("stroke", function(d) {
                    d.state = 'HIGH';
                    return getNodeColor(d.source, 'high')
                })
                .style("opacity", OPACITY.LINK_HIGHLIGHT);
            // (封装)一个findSourceBlood的函数， bd参数代表当前选中的对象。 //找到源节点
            function findSourceBlood(bd) {
                //选择bihisvg下g.node的属性data-id="g.id"的属性
                bihisvg.select("g.node[data-id='" + bd.id + "']")
                    .transition()
                    .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                    .style("opacity", OPACITY.NODE_DEFAULT) // 透明度0.8秒
                    .select("rect") // 选择矩形
                    .style("fill", function(d) {
                        return getNodeColor(d, 'high') // return 返回 getNodeColor(d,t) 封装的节点颜色函数， d节点设置high
                    })
                    // .style("stroke", function (d) {
                    //     return d3.rgb(d.color).darker(0.1);
                    // })
                    .style("fill-opacity", OPACITY.NODE_HIGHLIGHT); // 透明度1
                // 如果节点的数组下的属性rightLinks的值是 d.target.state === collapsed 下的 d.state !== HIGH .length >0 ,阻止默认行为。
                if (bd.rightLinks.filter(function(d) { return d.target.state === "collapsed"; }).filter(function(d) { return d.state !== "HIGH"; }).length > 0) {
                    return false
                }
                // 声明一个变量， 把linkEnter下的符合条件的 当前节点结束位置target = bd赋值给他
                var _find = linkEnter.filter(function(dd) { return dd.target === bd; });

                _find
                    // .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
                    .transition()
                    .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                    .style("stroke", function(d) {
                        d.state = 'HIGH';
                        return getNodeColor(d.source, 'high') // return 返回 getNodeColor(d,t) 封装的节点颜色函数， d.source开始位置设置high
                    })
                    .style("opacity", OPACITY.LINK_HIGHLIGHT); // 透明度1

                _find.each(function(ddd) { // 把_find所代表的节点用each遍历一下，挨个输出 
                    findSourceBlood(ddd.source); // 抵用 findSourceBlood(bd) 这个函数，参数是 当前对象的开始源位置source.
                })
            }

            // (封装)一个findTargetBlood的函数， bd参数代表当前选中的对象。 //找到目标节点
            function findTargeBlood(bd) {
                bihisvg.select("g.node[data-id='" + bd.id + "']") //选择bihisvg下g.node的属性data-id="g.id"的属性
                    .transition()
                    .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                    .style("opacity", OPACITY.NODE_DEFAULT) // 透明度0.8
                    .select("rect") // 选择矩形
                    .style("fill", function(d) {
                        return getNodeColor(d, 'high') // 填充颜色 return 返回 getNodeColor(d,t) 封装的节点颜色函数， d.source开始位置设置high
                    })
                    // .style("stroke", function (d) {
                    //     return d3.rgb(d.color).darker(0.1);
                    // })
                    .style("fill-opacity", OPACITY.NODE_HIGHLIGHT); // 矩形的透明度1
                // 如果节点的数组下的属性leftLinks的值是 d.source.state === collapsed 下的 d.state !== HIGH .length >0 ,阻止默认行为。
                if (bd.leftLinks.filter(function(d) { return d.source.state === "collapsed"; }).filter(function(d) { return d.state !== "HIGH"; }).length > 0) {
                    return false
                }
                // 声明一个变量， 把linkEnter下的符合条件的 当前节点开始位置source = bd赋值给他
                var _find = linkEnter.filter(function(dd) { return dd.source === bd; });

                _find
                    // .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
                    .transition()
                    .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                    .style("stroke", function(d) {
                        d.state = 'HIGH';
                        return getNodeColor(d.source, 'high') // 边线颜色 return返回getNodeColor(d,t) 封装的节点颜色函数,d.source开始位置设置high
                    })
                    .style("opacity", OPACITY.LINK_HIGHLIGHT); // 连线的透明度 1，高亮
                // 给当前选中的元素循环遍历，输入调用一个函数，
                _find.each(function(ddd) {
                    findTargeBlood(ddd.target);
                })
            }

            findSourceBlood(g); //调用开始位置函数
            findTargeBlood(g); //调用结束位置函数
            // 判断，当条件是fixesPos的时候，fixesPos默认为false
            if (fixesPos) {
                var pos = findGnode.attr('transform').replace('translate(', '').replace(')', '').split(',');
                var k = bihisvg.select('g').attr('transform').split('scale')[1].replace('(', '').replace(')', '');
                var svgW = bihisvg.attr('width') / 2,
                    svgh = bihisvg.attr('height') / 2;
                var nodeW = findGnode.node().getBBox().width * k / 2,
                    nodeH = findGnode.node().getBBox().height * k / 2;
                var t = d3.zoomIdentity.translate(svgW - pos[0] * k - nodeW, svgh - pos[1] * k - nodeH).scale(k);
                var svgId = $(bihisvg.node()).parents('.chart-container').attr('id');
                sankeyConf['#' + svgId].redrawOver = false;
                bihisvg.transition()
                    .duration(500)
                    .call(zoom.transform, t) // 强制指向 zoom. 缩放的和旋转的大小t.
                    .on('end', function() { // 在结束的时候，执行 sankeyConf
                        sankeyConf['#' + svgId].redrawOver = true;
                    });
            }
        }
        // (封装函数) 淡出非连接的连线
        function fadeUnconnected(g) {
            linkEnter.filter(function(d) { return d.source !== g && d.target !== g; }) // 筛选符合条件的连接
                // .style("marker-end", function () { return 'url(#arrowHead)'; })
                .transition()
                .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                .style("opacity", OPACITY.LINK_FADED); // 透明度0.1
            // 筛选符合条件的节点
            nodeEnter.filter(function(d) {
                    return (d.id === g.id) ? false : !biHiSankey.connected(d, g);
                })
                .transition()
                .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                .style("opacity", OPACITY.NODE_FADED); // 透明度0.11毫秒
        }

        // 封装的 节点颜色，d参数表示选中的元素，t是设置的high
        function getNodeColor(d, t) {
            
            var _color; // 声明以个_color变量
            var sourceNode = d; // 把d参数所代表的选中元素，赋值给sourceNode.
            if (d.direction) { // 如果条件是 当前选中元素的 方向
                d.state = 'NORMAL' // 执行d.state状态 是NORMAL正常
                sourceNode = d.source // sourceNode = 当前元素的开始。
            }
            // 如果 条件是 zoom的缩放大小的话，或者是缩放 high高亮的话
            if (t && t == 'high') {
                _color = highlightColorScale(sourceNode.type.replace(/ .*/, "")); //执行把 highlightColorScale变量所代表的颜色赋值给 _color
            } else {
                _color = colorScale(sourceNode.type.replace(/ .*/, "")); // 如果不是条件的元素,执行 colorScale这个变量 所代表的颜色
            }
            if (sourceNode._parent && sourceNode._parent.childMaxY) {
                if (sourceNode.slevel == 1) {
                    _color = d3.rgb(_color).brighter(0.5 * ((sourceNode.py + 1) / sourceNode._parent.childMaxY));
                } else if (sourceNode.slevel > 1) {
                    _color = sourceNode._parent.color
                }
            }
            if (!d.direction) {

                sourceNode.color = _color;
            }
            return _color
        }
        // (封装) 节点移动E 函数, g表示当前选中的节点
        function nodeMouseE(g) {
            if (!isTransitioning) { // isTransitioning变量默认的是true
                tooltip // 提示框
                    .style("left", d3.mouse($(d3.event.target).parents('.chart-container')[0])[0] + 10 + "px") //距离左边的位置
                    .style("top", d3.mouse($(d3.event.target).parents('.chart-container')[0])[1] + 15 + "px") // 距离顶部的位置
                    .attr('data-node',g.id)
                    .transition()
                    .duration(TRANSITION_DURATION) // 过渡时间100毫秒
                    .style("opacity", 1) // 透明度为1
                    .select(".value") // 选择tooltip提示框下的 .value的选择器，.value是span标签的选择器
                    .text(function() {
                        // var additionalInstructions = g.slevel < mapL ? (g.children.length ? ((g.state === 'expanded') ? "(双击返回)" : "(双击展开)") : "") : ""; // 点击字体，双击展开节点，点击节点双击隐藏
                        return g.cn;
                    });
            }
        }
        // (封装) 线移动E 函数, g表示当前选中的线
        function lineMouseE(g) {
            if (!isTransitioning) { // 如果条件是isTransitioning变量的话， isTransitioning默认是布尔值 true
                showTooltip().select(".value").text(function() { // 提示框中的文本内容。
                    if (g.direction > 0) {
                        return g.source.cn + " → " + g.target.cn + "(" + g.thickness + ")";
                    }
                    return dg.target.cn + " ← " + g.source.cn + "(" + g.thickness + ")";
                });
            }
        }
        // (封装) 节点移动M 函数
        function nodeMouseM() {
            if (!isTransitioning) {
                tooltip
                    .style("left", d3.mouse($(d3.event.target).parents('.chart-container')[0])[0] + 10 + "px")
                    .style("top", d3.mouse($(d3.event.target).parents('.chart-container')[0])[1] + 15 + "px")
            } //如果条件是isTransitioning变量的话， isTransitioning默认是布尔值 true, 执行tooltip的left,top位置
        }
        //(封装) 节点移动L 函数 ，已经节点的位置
        function nodeMouseL() {
            if (!isTransitioning) {
                hideTooltip(); // 隐藏提示框，
            }
        }

        node = bihiG.select("#nodes").selectAll(".node") // 把svg下的g下的id为nodes下的class为node的选择器，赋值给node,
            .data(biHiSankey.collapsedNodes(), function(d) { return d.id; }); // 绑定 桑基图下的 collapsedNodes, return 返回 数据下的id.

        node.exit() // node 下的 exit(没有绑定数据的元素) ，exit也跟remove一样 
            // .transition()
            // .duration(TRANSITION_DURATION)
            .attr("transform", function(d) { // 获取的平移的位置
                var collapsedAncestor, endX, endY;
                collapsedAncestor = d.ancestors.filter(function(a) {
                    return a.state === "collapsed";
                })[0];
                endX = collapsedAncestor ? collapsedAncestor.x : d.x;
                endY = collapsedAncestor ? collapsedAncestor.y : d.y;
                return "translate(" + endX + "," + endY + ")";
            })
            .remove(); // 移除

        nodeEnter = node.enter().append("g") // 把 node.enter下添加的g赋值给nodeEnter,
            .attr("class", "node single-node") // 给g添加一个class 为 node single -node 的选择器
            .attr('data-id', function(d) { return d.id ? d.id : 'root' }); // 获取的data-id, 如果是 d.id 返回 d.id 否则 'root'(根)

        nodeEnter
            .attr("transform", function(d) {
                var startX = d._parent ? d._parent.x : (d.parent ? d.parent.x : d.x),
                    startY = d._parent ? d._parent.y : (d.parent ? d.parent.y : d.y);
                return "translate(" + startX + "," + startY + ")"; // 平移的位置
            })
            .style("opacity", 1e-6) // 透明度
            // .transition()
            // .duration(TRANSITION_DURATION)
            .style("opacity", OPACITY.NODE_DEFAULT) // 透明度
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); // 平移的位置

        nodeEnter.append("rect") // 在nodeEnter下添加矩形
            // .style("fill", 'yellow') // 边线颜色 调用 getNodeColor函数，
            .style("fill", getNodeColor) // 边线颜色 调用 getNodeColor函数，
            // .style("stroke", function (d) {
            //     return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
            // })
            // .style("stroke-width", "2px")
            .attr("height", function(d) { return d.height; })
            .attr("width", function(d) { return d.width; })
            .attr("rx", function(d) {
                // return  20
                return d3.min([d.width, d.height]) / 20 // 给矩形设置圆角
            })
            .attr("ry", function(d) {
                // return  20
                return d3.min([d.width, d.height]) / 20
            })
            .filter(function(d) { return d.slevel == 1; }); // 筛选符合条件的

        // add in the text for the nodes
        nodeEnter.append("text"); // 添加text文本
        nodeEnter.filter(function(d) { return d.height !== 0; }) // 筛选符合条件的nodeEnter
            .select("text") // 获取符合条件的text 文本
            .attr("x", function(d) { return d.width / 2; }) // 给文本的位置 设置值
            .attr("y", function(d) {
                return (d.height / 2);
            })
            .attr("font-size", function(d) { // 字体的大小，
                var k = getTransform(this).k;
                // var k = oldTransfrom?oldTransfrom.k:1;

                return TEXT_BIG_SIZE[d.slevel] / k
            })
            .attr('fill', function(d) { return TEXT_NORMAL_COLOR }) // 边线颜色
            .attr("dy", ".35em") // text文本的相对于兄弟元素的 水平位置
            .attr("text-anchor", "middle") // 对齐方式
            .attr("transform", null) // 没有设置值
            // .style("opacity", function () {
            //     var transform =  d3.zoomTransform(this);
            // })
            .text(function(d) { return d.cn; }); // text文本内容

        nodeEnter = nodeEnter.merge(node); // 把node 和 nodeEnter 合并
        // 声明一个变量，变量命为,扩展的节点。
        expandedNodes = bihiG.select("#expandNodes").selectAll(".node") // 把svg下的g下的id为expandNodes下的class为node的选择器选中
            .data(biHiSankey.expandedNodes(), function(d) { return d.id; }) // 绑定一组数据，数据是桑基图下的expandeNodes(),回调函数返回数据ID

        expandedNodes.exit().remove(); // 移除空的未绑定的exit多余的
        // 扩展的节点进入 变量， 把expandedNodes下添加的g赋值给他
        expandedNodesEnter = expandedNodes.enter().append("g")
            .attr("class", "node expanded-node") //给g获取 class为 node expanded-node的选择器
            .attr('data-id', function(d) { return d.id ? d.id : 'root' }); // 获取id，回调函数返回，如果是 d.id 返回 d.id,否则返回 'root'(根)

        expandedNodesEnter // 给expandedNodesEnter获取 平移到的位置
            .attr("transform", function(d) {
                var startX = d._parent ? d._parent.x : (d.parent ? d.parent.x : d.x),
                    startY = d._parent ? d._parent.y : (d.parent ? d.parent.y : d.y);
                return "translate(" + startX + "," + startY + ")";
            })
            .transition()
            .duration(TRANSITION_DURATION) // 过渡时间100毫秒
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); // 在此获取一个平移的位置

        expandedNodesEnter.append("rect") // 给变量 expandedNodesEnter所代表的g，添加矩形。
            .style("opacity", OPACITY.NODE_FADED) //透明度0.8
            .style("fill", getNodeColor) //矩形填充颜色，调用getNodeColor函数
            .style("stroke", function(d) {
                return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
            }) // 矩形边线颜色，
            .style("stroke-width", "1px") // 边线宽度
            .attr("height", function(d) { return d.height; }) // 矩形高度
            .attr("width", function(d) { return d.width; }) // 矩形宽度
            .attr("rx", function(d) { // 矩形的X轴圆角
                // return 20
                return d3.min([d.width, d.height]) / 20
            })
            .attr("ry", function(d) { //矩形的y轴圆角
                // return 20
                return d3.min([d.width, d.height]) / 20 // 返回最小值是d.width,d.height各/20
            })
            .filter(function(d) { return d.slevel == 1; }); // 筛选符合条件的，回调 返回 d.slevel == 1
        // 给 变量expandedNodesEnter 所代表的g，添加text文本
        expandedNodesEnter.append("text");
        expandedNodesEnter
            // .filter(function (d) { return d.value !== 0; })
            .select("text")
            // .attr("text-anchor", "right ") // 对齐方式
            .attr("text-anchor", "middle")
            .attr("x", function(d) { return (d.width / 2) }) // X轴位置
            .attr("y", -3) // y轴位置
            .attr('fill', function(d) { return d.color }) //填充色
            .attr("font-size", function(d) { // 文本字体大小
                var k = getTransform(this).k;
                return TEXT_BIG_SIZE[d.slevel] / k
            })
            // .style("opacity", OPACITY.NODE_DEFAULT)
            // .style("opacity", function(d) { // 透明度。
            //     if (getTransform(this).k < 0.15 && d.slevel != 0) { return 0 } else { return OPACITY.NODE_DEFAULT }
            // })
            .text(function(d) { return d.cn; }); // 文本的内容，return d.cn
        // 
        expandedNodesEnter = expandedNodesEnter.merge(expandedNodes); // 把expandedNodesEnter下的g和expandedNodesEnte下的g合并成一个 

        nodeEnter.on("mouseenter", function(g) { nodeMouseE(g) }); // 绑定鼠标移入，移动，移出，双击，按下事件
        nodeEnter.on("mousemove", function() { nodeMouseM() });
        nodeEnter.on("mouseleave", function() { nodeMouseL() });
        nodeEnter
            // .on("dblclick", showHideChildren)
            .on("mousedown", showNodeInfo);

        expandedNodesEnter.on("mouseenter", function(g) { nodeMouseE(g) }); // 绑定鼠标移入，移动，移出，双击，按下事件
        expandedNodesEnter.on("mousemove", function() { nodeMouseM() });
        expandedNodesEnter.on("mouseleave", function() { nodeMouseL() });
        expandedNodesEnter
            // .on("dblclick", showHideChildren)
            .on("mousedown", showNodeInfo);

        link = bihiG.select("#links").selectAll("path.link") // 把bihiG下的 id为links的选择器 下的所有 path.link选中
            .data(biHiSankey.visibleLinks(), function(d) { return d.id; }); // 给所有的path.link 绑定数据 sankey.visibleLinks(),回调返回 d.di

        link
            .style("stroke-width", function(d) {
                return Math.max(THICKNESS_MIN, d.thickness);
            }) // 边线宽度,
            .attr("d", path); // 绘制路径的方式，sankey的线型

        link.exit().remove(); // 移出多余未绑定的数据的部分

        linkEnter = link.enter().append("path") // 给 path.link 下添加path
            .attr("class", "link") // 给path 添加 class为link的 选择器
            .style("fill", "none"); // 取消填充色

        linkEnter.sort(function(a, b) { return b.thickness - a.thickness; }) // 给linkEnter 所代表的path进行拍讯
            .classed("leftToRight", function(d) {
                return d.direction > 0; // 当 d.direction>0 的时候 开启 class 为 leftToRight的选择器
            })
            .classed("rightToLeft", function(d) {
                return d.direction < 0; // 当 d.direction<0 的时候 开启 class 为 rightToLeft的选择器
            })
            // .style("marker-end", function(d) { // 给linkEnter所代表的 path 添加 箭头标记 ,回调判断 返回箭头的位置
            //     var elemId = ($(this).parents('.chart-container')).attr('id');
            //     return (d.direction > 0) ? ('url(#' + elemId + 'arrowHead' + d.source.type + ')') : ('url(#' + elemId + 'arrowHead' + d.target.type + ')');
            // })
            .style("stroke", function(d) { // path路径连接线的边线颜色
                if (d.direction > 0) { return colorScale(d.source.type.replace(/ .*/, "")); } else { return colorScale(d.target.type.replace(/ .*/, "")); }
            })
            .style("stroke-width", function(d) { // path 的边线宽度，回调函数，返回 最大值(最小厚度2,最大d.thickness)
                return Math.max(THICKNESS_MIN, 10);
            })
            .style("opacity", OPACITY.LINK_FADED) // 透明度0.1
            .transition()
            .delay(TRANSITION_DURATION) // 延迟过渡时间100毫秒
            .duration(TRANSITION_DURATION) // 过渡时间100毫秒
            .attr("d", path)
            .style("opacity", OPACITY.LINK_DEFAULT); // 透明度0.8

        linkEnter = linkEnter.merge(link); // 把 linkEnter 绑定事件
        linkEnter.on('mouseenter', function(d) { lineMouseE(d) }); // 绑定 鼠标 移入，移出，移动事件
        linkEnter.on('mousemove', function() { nodeMouseM() });
        linkEnter.on('mouseleave', function() { nodeMouseL() });

    }
    // 设置变换,el参数代表当前的元素
    function setTransform(el) {
        
        var nodeId = $(el).parents('.chart-container').attr('id'); //把el参数代表的元素的父节点(.chart-container)获取的id赋值给 nodeId变量
        var trans = d3.zoomTransform(el); // 把d3.zoomTransform(el)代表的节点的当前的变换，赋值给trans.
        if (sankeyConf['#' + nodeId]) sankeyConf['#' + nodeId].oldTransfrom = trans; // 如果条件是 (sankeyConf['#'+nodeId]),执行 sankeyConf['#'+nodeId].oldTransfrom(记录当前位置) = trans， el代表的当前的节点的变换
        return trans //返回 trans
    }
    // 获取变换，el参数代表 #chart的div容器
    function getTransform(el) {
        var nodeId = $(el).parents('.chart-container').attr('id'); //把el参数代表的元素的父节点(.chart-container)获取的id赋值给 nodeId变量
        return sankeyConf['#' + nodeId].oldTransfrom // 函数调用时，返回这个参数
    }
    //自定义起始动画，k=0.05, x=2260, y= -1400, t=1000, el = #chart
    function setTranstion(k, x, y, t, el) {
        bihisvg.transition() // bihisvg(图表容器) 过度
            .duration(t) // 过渡时间 t(1000毫秒)
            .call(zoom.transform, d3.zoomIdentity.scale(k).translate(x, y)) // 调用setTranstion函数的时候，把zoom.transform强制指向bihisvg图表容器
            .on('end', function() {
                bihisvg.call(zoom).on("dblclick.zoom", null);
                _conf.redrawOver = true;
            }) // 绑定end事件，在缩放结束的时候，执行 bihisvg容器图表 的缩放 禁止双击放大 
    }

    //移动缩放重绘
    function redraw() {

        hideTooltip(true); // 调用hideTooltip() 隐藏提示框 函数
        var nodeId = $(this).parents('.chart-container').attr('id'); // 把当前对象的 父节点 .chart-container 获取的id 赋值给 nodeId
        if (!nodeId) return false; // 如果不是nodeId,阻止事件默认行为，
        var oldTrans = _conf.oldTransfrom; // 把 记录当前位置 缩放 赋值给 oldTrans
        var transTmp = d3.zoomTransform(this); // 把 当前对象的缩放 赋值给 transTmp
        // console.log('transTmp:' + transTmp.k +';'+transTmp.x +';'+transTmp.y +';\noldTrans:' + oldTrans.k +';'+oldTrans.x +';'+oldTrans.y );
        var trans = setTransform(this); // 把当前元素设置的变换赋值给 trans变量
        bihiG.attr("transform", trans); // bihiG svg下的g刻度，获取的变换，trans 这个变量
        var textFlag = false; //是否需要重置字体
        if (mapLevelEnter && (_conf.mapLevelRange.length > 0)) { textFlag = true; } // 如果条件是。。。。 执行重置字体。
        if (transTmp.k != oldTrans.k) { // 如果条件是。。。。 执行重置字体。
            textFlag = true;
        }
        // 如果条件是 不执行重置文本内容 选中bihiG下的 text文本,给 text 文本 获取 font-size, 回调函数 return 返回TEXT_BIG_SIZE[d.slevel]/trans.k
        // console.log(trans.k)
        if (textFlag) {
            // bihiG.selectAll('text')
            //     .attr('font-size', function(d) {
            //         return TEXT_BIG_SIZE[d.slevel] / trans.k;
            //         // return 12
            //     });
            // 选择bihiG 下的 g.sinle-node 这个分组 下的文本,给他获取 y坐标, 回调函数, return 返回 选中的当前元素的上一个节点 获取的 height/2
            bihiG.selectAll('g.single-node')
                .selectAll('text')
                .attr('y', function() {
                    return (d3.select(this.previousSibling).attr('height') / 2)
                });
            // 把选中的 bihiG下的 筛选符合条件的 g.expanded-node ,回调 return d.slevel>=1 赋值给 expandNodeArray
            var expandNodeArray = bihiG.selectAll('g.expanded-node').filter(function(d) { return d.slevel < 1 });
            var expandNodeArray1 = bihiG.selectAll('g.expanded-node').filter(function(d) { return d.slevel = 1 });
            // 把选中的 bihiG下的 筛选符合条件的 g.single-node ,回调 return d.slevel>=1 赋值给 expandNodeArray
            var singleNodeArray = bihiG.selectAll('g.single-node').filter(function(d) { return d.slevel >= 1 });
            var singleNodeArray1 = bihiG.selectAll('g.single-node').filter(function(d) { return d.slevel < 1 });
            var singleNodeArray2 = bihiG.selectAll('g.single-node').filter(function(d) { return d.slevel = 2 });

            expandNodeArray.selectAll('text')
                // .transition()
                // .duration(TRANSITION_DURATION * 5)
                .style("opacity", 1)
                .attr('y', -300)
                .attr('font-size', function(d) {
                    return TEXT_BIG_SIZE[d.slevel] / trans.k;
                    // return 12
                })

            // 如果条件是 当前元素的变换,缩放的值k(缩放因子)<0.15的话,g.expanded-node 下的文本 执行过渡,过渡时间500,透明度0
            if (trans.k < 0.06) {

                expandNodeArray.selectAll('text')
                    // .transition()
                    // .duration(TRANSITION_DURATION * 5)
                    .style("opacity", 1)
                    .attr('y', -300)
                    .attr('font-size', function(d) {
                        return TEXT_BIG_SIZE[d.slevel] / trans.k;
                        // return 12
                    })

                expandNodeArray1.selectAll('text')
                    .attr('font-size', function(d) {
                        return TEXT_BIG_SIZE[d.slevel] / trans.k;
                    })
                    .style("opacity", 1)

                singleNodeArray.selectAll('text')
                    .attr('font-size', function(d) {
                        return TEXT_BIG_SIZE[d.slevel] / trans.k;
                    })

                singleNodeArray1.selectAll('text')
                    .attr('font-size', function(d) {
                        return TEXT_BIG_SIZE[d.slevel] / trans.k;
                    })

                singleNodeArray2.selectAll('text')
                    .attr('font-size', function(d) {
                        return TEXT_BIG_SIZE[d.slevel] / trans.k;
                    })
            }

            // 全部的g.sinle-node 下的text文本 ,设置过渡，过渡时间500毫秒，透明度，如果条件是当前元素
            singleNodeArray.selectAll('text')
                .transition()
                .duration(TRANSITION_DURATION * 5)
                .style("opacity", 1)
 
            if (trans.k > 0.02 && trans.k < 0.03) {
                mainInit(0,'../mms_data/xin.json',1,0);
            } else if (trans.k > 0.03 && trans.k < 0.05 ) {
                mainInit(0,'../mms_data/xin.json',1,1);
            } else if (trans.k > 0.05 && trans.k < 0.07) {
                mainInit(0,'../mms_data/xin.json',1,2); 
            } else if (trans.k > 0.07 && trans.k < 0.095) {
                mainInit(0,'../mms_data/yuan40.json',1,2); 
            } else if (trans.k > 0.1 ) {
                mainInit(0,'../mms_data/yuan.json',1,4);
            }

        }
        
        findScaleNode('.bihi-svg');
        
    }
    // 桑基图 下的 节点绑定的后台数据， 连线绑定的后台数据 
    biHiSankey
        .nodes(data.nodes)
        .links(data.links)
        .initializeNodes(function(node) {
            // // 初始化节点
            if (flag == 'expanded') {
                node.state = node.slevel > mapL ? (node.parent ? "contained" : "collapsed") : (node.children.length > 0 ? "expanded" : "collapsed");
                if (node.slevel == mapL && node.children.length > 0) {
                    node.state = "collapsed"
                }
            } else {
                node.state = node.parent ? "contained" : "collapsed";
            }
        })
        .layout(LAYOUT_INTERATIONS); // 布局，布局的相互作用 32

    disableUserInterractions(2 * TRANSITION_DURATION); // 调用禁止用户中断操作 (函数)，时间2 * 100 毫秒

    update(); // 调用图形更新 (函数)

    //计算缩放区域 ，获取 bihisvg 下g 的 宽高，
    var kx = (WIDTH * 0.8) / Math.round(bihisvg.select('g').node().getBoundingClientRect().width),
        ky = (HEIGHT * 0.8) / Math.round(bihisvg.select('g').node().getBoundingClientRect().height),
        k1 = d3.min([ZOOM_MIN, d3.min([kx, ky])]); //把 最小值是【zoom的最小值,d3.min[宽度，高度]】

    k1 = 0.05; //把0.05赋值给k1

    _conf.ZOOM_MIN = k1; // 把k1赋值给 _fonf.ZOOM_MIN
    zoom.scaleExtent([0.02, ZOOM_MAX]); // zoom 的缩放范围是 [k1,ZOOM_MAX]


    //***** 图形初始化的位置
    if (_conf.reDrawConunt == 0) {
        var x1 = 2060,
            y1 = 1500;
        setTranstion(k1, x1, y1, 0, node); // 调用 setTransition()函数， 获取变换的 宽度，高度，时间，节点，缩放值
    } else {
        bihisvg.call(zoom.transform, oldTransfrom);
        bihisvg.call(zoom).on("dblclick.zoom", null);
        _conf.redrawOver = true;
    }
    _conf.reDrawConunt++;

    $(window).resize(function() {
        if (!getNodeWH(node)) return false;
        var d = $(bihisvg.node()).parents('.chart-container').css('display');
        if (d && d != 'none') {
            bihisvg
                .attr("width", (getNodeWH(node).w))
                .attr("height", (getNodeWH(node).h))
        }
    })
}
