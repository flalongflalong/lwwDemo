d3.biHiSankey = function () {
    "use strict";

    var biHiSankey = {},
        baseSize = 5,
        nodeWidth = 10,
        nodeHeight = 4,
        nodeSpacing = 4,
        linkSpacing = 4,
        nodeSpacingArray = [30,20,4,2],
        nodeMargin = 50,
        yDistanceMul = 15,
        arrowheadScaleFactor = 0.5, // Specifies the proportion of a link's stroke width to be allowed for the marker at the end of the link.
        size = [1, 1], // default to one pixel by one pixel
        nodes = [],
        nodeMap = {},
        parentNodes = [],
        leafNodes = [],
        links = [],
        xScaleFactor = 1,
        yScaleFactor = 1,
        defaultLinkCurvature = 0.2;

    function center(node) {
        return node.y + node.height / 2;
    }

    function value(link) {
        return parseInt(link.value);
    }

    function initializeNodeArrayProperties(node) {
        node.sourceLinks = [];
        node.rightLinks = [];
        node.targetLinks = [];
        node.leftLinks = [];
        node.connectedNodes = [];
        node.children = [];
        node.ancestors = [];
    }
    // generates the nodeMap {"1": <node1>, "2": <node2>}
    // and initializes the array properties of each node
    function initializeNodeMap() {
        nodes.forEach(function (node) {
            if (!node.pid) {
                node.pid = '0'
            }
            nodeMap[node.id] = node;
            initializeNodeArrayProperties(node);
        });
    }

    function computeLeafNodes() {
        leafNodes = nodes.filter(function (node) {
            return !node.children.length;
        });
    }

    function computeParentNodes() {
        parentNodes = nodes.filter(function (node) {
            return node.children.length;
        });
    }

    function addAncestorsToChildren(node) {
        node.children.forEach(function (child) {
            child.ancestors = child.ancestors.concat(this.ancestors.concat([this]));
            addAncestorsToChildren(child);
        }, node);
    }

    // generate hierarchical connections between parent and child nodes
    function computeNodeHierarchy() {
        var parent,
            rootNodes = [];

        nodes.sort(function(a, b) {
            return (a.pid?a.pid.length:0) - (b.pid?b.pid.length:0);
        });

        nodes.forEach(function (node) {
            parent = nodeMap[node.pid];

            node.px = parseInt(node.px) - 1;
            node.py = parseInt(node.py) - 1;
            node.width = 0;
            node.height = 0
            node.x = 0;
            node.y = 0
            node.cmx = parseInt(node.cmx?node.cmx:1);
            node.cmy = parseInt(node.cmy?node.cmy:1);

            if (parent) {
                node.parent = parent;
                if (parent.type) {node.type = parent.type};
                node.slevel = (node.parent.slevel + 1);
                parent.children.push(node);

            } else {
                node.parent = null;
                node.slevel = 0;
                rootNodes.push(node);
            }
        });

        nodes.sort(function(a, b) {
            return b.slevel - a.slevel;
        });

        nodes.forEach(function (node) {
            node.cmy = Math.log(node.cmy)*150;
            node.xc = 0;node.yc = 0;
            if (node.children.length == 0) {
                node.wc = node.cmx * nodeWidth;
                node.hc = node.cmy * nodeHeight;
            } else {
                // node.xc = nodeSpacing*2;node.yc = nodeSpacing*2;
                node.hc = nodeSpacing*2;node.wc = nodeSpacing*2;
                var nodeCs = node.children;
                var nodesCByXPosition = d3.nest()
                    .key(function (dd) {
                        return dd.px;
                    })
                    .sortKeys(d3.ascending)
                    .entries(nodeCs);
                nodesCByXPosition.forEach(function (ds,xi) {
                    node.wc += d3.max(ds.values, function (d) { return d.wc; });
                    // node.xc += d3.max(ds.values, function (d) { return d.xc; });
                    if (xi>0) {
                        node.wc += (nodeSpacingArray[node.slevel + 1] * yDistanceMul);
                    }

                })
                var nodesCByYPosition = d3.nest()
                    .key(function (node) {
                        return node.py;
                    })
                    .sortKeys(d3.ascending)
                    .entries(nodeCs);
                nodesCByYPosition.forEach(function (ds,yi) {
                    node.hc += d3.max(ds.values, function (d) { return d.hc; });
                    // node.yc += d3.max(ds.values, function (d) { return d.yc; });
                    if (yi>0) {
                        node.hc += nodeSpacingArray[node.slevel + 1];
                    }
                })
            }
        });

        nodes.sort(function(a, b) {
            return a.slevel - b.slevel;
        });
        computeLeafNodes();
        computeParentNodes();

        rootNodes.forEach(function (rNode) {
            addAncestorsToChildren(rNode);
        });
    }

    // Populate the sourceLinks and targetLinks for each node.
    function computeNodeLinks() {
        var sourceNode, targetNode;
        links.forEach(function (link) {
            sourceNode = nodeMap[link.source] || link.source;
            targetNode = nodeMap[link.target] || link.target;
            link.id = link.source + '-' + link.target;
            link.source = sourceNode;
            link.target = targetNode;
            link.state = 'NORMAL';
            sourceNode.sourceLinks.push(link);
            targetNode.targetLinks.push(link);
        });
    }

    function visible(linkCollection) {
        return linkCollection.filter(function (link) {
            return link.source.state === "collapsed" && link.target.state === "collapsed";
        });
    }

    // When child nodes are collapsed into their parents (or higher ancestors)
    // the links between the child nodes should be represented by links
    // between the containing ancestors. This function adds those extra links.
    function computeAncestorLinks() {
        // Leaf nodes are never parents of other nodes
        // Duplicate source and target links between a leaf node and another leaf node
        // and add to the leaf nodes' parents
        leafNodes.forEach(function (leafNode) {
            leafNode.sourceLinks.forEach(function (sourceLink) {
                var ancestorTargets,
                    target = sourceLink.target;
                if (leafNodes.indexOf(target) >= 0) {
                    ancestorTargets = target.ancestors.filter(function (tAncestor) {
                        return leafNode.ancestors.indexOf(tAncestor) < 0;
                    });
                    ancestorTargets.forEach(function (ancestorTarget) {
                        var ancestorLink = { source: leafNode,
                            target: ancestorTarget,
                            value: sourceLink.value,
                            id: leafNode.id + "-" + ancestorTarget.id };

                        leafNode.sourceLinks.push(ancestorLink);
                        ancestorTarget.targetLinks.push(ancestorLink);
                        links.push(ancestorLink);
                    });
                }
            });

            leafNode.targetLinks.forEach(function (targetLink) {
                var ancestorSources, source = targetLink.source;
                if (leafNodes.indexOf(source) >= 0) {
                    ancestorSources = source.ancestors.filter(function (sAncestor) {
                        return leafNode.ancestors.indexOf(sAncestor) < 0;
                    });
                    ancestorSources.forEach(function (ancestorSource) {
                        var ancestorLink = { source: ancestorSource,
                            target: leafNode,
                            value: targetLink.value,
                            id: ancestorSource.id + "-" + leafNode.id };
                        ancestorSource.sourceLinks.push(ancestorLink);
                        leafNode.targetLinks.push(ancestorLink);
                        links.push(ancestorLink);
                    });
                }
            });
        });

        // Add links between parents (for when both parents are in collapsed state)
        parentNodes.forEach(function (parentNode) {
            parentNode.sourceLinks.forEach(function (sourceLink) {
                var ancestorTargets, target = sourceLink.target;
                if (leafNodes.indexOf(target) >= 0) {
                    ancestorTargets = target.ancestors.filter(function (tAncestor) {
                        return parentNode.ancestors.indexOf(tAncestor) < 0;
                    });
                    ancestorTargets.forEach(function (ancestorTarget) {
                        var ancestorLink = { source: parentNode,
                            target: ancestorTarget,
                            value: sourceLink.value,
                            id: parentNode.id + "-" + ancestorTarget.id };

                        parentNode.sourceLinks.push(ancestorLink);
                        ancestorTarget.targetLinks.push(ancestorLink);
                        links.push(ancestorLink);
                    });
                }
            });
        });
    }

    // To reduce clutter in the diagram merge links that are from the
    // same source to the same target by creating a new link
    // with a value equal to the sum of the values of the merged links
    function mergeLinks() {
        var linkGroups = d3.nest()
            .key(function (link) { return link.source.id + "->" + link.target.id; })
            .entries(links)
            .map(function (object) { return object.values; });

        links = linkGroups.map(function (linkGroup) {
            return linkGroup.reduce(function (previousLink, currentLink) {
                return {
                    "source": previousLink.source,
                    "target": previousLink.target,
                    "id": d3.min([previousLink.id, currentLink.id]),
                    "value": parseInt(previousLink.value) + parseInt(currentLink.value)
                };
            });
        });
    }

    function nodeHeight(sideLinks) {
        var spacing = Math.max(sideLinks.length, 0) * linkSpacing,
            scaledValueSum = d3.sum(sideLinks, value) * yScaleFactor;
        return scaledValueSum + spacing;
    }

    // Compute the value of each node by summing the associated links.
    // Compute the number of spaces between the links
    // Compute the number of source links for later decrementing
    function computeNodeValues() {

        nodes.forEach(function (node) {
            node.value = Math.max(
                d3.sum(node.leftLinks, value),
                d3.sum(node.rightLinks, value)
            );
            node.netFlow = d3.sum(visible(node.targetLinks), value) - d3.sum(visible(node.sourceLinks), value);
            // node.height = Math.max(nodeHeight(visible(node.leftLinks)), nodeHeight(visible(node.rightLinks)));
            // node.height = node.cmy * nodeHeight ;
            node.linkSpaceCount = Math.max(Math.max(node.leftLinks.length, node.rightLinks.length) - 1, 0);

        });
    }

    function computeConnectedNodes() {
        var sourceNode, targetNode;
        links.forEach(function (link) {
            sourceNode = link.source;
            targetNode = link.target;
            if (sourceNode.connectedNodes.indexOf(targetNode) < 0) {
                sourceNode.connectedNodes.push(targetNode);
            }
            if (targetNode.connectedNodes.indexOf(sourceNode) < 0) {
                targetNode.connectedNodes.push(sourceNode);
            }
        });
    }

    function sourceAndTargetNodesWithSameX() {
        var nodeArray = [];
        links.filter(function (link) {
            return link.target.x === link.source.x;
        }).forEach(function (link) {
            if (nodeArray.indexOf(link.target) < 0) {
                nodeArray.push(link.target);
            }
        });
        return nodeArray;
    }

    function compressInXDirection() {
        var connectedNodesXPositions,
            nodesByXPosition = d3.nest()
                .key(function (node) {
                    return node.slevel;
                })
                .sortKeys(d3.ascending)
                .entries(nodes)
                .map(function (object) {
                    return object.values;
                });

        nodesByXPosition.forEach(function (xnodes,iii) {

            var xnodesArray =[];
            xnodesArray.push(xnodes);

            if (iii>0) {
                var nodeBySys = d3.nest()
                    .key(function (node) {
                        return node.parent.id;
                    })
                    .sortKeys(d3.ascending)
                    .entries(xnodes)
                    .map(function (object) {
                        return object.values;
                    });
                xnodesArray = nodeBySys
            }

            function xnodeConfig (xnodes) {

                xnodes.sort(function (a,b) {
                    return (a.px*1000+a.py) - (b.px*1000+b.py)
                })

                xnodes.forEach(function (node,i,j) {

                    node.width = ( node.wc * baseSize );
                    node.height = ( node.hc * baseSize );

                    var prevXnode = j.filter(function (d) { return d.px<node.px }).sort(function (a,b) { return (b.x + b.width) - (a.x + a.width) });
                    var prevYnode = j.filter(function (d) { return d.py<node.py }).sort(function (a,b) { return (b.y + b.height) - (a.y + a.height) });

                    node.x += ((prevXnode.length>0)?(prevXnode[0].x + prevXnode[0].width + nodeSpacingArray[node.slevel]*yDistanceMul*baseSize):nodeSpacing*baseSize);
                    node.y += ((prevYnode.length>0)?(prevYnode[0].y + prevYnode[0].height + nodeSpacingArray[node.slevel]*baseSize):nodeSpacing*baseSize);


                    if (node.offset) {
                        node.x += node.offset[0] * nodeSpacingArray[node.slevel];
                        node.y += node.offset[1] * nodeSpacingArray[node.slevel];
                    }

                });
            }

            xnodesArray.forEach(function (oneXnode) {
                xnodeConfig(oneXnode)
            })

        });

        nodes.forEach(function (nn,ni,allNodes) {
            if (nn.slevel != 0) {
                var pNode = allNodes.filter(function(d){return d.id ===  nn.parent.id})[0];
                nn.x += pNode.x ;
                nn.y += pNode.y ;
            }
        })
    }

    function computeNodeXPositions() {
        var remainingNodes = nodes,
            nextNodes,
            x = 0,
            addToNextNodes = function (link) {
                if (nextNodes.indexOf(link.target) < 0 && link.target.x === this.x) {
                    nextNodes.push(link.target);
                }
            },
            setValues = function (node) {
                node.x = x;
                node.width = nodeWidth;
                node.sourceLinks.forEach(addToNextNodes, node);
            };

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(setValues);
            if (nextNodes.length) {
                remainingNodes = nextNodes;
            } else {
                remainingNodes = sourceAndTargetNodesWithSameX();
            }
            x += 1;
        }

        compressInXDirection();
    }

    function computeLeftAndRightLinks() {
        var source, target;
        nodes.forEach(function (node) {
            node.rightLinks = [];
            node.leftLinks = [];
        });
        links.forEach(function (link) {
            source = link.source;
            target = link.target;
            if (source.x < target.x) {
                source.rightLinks.push(link);
                target.leftLinks.push(link);
                link.direction = 1;
            } else {
                source.leftLinks.push(link);
                target.rightLinks.push(link);
                link.direction = -1;
            }
        });
    }

    function adjustTop(adjustment) {
        nodes.forEach(function (node) {
            node.y -= adjustment;
        });
    }

    function computeNodeYPositions(iterations) {
        var minY,
            alpha,
            nodesByXPosition = d3.nest()
                .key(function (node) { return node.slevel; })
                .sortKeys(d3.ascending)
                .entries(nodes)
                .map(function (object) { return object.values; });

        function calculateYScaleFactor() {
            var linkSpacesCount, nodeValueSum, discretionaryY;
            yScaleFactor = d3.min(nodesByXPosition, function (nodes) {
                linkSpacesCount = d3.sum(nodes, function (node) {
                    return node.linkSpaceCount;
                });
                nodeValueSum = d3.sum(nodes, function (node) {
                    return node.value;
                });
                discretionaryY = (size[1]
                - (nodes.length - 1) * nodeSpacing
                - linkSpacesCount * linkSpacing);

                return  discretionaryY / nodeValueSum;
            });

            // Fat links are those with lengths less than about 4 times their heights
            // Fat links don't bend well
            // Test that yScaleFactor is not so big that it causes "fat" links; adjust yScaleFactor accordingly
            links.forEach(function (link) {
                var linkLength = Math.abs(link.source.x - link.target.x),
                    linkHeight = link.value * yScaleFactor;
                if (linkLength / linkHeight < 4) {
                    yScaleFactor = 0.25 * linkLength / link.value;
                }
            });
        }

        function initializeNodeYPosition() {
            nodesByXPosition.forEach(function (nodes) {
                nodes.forEach(function (node, i) {
                    // node.y = i;
                    // node.heightAllowance = node.value * yScaleFactor + linkSpacing * node.linkSpaceCount;
                    node.heightAllowance = node.cmy * yScaleFactor + linkSpacing * node.linkSpaceCount;
                });
            });
        }

        function calculateLinkThickness() {
            links.forEach(function (link) {
                var avgh1  = link.value * yScaleFactor;
                var avgh2 = link.source.height*0.6/link.source.rightLinks.length;
                var avgh3 = link.target.height*0.6/link.target.leftLinks.length;
                link.thickness = d3.min([avgh1,d3.min([avgh2,avgh3])])
            });
        }

        calculateYScaleFactor();
        initializeNodeYPosition();
        calculateLinkThickness();

        minY = d3.min(nodes, function (node) { return node.y; });
        adjustTop(minY);
    }

    function computeLinkYPositions() {

        function ascendingLeftNodeYPosition(a, b) {
            var aLeftNode = (a.direction > 0) ? a.source : a.target,
                bLeftNode = (b.direction > 0) ? b.source : b.target;
            return aLeftNode.y - bLeftNode.y;
        }

        function ascendingRightNodeYPosition(a, b) {
            var aRightNode = (a.direction > 0) ? a.target : a.source,
                bRightNode = (b.direction > 0) ? b.target : b.source;
            return aRightNode.y - bRightNode.y;
        }

        nodes.forEach(function (node) {
            node.rightLinks.sort(ascendingRightNodeYPosition);
            node.leftLinks.sort(ascendingLeftNodeYPosition);
        });

        nodes.forEach(function (node) {
            var rightY = 0, leftY = 0;

            node.rightLinks.forEach(function (link) {

                if (link.direction > 0) {
                    if (link.target.state === "collapsed") {
                        rightY += link.thickness + (link.source.height*0.3/link.source.rightLinks.length);
                    }
                    link.sourceY = rightY;
                }
                else {
                    if (link.source.state === "collapsed") {
                        rightY += link.thickness + (link.target.height*0.3/link.target.rightLinks.length);
                    }
                    link.sourceY = rightY;
                }
            });

            node.leftLinks.forEach(function (link) {
                if (link.direction < 0) {

                    if (link.target.state === "collapsed") {
                        leftY += link.thickness + linkSpacing;
                    }
                    link.sourceY = leftY;
                }
                else {
                    if (link.source.state === "collapsed") {
                        leftY += link.thickness + (link.target.height*0.3/link.target.leftLinks.length);
                    }
                    link.targetY = leftY;
                }
            });

            var corRightY = (node.height - (node.rightLinks[0]?(node.rightLinks[0].sourceY + node.rightLinks[node.rightLinks.length-1].thickness):0) - rightY) / 2 ;
            var corLeftY = (node.height - (node.leftLinks[0]?(node.leftLinks[0].targetY + node.leftLinks[node.leftLinks.length-1].thickness):0) - leftY) / 2 ;

            node.rightLinks.forEach(function (link) {
                if (link.direction > 0) {
                    if (link.target.state === "collapsed") {
                        link.sourceY += corRightY;
                    }
                } else {
                    link.targetY += corRightY;
                }
            });
            node.leftLinks.forEach(function (link) {
                if (link.direction < 0) {
                    if (link.target.state === "collapsed") {
                        link.sourceY += corLeftY;
                    }
                } else {
                    link.targetY += corLeftY;
                }
            });

        });
    }

    biHiSankey.arrowheadScaleFactor = function (_) {
        if (!arguments.length) { return arrowheadScaleFactor; }
        arrowheadScaleFactor = +_;
        return biHiSankey;
    };

    biHiSankey.collapsedNodes = function () {
        return nodes.filter(function (node) { return node.state === "collapsed"; });
    };

    biHiSankey.expandedNodes = function () {
        return nodes.filter(function (node) { return node.state === "expanded"; });
    };

    biHiSankey.connected = function (nodeA, nodeB) {
        return nodeA.connectedNodes.indexOf(nodeB) >= 0;
    };

    biHiSankey.showListNodes = function () {
        return nodes.filter(function (node) {
            return node.state === "collapsed" || node.state === "expanded";
        }) .sort(function (a,b) {
            // if (a.slevel==0 && b.slevel == 0) { return (a.px*1000+a.py) - (b.px*1000+b.py) }
            // return  (b.px*1000+b.py) - (a.px*1000+a.py)

            return (a.slevel*10000 + (a.px+1)*1000 + a.py) - (b.slevel*10000 + (b.px+1)*1000 + b.py)
        });
    };

    biHiSankey.layout = function (iterations) {
        computeNodeXPositions();
        computeLeftAndRightLinks();
        computeNodeValues();
        computeNodeYPositions(iterations);
        computeNodeValues();
        computeLinkYPositions();
        return biHiSankey;
    };

    biHiSankey.link = function () {
        var curvature = defaultLinkCurvature;

        function leftToRightLink(link) {
            var arrowHeadLength = link.thickness * arrowheadScaleFactor,
                straightSectionLength = (3 * link.thickness / 4) - arrowHeadLength,
                x0 = link.source.x + link.source.width,
                x1 = x0 + arrowHeadLength / 2,
                x4 = link.target.x - straightSectionLength,
                xi = d3.interpolateNumber(x0, x4),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = link.source.y + link.sourceY + link.thickness / 2,
                y1 = link.target.y + link.targetY + link.thickness / 2;
            return "M" + x0 + "," + y0
                // + "L" + x1 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x4 + "," + y1
                + "L" + (x4 + straightSectionLength) + "," + y1;

        }

        function rightToLeftLink(link) {
            var arrowHeadLength = link.thickness * arrowheadScaleFactor,
                straightSectionLength = link.thickness / 4,
                x0 = link.source.x,
                x1 = x0 - arrowHeadLength / 2,
                x4 = link.target.x + link.target.width + straightSectionLength + arrowHeadLength,
                xi = d3.interpolateNumber(x0, x4),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = link.source.y + link.sourceY + link.thickness / 2,
                y1 = link.target.y + link.targetY + link.thickness / 2;
            return "M" + x0 + "," + y0
                + "L" + x1 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x4 + "," + y1
                + "L" + (x4 - straightSectionLength) + "," + y1;
        }

        function link(d) {
            if (d.source.x < d.target.x) {
                return leftToRightLink(d);
            }
            return rightToLeftLink(d);
        }

        link.curvature = function (_) {
            if (!arguments.length) { return curvature; }
            curvature = +_;
            return link;
        };

        return link;
    };

    biHiSankey.links = function (_) {
        if (!arguments.length) { return links; }
        links = _.filter(function (link) {
            return link.source !== link.target; // filter out links that go nowhere
        });
        return biHiSankey;
    };

    biHiSankey.linkSpacing = function (_) {
        if (!arguments.length) { return linkSpacing; }
        linkSpacing = +_;
        return biHiSankey;
    };

    biHiSankey.nodes = function (_) {
        if (!arguments.length) { return nodes; }
        nodes = _;
        return biHiSankey;
    };

    biHiSankey.nodeWidth = function (_) {
        if (!arguments.length) { return nodeWidth; }
        nodeWidth = +_;
        return biHiSankey;
    };

    biHiSankey.nodeHeight = function (_) {
        if (!arguments.length) { return nodeHeight; }
        nodeHeight = +_;
        return biHiSankey;
    };

    biHiSankey.nodeSpacing = function (_) {
        if (!arguments.length) { return nodeSpacing; }
        nodeSpacing = +_;
        return biHiSankey;
    };

    biHiSankey.nodeSpacingArray = function (_) {
        if (!arguments.length) { return nodeSpacingArray; }
        nodeSpacingArray = _;
        return biHiSankey;
    };

    biHiSankey.yDistanceMul = function (_) {
        if (!arguments.length) { return yDistanceMul; }
        yDistanceMul = +_;
        return biHiSankey;
    };


    biHiSankey.relayout = function () {
        computeLeftAndRightLinks();
        computeNodeValues();
        computeLinkYPositions();
        return biHiSankey;
    };

    biHiSankey.size = function (_) {
        if (!arguments.length) { return size; }
        size = _;
        return biHiSankey;
    };

    biHiSankey.visibleLinks = function () {
        return visible(links);
    };

    biHiSankey.initializeNodes = function (callback) {
        // console.log('callback======'+callback)
        initializeNodeMap();
        computeNodeHierarchy();
        computeNodeLinks();
        computeAncestorLinks();
        mergeLinks();
        computeConnectedNodes();
        nodes.forEach(callback);
        return biHiSankey;
    };

    return biHiSankey;
};
