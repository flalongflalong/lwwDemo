
(function ($){



 'use strict';

    let w = 1280,
        h = 700,
        rx = 600,
        ry = 330,
        m0,
        rotate = 0;

    let zoom_w = 300,
        zoom_h = 150;

    let splines = [];

    let cluster = d3.layout.cluster() //将实体聚集成树状图
        .size([360, ry - 140]) //取得或设置布局的尺寸
        .sort(function(a, b) { //按照size进行排序   sort()取得或设置兄弟节点的比较器函数  ascending()为排序比较两个值
            return d3.ascending(a.size, b.size);
        });
    let bundle = d3.layout.bundle(); //构造一个新的默认的捆绑布局
    let line = d3.svg.line.radial() //新建一个径向线生成器
        .interpolate("bundle") //设置或获取插值模式 设置或获取径向弦的插值模式。
        .tension(.95) //设置或获取基本样条线的张力 设置或获取径向基本样条线的张力。
        .radius(function(d) {
            return d.y;
        }) //设置或获取半径访问器
        .angle(function(d) {
            return d.x / 180 * Math.PI;
        }); //设置或获取角度 accessor
    //debugger;

    let x = d3.scaleLinear() //构建一个线性比例尺。
        .domain([0, 800]) //取得或设置比例尺的定义域
        .range([0, 800]); //取得或设置比例尺的输出范围

    let y = d3.scaleLinear() //同上
        .domain([0, 200])
        .range([200, 0]);

    let div = d3.select("#metadata_relation").insert("div", "h2")
        .style("top", 0)
        .style("left", 0)
        .attr('id','metadata_relation_box')
        .style("width", w + "px")
        .style("height", h + "px")
        .style("position", "absolute")
        .style("-webkit-backface-visibility", "hidden");


    //定义缩放函数
    let zoom = d3.zoom()
        .scaleExtent([0.5, 5]) //用于设置最小和最大的缩放比例
        .on("zoom", forceRedraw)

    let svg = div.append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .call(zoom)
        .append("svg:g")

    .attr("transform", "translate(" + rx + "," + ry + ")");

    //关系图
    function forceRedraw() {
        var transform = d3.zoomTransform(this);
        svg.attr("transform", "translate(" + (+rx + transform.x) + ',' + (+ry + transform.y) + ")scale(" + transform.k + ")");
    }



    let color = ['red', 'green', 'gray'];

    //拖拽旋转
    // svg.append("svg:path")
    //     .attr("class", "arc")
    //     .attr("d", d3.svg.arc().outerRadius(ry).innerRadius(10).startAngle(0).endAngle(2 * Math.PI));
    // .on("mousedown", mousedown_rotate);

    d3.json("../mms_data/flare-imports.json", function(classes) {
        let nodes = cluster.nodes(packages.root(classes)),
            links = packages.imports(nodes),
            splines = bundle(links);


        //debugger;
        //为关系集合设置贝塞尔曲线连接
        let path = svg.selectAll("path.link")
            .data(links)
            .enter()
            .append("svg:path")
            .attr("class", function(d) {
                return "link source-" + d.source.key + " target-" + d.target.key;
            })
            .style("stroke", function(d) {
                if (d.source.type == 'A' || d.target.type == 'A') {
                    return '#CB1B1B';
                } else if (d.source.type == 'B' || d.target.type == 'B') {
                    return '#EEAC5E';
                } else if (d.source.type == 'C' || d.target.type == 'C') {
                    return '#2B8F39';
                }
            })
            .attr("d", function(d, i) {
                return line(splines[i]);
            });
        //根据node集合生成节点
        let node = svg.selectAll("g.node")
            .data(nodes.filter(function(n) {
                return !n.children;
            }))
            .enter().append("svg:g")
            .attr("class", "node")
            .attr("id", function(d) {
                return "node-" + d.key;
            })
            .attr("transform", function(d) {
                return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 5.5) + ")";
            })
            .append("svg:circle")
            .attr("r", function(d) {
                return d.type == 'D' || d.type == 'E' || d.type == 'F' ? 1.5 : 2
            }) // .padding()
            .style('fill', function(d) {
                if (d.type == 'A') {
                    return '#CB1B1B';
                } else if (d.type == 'B') {
                    return '#EEAC5E';
                } else if (d.type == 'C') {
                    return '#2B8F39';
                } else if (d.type == 'D') {
                    return '#1274CB';
                } else if (d.type == 'E') {
                    return '#78E9F9';
                } else if (d.type == 'F') {
                    return '#77C1F0';
                }
            })

        let text = svg.selectAll("g.text")
            .data(nodes.filter(function(n) {
                return !n.children;
            }))
            .enter().append("svg:g")
            .append("svg:text")
            .attr("dx", function(d) {
                return d.x < 180 ? 4 : -4;
            }) //文字 点之间的距离
            .attr("dy", ".31em")
            .attr("transform", function(d) {
                return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
            })
            .attr("text-anchor", function(d) {
                return d.x < 180 ? "start" : "end";
            })
            .text(function(d) {
                return d.key;
            })
            .style('fill', function(d) {
                if (d.type == 'A') {
                    return '#CB1B1B';
                } else if (d.type == 'B') {
                    return '#EEAC5E';
                } else if (d.type == 'C') {
                    return '#2B8F39';
                } else {
                    return '#162e42';
                }
            })

        .style('font-size', function(d) {
                return d.type == 'D' || d.type == 'E' || d.type == 'F' ? '2px' : '4px'
            })
            .on("mousedown", mousedown)
            // .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        let parentNode = d3.select("#metadata_relation_box");

        let listBody = parentNode.append("div").attr("class", "chart-left");
        listBody.style('position','absolute')
            .style('left','40px')
            .style('bottom','40px');


        listBody.append("div")
            .html('<div class="d3_legend">' +
                '<ul>元数据关系图例</ul>' +
                '<ul>' +
                '<li id="yw"><span class="legend_circle yw"></span><span>业务元数据</span></li>' +
                '<li id="js"><span class="legend_circle js"></span><span>技术元数据</span></li>' +
                '<li id="cz"><span class="legend_circle cz"></span><span>操作元数据</span></li>' +
                '<li id="tab_input"><span class="legend_circle jk_in"></span><span>接口表-输入</span></li>' +
                '<li id="tab_output"><span class="legend_circle jk_out"></span><span>接口表-输出</span></li>' +
                '<li id="tab_work"><span class="legend_circle work"></span><span>加工表</span></li>' +
                '</ul>' +
                '</div>');



        d3.selectAll('li#yw')
            .data(nodes.filter(function(n) {
                return !n.children && n.type == 'A';
            }))
            .on("click", changeColor)
            .on("mouseout", mouseout);
        d3.selectAll('li#js')
            .data(nodes.filter(function(n) {
                return !n.children && n.type == 'B';
            }))
            .on("click", changeColor)
            .on("mouseout", mouseout);
        d3.selectAll('li#cz')
            .data(nodes.filter(function(n) {
                return !n.children && n.type == 'C';
            }))
            .on("click", changeColor)
            .on("mouseout", mouseout);
        d3.selectAll('li#tab_input')
            .data(nodes.filter(function(n) {
                return !n.children && n.type == 'D';
            }))
            .on("click", changeColor)
            .on("mouseout", mouseout);
        d3.selectAll('li#tab_output')
            .data(nodes.filter(function(n) {
                return !n.children && n.type == 'E';
            }))
            .on("click", changeColor)
            .on("mouseout", mouseout);
        d3.selectAll('li#tab_work')
            .data(nodes.filter(function(n) {
                return !n.children && n.type == 'F';
            }))
            .on("click", changeColor)
            .on("mouseout", mouseout);
    });


    // d3.select(window)
    // .on("mousemove", mousemove)
    // .on("mouseup", mouseup);



    //清除信息
    function clearInfo(pNode) {
        pNode.selectAll('li.attr').remove();
    }


    function changeColor(d) { //debugger;
        //得到点击的一类数据，如何循环整个数据？？？？？？？？？？？？？？？
        svg.selectAll("path.link")
            .classed("gray", true)

        svg.selectAll("path.link.target-" + d.key)
            .classed("target" + d.type, true)
            .each(updateNodes("source" + d.type, true));

        svg.selectAll("path.link.source-" + d.key)
            .classed("source" + d.type, true)
            .each(updateNodes("target" + d.type, true));

    }

    function mouse(e) {
        return [e.pageX - rx, e.pageY - ry];
    }

    //显示详细信息
    function showdetais(obj, pNode) {
        console.log('obj:' + obj)
        console.log('pNode:' + pNode)


        // function setdetails(obj){
        for (let key in obj) {
            if (obj[key] != '' && key != 'size' && key != 'imports' && key != 'depth' && key != 'x' && key != 'y' && key != 'parent' && key != 'key') {
                let li = pNode.append('li').attr('class', 'attr attr ' + key);

                if (key == 'name') {
                    li.append('span').attr('class', 'relationship_name').text('元数据名称');
                    li.append('span').attr('class', 'relationship_value').text(obj[key]);
                } else if (key == 'type') {
                    if (obj[key] == 'A') {
                        obj[key] = '业务元数据';
                    } else if (obj[key] == 'B') {
                        obj[key] = '技术元数据';
                    } else if (obj[key] == 'C') {
                        obj[key] = '操作元数据';
                    }
                    li.append('span').attr('class', 'relationship_name').text('元数据类型');
                    li.append('span').attr('class', 'relationship_value').text(obj[key]);
                } else if (key == 'fieldNum') {
                    li.append('span').attr('class', 'relationship_name').text('字段数量');
                    li.append('span').attr('class', 'relationship_value').text(obj[key]);
                } else if (key == 'tableNum') {
                    li.append('span').attr('class', 'relationship_name').text('表数量');
                    li.append('span').attr('class', 'relationship_value').text(obj[key]);
                } else if (key == 'StatisticsTime') {
                    li.append('span').attr('class', 'relationship_name').text('统计时间');
                    li.append('span').attr('class', 'relationship_value').text(obj[key]);
                }
            }
        }

        // let infoLi = pNode.append('li').attr('class','attr attr');
        // let erBtn = infoLi.append('button').attr('class','val-btn').text('版本比较');
        // erBtn.on('click',function () {
        //    alert('版本比较')
        // })

    }


    function mousedown(d) { //debugger;

        svg.selectAll("path.link")
            .classed("gray", true)

        svg.selectAll("path.link.target-" + d.key)
            .classed("target" + d.type, true)
            .each(updateNodes("source" + d.type, true));

        svg.selectAll("path.link.source-" + d.key)
            .classed("source" + d.type, true)
            .each(updateNodes("target" + d.type, true));

        $('.details').show();
        $('#metadata_title_name').text(d.key);

        let pNode = d3.select('.details_content ul');
        clearInfo(pNode);
        showdetais(d, pNode);

    }

    //拖拽旋转
    // function mousedown_rotate() {
    //   m0 = mouse(d3.event);
    //   d3.event.preventDefault();
    // }

    // function mousemove() {
    //   if (m0) {
    //     let m1 = mouse(d3.event),
    //         dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
    //     div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
    //   }
    // }

    // function mouseup() {
    //   if (m0) {
    //     let m1 = mouse(d3.event),
    //         dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

    //     rotate += dm;
    //     if (rotate > 360) rotate -= 360;
    //     else if (rotate < 0) rotate += 360;
    //     m0 = null;

    //     div.style("-webkit-transform", null);

    //     svg
    //         .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
    //         .selectAll("g.node text")
    //         .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
    //         .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
    //         .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
    //   }
    // }

    function mouseover(d) { //debugger;
        svg.selectAll("g.text")
            .style('font-size', function(d) {
                return '20px'
            })
    }

    function mouseout(d) { //debugger;
        svg.selectAll("path.link")
            .classed("gray", false)

        svg.selectAll("path.link.target-" + d.key)
            .classed("target" + d.type, false)

        svg.selectAll("path.link.source-" + d.key)
            .classed("source" + d.type, false)

    }

    function updateNodes(name, value) { //debugger;
        return function(d) {
            if (value) this.parentNode.appendChild(this);
            svg.select("#node-" + d.key).classed(name, value); //[name]
        };
    }

    function cross(a, b) {
        return a[0] * b[1] - a[1] * b[0];
    }

    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }


})(jQuery)
