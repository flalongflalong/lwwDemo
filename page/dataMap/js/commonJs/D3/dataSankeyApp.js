'use strict';

var OPACITY = {
        NODE_DEFAULT: 0.8,
        NODE_FADED: 0.2,
        NODE_HIGHLIGHT: 1,
        LINK_DEFAULT: 0.6,
        LINK_FADED: 0.1,
        LINK_HIGHLIGHT: 0.8
    },
    TYPES = ["Structure", "Unstructured", "Integrated", "BigData", "AppData"],
    TYPE_COLORS = ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
    TYPE_HIGHLIGHT_COLORS = ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
    LINK_COLOR = "#b3b3b3",
    INFLOW_COLOR = "#8bc9fc",
    OUTFLOW_COLOR = "#f1b7b7",
    TEXT_NORMAL_COLOR = "#2e2e2e",
    OUTER_MARGIN = 0,
    SEL_NODE_STROKE = "f93a43",
    ZOOM_MIN = 0.5,
    ZOOM_MAX = 15,
    TEXT_NORMAL_SIZE = 10,
    TEXT_BIG_SIZE = [20,15,10,10],
    TRANSITION_DURATION = 100,
    COLLAPSER = {
        RADIUS: 8,
        SPACING: 2
    },
    MARGIN = {
        TOP: 2 * (COLLAPSER.RADIUS + OUTER_MARGIN),
        RIGHT: OUTER_MARGIN,
        BOTTOM: OUTER_MARGIN,
        LEFT: OUTER_MARGIN
    },
    LAYOUT_INTERATIONS = 32,
    REFRESH_INTERVAL = 7000,
    SERRCH_WORD = "",
    showTrack = false,
    mapLevelArray = [{"id":"title","name":"地图层级"},{"id":"0","name":"&emsp;数据区"},{"id":"1","name":"&emsp;&emsp;系统"},{"id":"2","name":"&emsp;&emsp;&emsp;表"},{"id":"3","name":"&emsp;&emsp;字段"}];

/**
 *
 * @node 数据地图所加载的div id 或 class
 * @data 数据地图数据
 * @flag 数据地图是否展开
 * @mapLevel 数据地图层级
 */
function addBihiSankey(node,data,flag,mapLevel) {

    var parentNode = d3.select(node);
    parentNode.selectAll('div.chart-left').remove();
    parentNode.selectAll('div.chart-body').remove();
    parentNode.selectAll('div#tooltip').remove();
    parentNode.selectAll('div#mapLevel').remove();

    var listBody = parentNode.append("div").attr("class", "chart-left"),
        svgBody = parentNode.append("div").attr("class", "chart-body"),
        bihisvg,bihiG, tooltip, biHiSankey, path, defs, colorScale, highlightColorScale, isTransitioning;

    var isMain = function () {
        if (node === '#chart') {return true} return false
    }

    listBody.append("div").html('<div class="items-list-content">' +
        '<div class="items-list-title">数据目录</div>'+
        '<div class="search-site clearfix" class = "inputSearchC">'+
        '<input class="search-name" type="text">'+
        '<label></label>'+
        '</div>'+
        '</div>'+
        '<div class="nodeListContainer">'+
        '<div class="items-lists">'+
        '<div class="item">'+
        '<ul class="itemCotent">'+
        '<li>'+
        '<span class="item-ico item-ico-hudColor"></span>'+
        '<span class="item-text">单线流向</span>'+
        '</li>'+
        '<li>'+
        '<span class="item-ico item-ico-hud"></span>'+
        '<span class="item-text">对对对流向</span>'+
        '</li>'+
        '</ul>'+
        '</div>'+
        '</div>'+
        '</div>');

    $(node).find('.nodeListContainer')
        .css('height',listBody.node().getBoundingClientRect().height - listBody.select('.items-list-content').node().getBoundingClientRect().height - 10);

    function getNodeWH(nodeName) {
        var n = d3.select(nodeName);
        if (n.node() == null || $(n.node()).css('display') == 'none') return false;
        return {
            'w':Math.round(n.style('width').split('px')[0]),
            'h':Math.round(n.style('height').split('px')[0])
        }
    };

    var leftWidth = $(node +' .chart-left').width(),
        WIDTH =  getNodeWH(node).w - MARGIN.LEFT - MARGIN.RIGHT - leftWidth,
        HEIGHT = getNodeWH(node).h - MARGIN.TOP - MARGIN.BOTTOM;

    var formatNumber = function (d) {
            var numberFormat = d3.format(",.0f"); // zero decimal places
            return "£" + numberFormat(d);
        },
        formatFlow = function (d) {
            var flowFormat = d3.format(",.0f"); // zero decimal places with sign
            return "£" + flowFormat(Math.abs(d)) + (d < 0 ? " CR" : " DR");
        };

    // Used when temporarily disabling user interractions to allow animations to complete
    var  disableUserInterractions = function (time) {
            isTransitioning = true;
            setTimeout(function(){
                isTransitioning = false;
            }, time);
        },

        hideTooltip = function () {
            return tooltip.transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", 0);
        },

        showTooltip = function () {
            return tooltip
                .style("left", d3.mouse($(d3.event.target).parents('.chart-container')[0])[0] + 10 + "px")
                .style("top", d3.mouse($(d3.event.target).parents('.chart-container')[0])[1] + 15 + "px")
                // .style("left", 10 + "px")
                // .style("top", 10 + "px")
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", 1);
        };

    function  getTransform(node) {
        return  d3.zoomTransform(node)
    }
    var zoom = d3.zoom()
        .scaleExtent([ZOOM_MIN, ZOOM_MAX])
        // .filter(function filter() {
        //     return !event.rect;
        // })
        .on('zoom', redraw);

    colorScale = d3.scaleOrdinal().domain(TYPES).range(TYPE_COLORS);
    highlightColorScale = d3.scaleOrdinal().domain(TYPES).range(TYPE_HIGHLIGHT_COLORS);

    bihisvg = svgBody.append("svg")
        .attr('class','bihi-svg')
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

    bihiG = bihisvg.append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");
    bihiG.append("g").attr("id", "expandNodes");
    var bihiGlink = bihiG.append("g").attr("id", "links");
    bihiG.append("g").attr("id", "nodes");
    tooltip = parentNode.append("div").attr("id", "tooltip");
    tooltip.style("opacity", 0)
        .append("p")
        .attr("class", "value");

    if (isMain()) {
        // mapLevel svg
        var mapLevelElem = parentNode.append("div").attr("id", "mapLevel")
            .attr('class','mapLevel');
        var mapLevelSvg = mapLevelElem.append('svg')
            .attr("width",  100)
            .attr("height",  160);
        mapLevelSvg.append('rect')
            .style("opacity", 0.3)
            .style("fill", "gray")
            .attr("height",  130)
            .attr("width", 8)
            .attr("x",75)
            .attr("y",35);

        var mapLevelArrow = mapLevelSvg.append("polygon")
            .attr('fill','snow')
            .attr('stroke','gray')
            .attr('stroke-miterlimit','10')
            .attr('stroke-width','1')
            .attr('points','12,15 35,15 35,30 12,30 1,22.5')
            .attr('transform','translate(56,'+(25 + (mapLevel?mapLevel*34:0))+')');

        var mapLevelButC = mapLevelElem.append('div')
            .attr('class','map-Level-btn-c');
        var mapLevelNodes = mapLevelButC.selectAll(".level-item")
            .data(mapLevelArray, function (d) { return d.id; });
        mapLevelNodes.exit().remove();
        var mapLevelEnter = mapLevelNodes.enter().append("div")
            .attr("class", function (d) {return "level-item level-item-"+d.id+""} )
            .attr('data-levelId', function (d) { return d.id });
        mapLevelEnter.append("span")
            .html(function (d) {
                return d.name ;
            });
        mapLevelEnter.on('click',function (d) {
            console.log('mapLevelEnter' + d);
            mapLevelArrow
                .transition()
                .duration(TRANSITION_DURATION)
                .attr('transform','translate(56,'+(25+d.id*34)+')');

            setTimeout(function(){

                d3.json("js/D3Data/allData"+d.id+".json", function(error, data) {
                    addBihiSankey('#chart',data,'expanded',d.id)
                })
                return

                if (useLocalStorageData && getRetData('overView'+d.id)) {
                    var retdata = eval('(' + getRetData('overView'+d.id) + ')');
                    addBihiSankey('#chart',retdata,'expanded',d.id);
                    return true;
                }
                $.ajax({
                    url : "overView/"+d.id,
                    success : function(data) {
                        saveRetData('overView'+d.id,data);
                        var retdata = eval('(' + data + ')');
                        // addBihiSankey('#chart',retdata,'collapsed',d.id)
                        addBihiSankey('#chart',retdata,'expanded',d.id)
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                    }
                });
            },TRANSITION_DURATION);
        })
    }

    biHiSankey = d3.biHiSankey();

// Set the biHiSankey diagram properties
    biHiSankey
    // .nodeWidth(NODE_WIDTH)
    // .setNodeHeight(NODE_HEIGHT)
        .nodeSpacing(10)
        .linkSpacing(4)
        .arrowheadScaleFactor(0.5) // Specifies that 0.5 of the link's stroke WIDTH should be allowed for the marker at the end of the link.
        .size([WIDTH, HEIGHT]);

    path = biHiSankey.link().curvature(0.35);

    defs = bihiG.append("defs");

    var arrowNodes = defs.selectAll(".arrowHead")
        .data(TYPES, String);
    arrowNodes.exit().remove();
    var arrowNodesEnter = arrowNodes.enter().append("marker")
        .attr("class","arrowHead")
        .attr("id", function (d) { return "arrowHead"+d })
        .style("fill", function (d) { return colorScale(d.replace(/ .*/, "")); })
        .attr("viewBox", "0 0 6 10")
        // .style("opacity","0.8")
        .attr("refX", "1")
        .attr("refY", "5")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "1")
        .attr("markerHeight", "1")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

    function update () {
        var link, linkEnter, node, nodeEnter,expandedNodes,expandedNodesEnter,leftElem, leftNodes, leftNodesEnter;

        function containChildren(node) {
            node.children.forEach(function (child) {
                child.state = "contained";
                child.parent = this;
                child._parent = null;
                containChildren(child);
            }, node);
        }

        function expand(node) {
            node.state = "expanded";
            node.children.forEach(function (child) {
                child.state = "collapsed";
                child._parent = this;
                child.parent = null;
                containChildren(child);
            }, node);
        }

        function collapse(node) {
            node.state = "collapsed";
            containChildren(node);
        }

        function restoreLinksAndNodes() {

            leftNodesEnter
                .classed('sel',false);

            linkEnter
                .style("stroke", getNodeColor)
                // .style("marker-end", function () { return 'url(#arrowHead)'; })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", OPACITY.LINK_DEFAULT);

            nodeEnter
                .selectAll("rect")
                .style("fill", getNodeColor);
            // .style("stroke", function (d) {
            //     return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
            // });

            nodeEnter.filter(function (n) { return n.state === "collapsed"; })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", OPACITY.NODE_DEFAULT);
        }

        function showNodeInfo(d) {
            if (d3.event.defaultPrevented) return; // zoomed
            console.log('click:' +d)
            restoreLinksAndNodes()
            if (d.state !== "expanded") {
                fadeUnconnected(d)
                highlightConnected(d)
            }
            // 右侧信息
            if (isMain()) { onGetNodeInfo(d) }

            // d3.event.stopPropagation()
        }

        function showHideChildren(node) {
            // d3.event.sourceEvent.stopPropagation()
            disableUserInterractions(2 * TRANSITION_DURATION);
            hideTooltip();
            if (!node.children || node.children.length == 0) return false;
            if (node.state === "collapsed") { expand(node); }
            else { collapse(node); }

            biHiSankey.relayout();
            update();
            linkEnter.attr("d", path);
            restoreLinksAndNodes();
        }

        function highlightConnected(g) {

            leftNodesEnter.filter(function (d) {return d === g;}).classed('sel',true);

            d3.select("g.node[data-id='"+g.id+"']")
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", OPACITY.NODE_DEFAULT)
                .select("rect")
                .style("fill", function (d) {
                    return getNodeColor(d,'high')
                })
                // .style("stroke", function (d) {
                //     return d3.rgb(d.color).darker(0.1);
                // })
                .style("fill-opacity", OPACITY.NODE_HIGHLIGHT);

            var highLinkArray =  linkEnter.filter(function (d) { return d.source === g; })
                // .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("stroke", function (d) {
                    d.state ='HIGH';
                    return getNodeColor(d.source,'high')
                })
                .style("opacity", OPACITY.LINK_HIGHLIGHT);

            highLinkArray.nodes().forEach(function (h,a) {
                // debugger;
                // <text font-size="20" x="0" y="0" fill="#00ff00">.
                // <animateMotion path="M120,80 q100,20 120,20 q10,-10 160,0" begin="0s" dur="3s" rotate="auto" repeatCount="indefinite"/>
                //     </text>
                var fSize = $(h).css('stroke-width').split('px')[0]
                bihiGlink.append("text")
                    .attr("class","link-tarck")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("dy", fSize*0.25)
                    .attr("font-size",fSize*5 )
                    .attr('fill', '#00ff00')
                    .text('.')
                    .append('animateMotion')
                    .attr('begin',0)
                    .attr('dur','5s')
                    .attr('rotate','auto')
                    .attr('repeatCount','indefinite')
                    .attr('path',$(h).attr('d'))
                ;
            })
        //     bihiGlink.select("text.link-tarck").remove();




            linkEnter.filter(function (d) { return d.target === g; })
                // .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("stroke", function (d) {
                    d.state ='HIGH';
                    return getNodeColor(d.source,'high')
                })
                .style("opacity", OPACITY.LINK_HIGHLIGHT);

            function findSourceBlood (bd) {

                d3.select("g.node[data-id='"+bd.id+"']")
                    .transition()
                    .duration(TRANSITION_DURATION)
                    .style("opacity", OPACITY.NODE_DEFAULT)
                    .select("rect")
                    .style("fill", function (d) {
                        return getNodeColor(d,'high')
                    })
                    // .style("stroke", function (d) {
                    //     return d3.rgb(d.color).darker(0.1);
                    // })
                    .style("fill-opacity", OPACITY.NODE_HIGHLIGHT);

                if (bd.rightLinks.filter(function (d) {return d.target.state === "collapsed";}).filter(function (d) {return d.state !== "HIGH";}).length > 0) {
                    return false
                }

                var _find = linkEnter.filter(function (dd) { return dd.target === bd; });

                _find
                    // .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
                    .transition()
                    .duration(TRANSITION_DURATION)
                    .style("stroke", function (d) {
                        d.state ='HIGH';
                        return getNodeColor(d.source,'high')
                    })
                    .style("opacity", OPACITY.LINK_HIGHLIGHT);

                _find.each(function(ddd) {
                    findSourceBlood (ddd.source);
                })
            }
            function findTargeBlood (bd) {
                d3.select("g.node[data-id='"+bd.id+"']")
                    .transition()
                    .duration(TRANSITION_DURATION)
                    .style("opacity", OPACITY.NODE_DEFAULT)
                    .select("rect")
                    .style("fill", function (d) {
                        return getNodeColor(d,'high')
                    })
                    // .style("stroke", function (d) {
                    //     return d3.rgb(d.color).darker(0.1);
                    // })
                    .style("fill-opacity", OPACITY.NODE_HIGHLIGHT);

                if (bd.leftLinks.filter(function (d) {return d.source.state === "collapsed";}).filter(function (d) {return d.state !== "HIGH";}).length > 0) {
                    return false
                }

                var _find = linkEnter.filter(function (dd) { return dd.source === bd; });

                _find
                    // .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
                    .transition()
                    .duration(TRANSITION_DURATION)
                    .style("stroke", function (d) {
                        d.state ='HIGH';
                        return getNodeColor(d.source,'high')
                    })
                    .style("opacity", OPACITY.LINK_HIGHLIGHT);

                _find.each(function(ddd) {
                    findTargeBlood (ddd.target);
                })
            }

            findSourceBlood (g);
            findTargeBlood (g);

        }

        function fadeUnconnected(g) {
            linkEnter.filter(function (d) { return d.source !== g && d.target !== g; })
                // .style("marker-end", function () { return 'url(#arrowHead)'; })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", OPACITY.LINK_FADED);

            nodeEnter.filter(function (d) {
                return (d.id === g.id) ? false : !biHiSankey.connected(d, g);
            })
                .transition()
                .duration(TRANSITION_DURATION)
                .style("opacity", OPACITY.NODE_FADED);
        }

        function getNodeColor(d,t) {
            var _color;
            var sourceNode = d;
            if (d.direction) {
                d.state = 'NORMAL'
                sourceNode = d.source
            }
            if (t && t == 'high') {
                _color = highlightColorScale(sourceNode.type.replace(/ .*/, ""));
            } else {
                _color = colorScale(sourceNode.type.replace(/ .*/, ""));
            }
            if (sourceNode._parent && sourceNode._parent.childMaxY) {
                if (sourceNode.slevel == 1) {
                    _color = d3.rgb(_color).brighter(0.5 * ((sourceNode.py + 1)/sourceNode._parent.childMaxY));
                } else if (sourceNode.slevel > 1) {
                    _color = sourceNode._parent.color
                }
            }
            if (!d.direction) {

                sourceNode.color = _color;
            }
            return _color
        }

        function nodeMouseE(g) {
            if (!isTransitioning) {
                tooltip
                    .style("left", d3.mouse($(d3.event.target).parents('.chart-container')[0])[0] + 10 + "px")
                    .style("top", d3.mouse($(d3.event.target).parents('.chart-container')[0])[1] + 15 + "px")
                    .transition()
                    .duration(TRANSITION_DURATION)
                    .style("opacity", 1)
                    .select(".value")
                    .text(function () {
                        var additionalInstructions = g.children.length ? ((g.state === 'expanded')?"(双击返回)":"(双击展开)") : "";
                        return g.name + additionalInstructions;
                    });
            }
        }
        function lineMouseE(g) {
            if (!isTransitioning) {
                showTooltip().select(".value").text(function () {
                    if (g.direction > 0) {
                        return g.source.name + " → " + g.target.name;
                    }
                    return dg.target.name + " ← " + g.source.name;
                });
            }
        }
        function nodeMouseM() {
            if (!isTransitioning) {
                tooltip
                    .style("left", d3.mouse($(d3.event.target).parents('.chart-container')[0])[0] + 10 + "px")
                    .style("top", d3.mouse($(d3.event.target).parents('.chart-container')[0])[1] + 15 + "px")
            }
        }
        function nodeMouseL() {
            if (!isTransitioning) {
                hideTooltip();
            }
        }

        node = bihiG.select("#nodes").selectAll(".node")
            .data(biHiSankey.collapsedNodes(), function (d) { return d.id; });

        node
        // .transition()
        // .duration(TRANSITION_DURATION)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .style("opacity", OPACITY.NODE_DEFAULT)
            .select("rect")
            .style("opacity", OPACITY.NODE_HIGHLIGHT)
            .style("fill", getNodeColor)
            // .style("stroke", function (d) { return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1); })
            // .style("stroke-width", "1px")
            .attr("height", function (d) {
                return d.height;
            })
            .attr("width", function (d) {
                return d.width;
            });

        node.select("text")
        // .style("opacity", OPACITY.NODE_DEFAULT)
            .attr('fill', function () {
                return TEXT_NORMAL_COLOR
            });

        node.exit()
        // .transition()
        // .duration(TRANSITION_DURATION)
            .attr("transform", function (d) {
                var collapsedAncestor, endX, endY;
                collapsedAncestor = d.ancestors.filter(function (a) {
                    return a.state === "collapsed";
                })[0];
                endX = collapsedAncestor ? collapsedAncestor.x : d.x;
                endY = collapsedAncestor ? collapsedAncestor.y : d.y;
                return "translate(" + endX + "," + endY + ")";
            })
            .remove();

        nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr('data-id',function (d) {return d.id?d.id:'root'});

        nodeEnter
            .attr("transform", function (d) {
                var startX = d._parent ? d._parent.x : (d.parent?d.parent.x:d.x),
                    startY = d._parent ? d._parent.y : (d.parent?d.parent.y:d.y);
                return "translate(" + startX + "," + startY + ")";
            })
            .style("opacity", 1e-6)
            // .transition()
            // .duration(TRANSITION_DURATION)
            .style("opacity", OPACITY.NODE_DEFAULT)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

        nodeEnter.append("rect")
            .style("fill", getNodeColor)
            // .style("stroke", function (d) {
            //     return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
            // })
            // .style("stroke-width", "2px")
            .attr("height", function (d) {return d.height;})
            .attr("width", function (d) {return d.width;})
            .attr("rx",function (d) {
                return d3.min([d.width,d.height])/20
            })
            .attr("ry",function (d) {
                return d3.min([d.width,d.height])/20
            })
            .filter(function (d) { return d.slevel == 1; });

        // add in the text for the nodes
        nodeEnter.append("text");
        nodeEnter.filter(function (d) { return d.height !== 0; })
            .select("text")
            .attr("x", function (d) { return d.width / 2; })
            .attr("y", function (d) { return d.height / 2; })
            .attr("font-size", function (d) {
                var transform = getTransform($('svg.bihi-svg')[0]); return TEXT_BIG_SIZE[d.slevel]/transform.k
            } )
            .attr('fill', function (d) { return TEXT_NORMAL_COLOR })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("transform", null)
            // .style("opacity", function () {
            //     var transform =  d3.zoomTransform(this);
            // })
            .text(function (d) { return d.name; });

        nodeEnter = nodeEnter.merge(node);

        expandedNodes = bihiG.select("#expandNodes").selectAll(".node")
            .data(biHiSankey.expandedNodes(), function (d) { return d.id; })

        expandedNodes
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .select("rect")
            .style("opacity", OPACITY.NODE_FADED)
            .style("fill", getNodeColor)
            .style("stroke", function (d) { return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1); })
            .style("stroke-width", "1px")
            .attr("height", function (d) { return d.height; })
            .attr("width", function (d) { return d.width; });

        expandedNodes.select("text")
            .attr("text-anchor", "middle ")
            .attr("x", function (d) { return (d.width/2) })
            .attr("y", 0)
            .attr('fill', function (d) { return d.color })
            .style("opacity", OPACITY.NODE_DEFAULT);

        expandedNodes.exit() .remove();

        expandedNodesEnter = expandedNodes.enter().append("g")
            .attr("class", "node")
            .attr('data-id',function (d) {return d.id?d.id:'root'});

        expandedNodesEnter
            .attr("transform", function (d) {
                var startX = d._parent ? d._parent.x : (d.parent?d.parent.x:d.x),
                    startY = d._parent ? d._parent.y : (d.parent?d.parent.y:d.y);
                return "translate(" + startX + "," + startY + ")";
            })
            .transition()
            .duration(TRANSITION_DURATION)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

        expandedNodesEnter.append("rect")
            .style("opacity", OPACITY.NODE_FADED)
            .style("fill", getNodeColor)
            .style("stroke", function (d) {
                return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
            })
            .style("stroke-width", "2px")
            .attr("height", function (d) {return d.height;})
            .attr("width", function (d) {return d.width;})
            .attr("rx",function (d) { return d3.min([d.width,d.height])/20 })
            .attr("ry",function (d) { return d3.min([d.width,d.height])/20 })
            .filter(function (d) { return d.slevel == 1; });

        expandedNodesEnter.append("text");
        expandedNodesEnter.filter(function (d) { return d.value !== 0; })
            .select("text")
            .attr("text-anchor", "middle ")
            .attr("x", function (d) { return (d.width/2) })
            .attr("y", 0)
            .attr('fill', function (d) { return d.color })
            .style("opacity", OPACITY.NODE_DEFAULT)
            .text(function (d) { return d.name; });

        expandedNodesEnter = expandedNodesEnter.merge(expandedNodes);

        nodeEnter.on("mouseenter", function (g) {nodeMouseE(g)});
        nodeEnter.on("mousemove", function () {nodeMouseM()});
        nodeEnter.on("mouseleave", function () {nodeMouseL()});
        nodeEnter
            .on("dblclick", showHideChildren)
            .on("mousedown", showNodeInfo);

        expandedNodesEnter.on("mouseenter", function (g) {nodeMouseE(g)});
        expandedNodesEnter.on("mousemove", function () {nodeMouseM()});
        expandedNodesEnter.on("mouseleave", function () {nodeMouseL()});
        expandedNodesEnter
            .on("dblclick", showHideChildren)
            .on("mousedown", showNodeInfo);

        link = bihiG.select("#links").selectAll("path.link")
            .data(biHiSankey.visibleLinks(), function (d) { return d.id; });

        link
            .style("stroke-width", function (d) { return Math.max(1, d.thickness); })
            .attr("d", path);

        link.exit().remove();

        linkEnter = link.enter().append("path")
            .attr("class", "link")
            .style("fill", "none");

        linkEnter.sort(function (a, b) { return b.thickness - a.thickness; })
            .classed("leftToRight", function (d) {
                return d.direction > 0;
            })
            .classed("rightToLeft", function (d) {
                return d.direction < 0;
            })
            .style("marker-end", function (d) {
                return (d.direction > 0)?('url(#arrowHead'+d.source.type+')'):('url(#arrowHead'+d.target.type+')');
            })
            .style("stroke", function(d) {
                if (d.direction > 0 ) { return colorScale(d.source.type.replace(/ .*/, "")); }
                else { return colorScale(d.target.type.replace(/ .*/, "")); }
            })
            .style("stroke-width", function (d) {
                return Math.max(1, d.thickness);
            })
            .style("opacity", OPACITY.LINK_FADED)
            .transition()
            .delay(TRANSITION_DURATION)
            .duration(TRANSITION_DURATION)
            .attr("d", path)
            .style("opacity", OPACITY.LINK_DEFAULT);

        linkEnter = linkEnter.merge(link);
        linkEnter.on('mouseenter', function (d) {lineMouseE (d)});
        linkEnter.on('mousemove', function () {nodeMouseM()});
        linkEnter.on('mouseleave', function () {nodeMouseL()});

        // 左侧列表信息
        leftElem = listBody.select(".nodeListContainer");
        leftNodes = leftElem.selectAll(".node-item")
            .data(biHiSankey.showListNodes(), function (d) { return d.id; });
        leftNodes.classed('node-item-p',function (d) { return d.state == 'expanded'?true:false; })

        leftNodes.exit().remove();
        leftNodesEnter = leftNodes.enter().append("div")
            .attr("class", function (d) {return "node-item node-item-"+d.slevel+""} )
            .attr('data-id', function (d) { return d.id });

        leftNodesEnter.append("span")
            .attr('class','item-ico')
            .style("background-color",function (d) { return d.color });
        leftNodesEnter.append("span")
            .attr('class','item-text')
            .attr('title',function (d) { return d.name; })
            .text(function (d) {
                if (d.parent || d._parent) {
                    var pid = d.parent?d.parent.id:d._parent.id;
                    leftElem.select('.node-item[data-id="'+ pid +'"]').classed('node-item-p',true);
                    var p = $(this).parents('.nodeListContainer').find('.node-item[data-id="'+ pid +'"]');
                    $($(this).parents('.node-item')[0]).insertAfter(p)
                }
                if (d.children.length) {
                    leftElem.select('.node-item[data-id="'+ d.id +'"]').classed('node-item-haveC',true);
                }
                return d.name ;
            });
        leftNodesEnter = leftNodesEnter.merge(leftNodes);
        leftNodesEnter
            .on('click',showNodeInfo)
            .on("dblclick", showHideChildren)

        $(bihisvg.node()).on('mousedown', function(e) {
            if (!$(e.target).closest('.node').length) {
                restoreLinksAndNodes();
            }
        });

        //搜索功能
        // d3.select('#inputSearchC').on('keydown', function(){
        //     if (d3.event.keyCode == 13) {
        //         SERRCH_WORD = $(this).find('input').val();
        //         console.log('inputSearchC : ' + SERRCH_WORD);
        //         d3.selectAll("div.node-item").filter(function (n) {
        //             return n.name.indexOf(SERRCH_WORD) != -1
        //         }).style('color','red')
        //     }
        // })

    }

    function redraw() {
        hideTooltip();
        var transform =  d3.zoomTransform(this);
        bihiG.attr("transform", d3.zoomTransform(this));
        d3.selectAll('text')
            .attr('font-size','10'
            //     function (d) {
            //     return TEXT_BIG_SIZE[d.slevel]/transform.k
            // }
            );
        // console.log('redrawredrawredrawredrawredraw:'+transform.k);
        if (transform.k < 0.4) {
            d3.selectAll('g.node').filter(function(d) {
                return d.slevel>=2
            }).selectAll('text')
                .transition()
                .duration(TRANSITION_DURATION*5)
                .style("opacity", 0)
        } else {d3.selectAll('g.node').filter(function(d) {return d.slevel>=2}).selectAll('text')
            .transition()
            .duration(TRANSITION_DURATION*5)
            .style("opacity", 1)
        }
    }

    biHiSankey
        .nodes(data.nodes)
        .links(data.links)
        // .initializeNodes(function (node) { node.state = node.parent ? "contained" : "collapsed"; })
        .initializeNodes(function (node) {
            if(flag == 'expanded') {
                node.state = node.children.length > 0 ? "expanded" : "collapsed";
            } else {
                node.state = node.parent ? "contained" : "collapsed";
            }
        } )
        .layout(LAYOUT_INTERATIONS);

    disableUserInterractions(2 * TRANSITION_DURATION);

    update();

    //自定义起始动画
    function  setTranstion(k,x,y,t) {
        bihisvg.transition()
            .duration(t)
            .call(zoom.transform, d3.zoomIdentity.scale(k).translate(x, y))
            .on('end',function () {
                bihisvg.call(zoom).on("dblclick.zoom", null)
            })
    }
    //计算缩放区域
    var kx = (WIDTH * 0.8) / Math.round(bihisvg.select('g').node().getBoundingClientRect().width),
        ky = (HEIGHT * 0.8) / Math.round(bihisvg.select('g').node().getBoundingClientRect().height),
        k1 = d3.min([ZOOM_MIN,d3.min([kx,ky])]);
    zoom.scaleExtent([k1 , ZOOM_MAX]);
    var x1 =  (WIDTH/2 - Math.round(bihisvg.select('g').node().getBoundingClientRect().width * k1/2))/k1,
        y1 =  (HEIGHT/2 - Math.round(bihisvg.select('g').node().getBoundingClientRect().height * k1/2))/k1;
    setTranstion (k1,x1,y1,1000)

    $(window).resize(function () {
        if(!getNodeWH(node)) return false;
        var d = $(bihisvg.node()).parents('.chart-container').css('display');
        if (d && d!='none') {
            bihisvg
                .attr("width", (getNodeWH(node).w - leftWidth))
                .attr("height", (getNodeWH(node).h ))
        }
    })
}
