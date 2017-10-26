

var addForceLay = function (el,data) {
    // chart dimensions
    var config = {
        "title":"Les Miserables characters",
        "graph":{
            "linkDistance":150,
            "charge":-200,
            "height":800,
            "numColors":12,
            "labelPadding":{
                "left":3,
                "right":3,
                "top":2,
                "bottom":2
            },
            "labelMargin":{
                "left":3,
                "right":3,
                "top":2,
                "bottom":2
            },
            "ticksWithoutCollisions":50
        },
        "types":{
            "group0":{
                "short":"Group 0",
                "long":"Group 0 long name for docs"
            },
            "group1":{
                "short":"Group 1",
                "long":"Group 1 long name for docs"
            },
            "group2":{
                "short":"Group 2",
                "long":"Group 2 long name for docs"
            },
            "group3":{
                "short":"Group 3",
                "long":"Group 3 long name for docs"
            },
            "group4":{
                "short":"Group 4",
                "long":"Group 4 long name for docs"
            },
            "group5":{
                "short":"Group 5",
                "long":"Group 5 long name for docs"
            },
            "group6":{
                "short":"Group 6",
                "long":"Group 6 long name for docs"
            },
            "group7":{
                "short":"Group 7",
                "long":"Group 7 long name for docs"
            },
            "group8":{
                "short":"Group 8",
                "long":"Group 8 long name for docs"
            },
            "group9":{
                "short":"Group 9",
                "long":"Group 9 long name for docs"
            },
            "group10":{
                "short":"Group 10",
                "long":"Group 10 long name for docs"
            }
        },
        "constraints":[
            {"has":{"metadata":"group1"},"metadata":"position","x":0.2,"y":0.2,"weight":0.7},
            {"has":{"metadata":"group2"},"metadata":"position","x":0.8,"y":0.2,"weight":0.7},
            {"has":{"metadata":"group3"},"metadata":"position","x":0.2,"y":0.5,"weight":0.7},
            {"has":{"metadata":"group4"},"metadata":"position","x":0.8,"y":0.5,"weight":0.7},
            {"has":{"metadata":"group5"},"metadata":"position","x":0.2,"y":0.8,"weight":0.7},
            {"has":{"metadata":"group8"},"metadata":"position","x":0.8,"y":0.8,"weight":0.7}
        ]
    };
    var width  = $(el).parent().width(), height = $(el).parent().height();
    var leftWidth = 200,rightWidth = 300;
    var midWidth = (width - leftWidth - rightWidth);
    var leftListData = [
        {'id':'T1','cn':'物理数据','slevel':0},{'id':'T2','cn':'业务元数据','slevel':0},{'id':'T3','cn':'技术元数据','slevel':0},{'id':'T4','cn':'操作元数据','slevel':0},
        {'id':'1','cn':'事实表','pid':'T1','slevel':1},
        {'id':'B','cn':'系统信息','pid':'T2','slevel':1},{'id':'C','cn':'术语列表','pid':'T2','slevel':1},{'id':'D','cn':'业务规则','pid':'T2','slevel':1},
        {'id':'E','cn':'逻辑模型','pid':'T3','slevel':1},{'id':'F','cn':'物理模型','pid':'T3','slevel':1},{'id':'G','cn':'技术规则','pid':'T3','slevel':1},{'id':'I','cn':'ETL规则','pid':'T3','slevel':1},
        {'id':'J','cn':'ETL运行记录','pid':'T4','slevel':1},{'id':'K','cn':'用户使用记录','pid':'T4','slevel':1},{'id':'L','cn':'数据归档记录','pid':'T4','slevel':1},{'id':'M','cn':'数据备份恢复记录','pid':'T4','slevel':1}
    ];
    var graph       = {},
        selected    = {},
        highlighted = null;

    graph.data = data.data;
    if (graph.data) {
        graph.nodesByMetadata = d3.nest()
            .key(function (node) {
                return node.nodeId;
            })
            .sortKeys(d3.ascending)
            .entries(graph.data);
    }
    graph.margin = {
        top    : 20,
        right  : 20,
        bottom : 20,
        left   : 20
    };
    var display = $(el).css('display');
    $(el)
        .css('display', 'block')
        .css('height', config.graph.height + 'px');
    graph.width  = $(el).width()  - graph.margin.left - graph.margin.right - leftWidth - rightWidth;
    graph.height = $(el).height() - graph.margin.top  - graph.margin.bottom;
    $(el).css('display', display);

    for (var id in graph.data) {
        var obj = graph.data[id];
        obj.positionConstraints = [];
        obj.linkStrength        = 1;
        obj.circleR = Math.round((Math.log1p(obj.value))*8);

        config.constraints.forEach(function(c) {
            for (var k in c.has) {
                if (c.has[k] !== obj[k]) {
                    return true;
                }
            }

            switch (c.metadata) {
                case 'position':
                    obj.positionConstraints.push({
                        weight : c.weight,
                        x      : c.x * graph.width,
                        y      : c.y * graph.height
                    });
                    break;

                case 'linkStrength':
                    obj.linkStrength *= c.strength;
                    break;
            }
        });
    }
    graph.links = [];
    for (var id in graph.data) {
        var obj = graph.data[id];
        for (var depIndex in obj.depends) {
            var link = {
                source : graph.data[obj.depends[depIndex]],
                target : obj
            };
            link.strength = (link.source.linkStrength || 1)
                * (link.target.linkStrength || 1);
            graph.links.push(link);
        }
    }

    graph.categories = {};
    for (var id in graph.data) {
        var obj = graph.data[id],
            key = obj.metadata ,
            // key = obj.metadata + ':' + (obj.group || ''),
            cat = graph.categories[key];

        obj.categoryKey = key;
        if (!cat) {
            cat = graph.categories[key] = {
                key      : key,
                metadata     : obj.metadata,
                typeName : (config.types[obj.metadata]
                    ? config.types[obj.metadata].short
                    : obj.type),
                group    : obj.type,
                count    : 0
            };
        }
        cat.count++;
    }
    graph.categoryKeys = d3.keys(graph.categories);

    graph.colors = colorbrewer.Set3[config.graph.numColors];

    function getColorScale(darkness) {
        return d3.scaleOrdinal()
            .domain(graph.categoryKeys)
            .range(graph.colors.map(function(c) {
                return d3.hsl(c).darker(darkness).toString();
            }));
    }

    graph.strokeColor = getColorScale( 0.7);
    graph.fillColor   = getColorScale(-0.1);
    graph.nodeValues = d3.values(graph.data);
    graph.leftSel = d3.set(graph.categoryKeys);

    $(el).empty();

    var forceZoom = d3.zoom()
        .scaleExtent([0.5, 4])
        .on('zoom', forceRedraw);

    //leftDiv
    graph.leftContianer= d3.select(el)
        .append("div")
        .attr("class",'data-force-left')
        .style("float", 'left')
        .style("width", leftWidth+'px')
        .style("height", height +'px')
        .append("div")
        .attr("class",'force-list-container');
// set up svg
    graph.svg = d3.select(el)
        .append("svg")
        .attr("class",'data-force-svg')
        .attr("width", midWidth)
        .attr("height", height)
        .style("float", 'left')
        .call(forceZoom)
        .append("g")
        .attr("class",'force-g');
    //rightDiv
    graph.rightContianer = d3.select(el)
        .append("div")
        .attr("class",'data-force-right')
        .style("float", 'left')
        .style("width", (rightWidth - 2)+'px')
        .style("height", height +'px')
        .append("div")
        .attr("class",'details-content')
        .append("ul")
        .attr("class",'force-info-container');

    // 左侧列表信息
    graph.leftNodes = graph.leftContianer.selectAll(".node-item")
        .data(leftListData, function (d) { return d.id; });

    graph.leftNodes.exit().remove();
    graph.leftNodesEnter = graph.leftNodes.enter().append("div")
        .attr("class", function (d) {return "node-item node-item-"+d.slevel+""} )
        .attr('data-id', function (d) { return d.id })
        .attr('data-pid', function (d) { return d.pid?d.pid:'null' })
        .attr('data-enable',false);

    graph.leftNodesEnter.filter(function (d) {
        if ($.inArray(d.id,graph.categoryKeys) != -1) return true;
        return false
    }).attr('data-enable',true).attr('data-sel',true);

    graph.leftNodesEnter.append("span")
        .attr('class','item-text')
        .attr('title',function (d) { return d.cn; })
        .text(function (d) {
            if (d.pid) {
                var pid = d.pid;
                graph.leftContianer.select('.node-item[data-id="'+ pid +'"]').classed('node-item-p',true);
                var p = $(this).parents('.force-list-container').find('.node-item[data-id="'+ pid +'"]');
                $($(this).parents('.node-item')[0]).insertAfter(p)
            }
            // if (d.children.length) {
            //     leftElem.select('.node-item[data-id="'+ d.id +'"]').classed('node-item-haveC',true);
            // }
            return d.cn ;
        });
    graph.leftNodesEnter = graph.leftNodesEnter.merge(graph.leftNodes);

    //右侧信息
    graph.rightContianer.append('li')
        .attr('class','title')
        .append('span').text('节点信息：');

    //关系图
    function forceRedraw() {
        var transform = d3.zoomTransform(this);
        graph.svg.attr("transform", transform);
        console.log('forceRedraw:' + transform.k)
    }

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(config.graph.linkDistance) )
        .force("charge", d3.forceManyBody().strength(config.graph.charge))
        .force("center", d3.forceCenter(midWidth / 2, height / 2));

    graph.svg.append('defs').selectAll('marker')
        .data(['end'])
        .enter().append('marker')
        .attr('id'          , String)
        .attr('viewBox'     , '0 -5 10 10')
        .attr('refX'        , 10)
        .attr('refY'        , 0)
        .attr('markerWidth' , 6)
        .attr('markerHeight', 6)
        .attr('orient'      , 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5');
    
    graph.line = graph.svg.append("g")
        .style("stroke", "#aaa")
        .selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr('class', 'link');;

    graph.node = graph.svg.selectAll('.node')
        .data(graph.nodeValues)
        .enter().append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    graph.nodeRect = graph.node.append('circle')
        .attr('r',function (d) {
            return d.circleR
        })
        .attr('fill', function(d) {
            return graph.fillColor(d.categoryKey);
        });

    var maxLineChars = 26,
        wrapChars    = ' /_-.'.split('');

    function wrap(text) {
        if (text.length <= maxLineChars) {
            return [text];
        } else {
            for (var k = 0; k < wrapChars.length; k++) {
                var c = wrapChars[k];
                for (var i = maxLineChars; i >= 0; i--) {
                    if (text.charAt(i) === c) {
                        var line = text.substring(0, i + 1);
                        return [line].concat(wrap(text.substring(i + 1)));
                    }
                }
            }
            return [text.substring(0, maxLineChars)]
                .concat(wrap(text.substring(maxLineChars)));
        }
    }

    graph.node.each(function(d) {
        var node  = d3.select(this),
            rect  = node.select('rect'),
            lines = wrap(d.name),
            ddy   = 1.1,
            dy    = -ddy * lines.length / 2 + .5;

        lines.forEach(function(line) {
            var text = node.append('text')
                .text(line)
                .attr('dy', dy + 'em');
            dy += ddy;
        });
    });

    function ticked() {
        graph.numTicks++;

        graph.line
            .attr('x1', function(d) {
                return d.source.x;
            })
            .attr('y1', function(d) {
                return d.source.y;
            })
            .each(function(d) {

                var x    = d.target.x,
                    y    = d.target.y,
                    cx   = 0,
                    cy   = 0;

                cy = (Math.abs(Math.cos(Math.atan((x- d.source.x)/(y- d.source.y))) * d.target.circleR)) * ((y-d.source.y)>0?-1:1);
                cx = (Math.abs(Math.sin(Math.atan((x - d.source.x)/(y- d.source.y))) * d.target.circleR)) * ((x - d.source.x)>0?-1:1);

                d3.select(this)
                    .attr('x2', x+cx)
                    .attr('y2', y+cy);
            });

        graph.node
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
    }

    simulation
        .nodes(graph.nodeValues)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    graph.leftNodesEnter
        .on('click',function (d) {
            if ($(this).data('enable')) {
                setHighlightObjectByLeft(d)
            }
        });

    //初始化图形缩放
    graph.svg.transition()
        .duration(1000)
        .call(forceZoom.transform, d3.zoomIdentity.scale(1).translate(0, 0))
        .on('end',function () {
            var transform = d3.zoomTransform('svg.data-force-svg')
            transform.k=1;transform.x = 0;transform.y = 0;
        });

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;

        if (!dragged(d)) {
            selectObject(d, this);
        }
        d.fixed &= ~6;
    }

    setTimeout(function() {
        graph.node.each(function(d) {
            var node   = d3.select(this),
                text   = node.selectAll('text'),
                bounds = {},
                first  = true,
                rx = parseInt(node.select('circle').attr('r')),
                ry = 0;

            text.each(function() {
                var box = this.getBBox();
                if (first || box.x < bounds.x1) {
                    bounds.x1 = box.x;
                }
                if (first || box.y < bounds.y1) {
                    bounds.y1 = box.y;
                }
                if (first || box.x + box.width > bounds.x2) {
                    bounds.x2 = box.x + box.width;
                }
                if (first || box.y + box.height > bounds.y2) {
                    bounds.y2 = box.y + box.height;
                }
                first = false;
                ry += (box.height/2);
            }).attr('text-anchor', 'start')
                .attr('x',rx).attr('y',ry);

            var padding  = config.graph.labelPadding,
                margin   = config.graph.labelMargin,
                oldWidth = bounds.x2 - bounds.x1;

            bounds.x1 -= oldWidth / 2;
            bounds.x2 -= oldWidth / 2;

            bounds.x1 -= padding.left;
            bounds.y1 -= padding.top;
            bounds.x2 += padding.left + padding.right;
            bounds.y2 += padding.top  + padding.bottom;

            // node.select('rect')
            //     .attr('x', bounds.x1)
            //     .attr('y', bounds.y1)
            //     .attr('width' , bounds.x2 - bounds.x1)
            //     .attr('height', bounds.y2 - bounds.y1);

            d.extent = {
                left   : bounds.x1 - margin.left,
                right  : bounds.x2 + margin.left + margin.right,
                top    : bounds.y1 - margin.top,
                bottom : bounds.y2 + margin.top  + margin.bottom
            };

            d.edge = {
                left   : new geo.LineSegment(bounds.x1, bounds.y1, bounds.x1, bounds.y2),
                right  : new geo.LineSegment(bounds.x2, bounds.y1, bounds.x2, bounds.y2),
                top    : new geo.LineSegment(bounds.x1, bounds.y1, bounds.x2, bounds.y1),
                bottom : new geo.LineSegment(bounds.x1, bounds.y2, bounds.x2, bounds.y2)
            };
        });

        graph.numTicks = 0;
        $(el).css('visibility', 'visible');
    });

    $(el).on('click', function(e) {
        if (!$(e.target).closest('.node').length) {
            deselectObject();
        }
    });

    function selectObject(obj, el) {
        if (d3.event.defaultPrevented) return; // zoomed
        var node;
        if (el) {
            node = d3.select(el);
        } else {
            graph.node.each(function(d) {
                if (d === obj) {
                    node = d3.select(el = this);
                }
            });
        }
        if (!node || !graph.leftSel.has(obj.metadata)) return;

        if (node.classed('selected')) {
            deselectObject();
            return;
        }
        deselectObject(false);

        selected = {
            obj : obj,
            el  : el
        };

        highlightObject(obj);

        node.classed('selected', true);
    }
    function deselectObject(doResize) {
        // if (doResize || typeof doResize == 'undefined') {
        //     resize(false);
        // }
        graph.node.classed('selected', false);
        selected = {};
        highlightObject(null);
    }
    function highlightObject(obj) {
        clearInfo(graph.rightContianer);
        if (obj) {
            if (obj !== highlighted) {
                graph.node.classed('inactive', function(d) {
                    return ((obj !== d
                    && d.depends.indexOf(obj.id) == -1
                    && d.dependedOnBy.indexOf(obj.id) == -1)
                    || !graph.leftSel.has(d.metadata));
                });
                graph.line.classed('inactive', function(d) {
                    return ((obj !== d.source && obj !== d.target)
                    ||(!(graph.leftSel.has(d.source.metadata) && graph.leftSel.has(d.target.metadata))))
                });
            }
            highlighted = obj;
            showInfo (obj,graph.rightContianer);
        } else {
            if (highlighted) {
                HighlightObjectByLeft()
                // graph.node.classed('inactive', false);
                // graph.line.classed('inactive', false);
            }
            highlighted = null;
        }
    }
    function setHighlightObjectByLeft(d) {
        var c = d.id;
        if(graph.leftSel.has(c)) {graph.leftSel.remove(c)}
        else {graph.leftSel.add(c)};
        graph.line.classed('inactive', true);
        HighlightObjectByLeft();
    }
    function HighlightObjectByLeft() {
        graph.node.classed('inactive', function (dd) {
            return !graph.leftSel.has(dd.metadata);
        });
        graph.line.classed('inactive', function(dd) {
            return !(graph.leftSel.has(dd.source.metadata) && graph.leftSel.has(dd.target.metadata));
        });
        graph.leftNodesEnter.classed('sel', function (ld) {
            return graph.leftSel.has(ld.id);
        });
    }
    HighlightObjectByLeft();
}
