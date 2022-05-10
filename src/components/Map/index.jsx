import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import G6 from '@antv/g6';
import './style.less';
import { isEmpty } from 'lodash';

const formatData = (data) => {
  const { nodeList = [], linkList = [], serviceList = [] } = data || {};

  const nodeData = nodeList.map((item) => {
    const { id, name } = item;
    return {
      id: `node${id}`,
      name,
    };
  });
  const linkData = linkList.map((item) => {
    const { id, source, target } = item;
    return {
      id: `link${id}`,
      source: `node${source}`,
      target: `node${target}`,
    };
  });
  const serviceData = serviceList.map((item) => {
    const { id, source, target } = item;
    return {
      id: `service${id}`,
      source: `node${source}`,
      target: `node${target}`,
    };
  });

  return [nodeData, linkData, serviceData];
};

const Map = (props) => {
  const { dataSource, itemSelection } = props;

  const containerRef = useRef();
  const graphRef = useRef();

  useEffect(() => {
    const refreshDragedNodePosition = (e) => {
      const model = e.item.get('model');
      model.fx = e.x;
      model.fy = e.y;
      model.x = e.x;
      model.y = e.y;
    };

    const container = containerRef.current;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const lineDash = [4, 2, 1, 2];

    G6.registerEdge(
      'line-dash',
      {
        afterDraw(cfg, group) {
          // get the first shape in the group, it is the edge's path here=
          const shape = group.get('children')[0];
          let index = 0;
          // Define the animation
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // returns the modified configurations here, lineDash and lineDashOffset here
              return res;
            },
            {
              repeat: true, // whether executes the animation repeatly
              duration: 3000, // the duration for executing once
            },
          );
        },
      },
      'cubic', // extend the built-in edge 'cubic'
    );

    const graph = new G6.Graph({
      container,
      width,
      height,
      fitView: true,
      layout: {
        type: 'forceAtlas2',
        preventOverlap: true,
        kr: 10,
        center: [250, 250],
      },
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      },
      defaultNode: {
        size: 10,
      },
    });
    graphRef.current = graph;

    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };

    graph.render();
  }, []);

  useEffect(() => {
    const graph = graphRef.current;
    const [nodeList, linkList, serviceList] = formatData(dataSource);

    if (!isEmpty(nodeList)) {
      const data = {
        nodes: nodeList.map((node) => ({
          ...node,
          label: node.name,
          size: 15,
          labelCfg: {
            position: 'center',
            style: { fontFamily: '微软雅黑', fontSize: 8 },
          },
        })),
        edges: [
          ...linkList.map((link) => ({ ...link })),
          ...serviceList.map((service) => ({ ...service, type: 'line-dash' })),
        ],
      };

      graph.data(data);

      graph.render();
    }
  }, [dataSource]);

  useEffect(() => {
    if (!itemSelection) return;

    const graph = graphRef.current;

    const clearStates = () => {
      graph.getNodes().forEach((node) => {
        graph.clearItemStates(node);
      });
      graph.getEdges().forEach((edge) => {
        graph.clearItemStates(edge);
      });
    };

    const updateSelectionStates = (selection, type = '') => {
      if (selection) {
        const { selectedItemKeys = [] } = selection || {};
        const itemList = type === 'node' ? graph.getNodes() : graph.getEdges();
        const pathMap = {};

        selectedItemKeys.forEach((id) => {
          const itemId = `${type}${id}`;
          const pathItem = graph.findById(itemId);
          pathItem.toFront();
          graph.setItemState(pathItem, 'highlight', true);
          pathMap[itemId] = true;
        });

        itemList.forEach((item) => {
          if (!pathMap[item.getID()] && !item.hasState('highlight')) {
            graph.setItemState(item, 'inactive', true);
          }
        });
      }
    };

    const { nodeSelection, linkSelection, serviceSelection } =
      itemSelection || {};

    if (
      isEmpty(nodeSelection.selectedItemKeys) &&
      isEmpty(linkSelection.selectedItemKeys)
    ) {
      clearStates();
    } else {
      clearStates();
      updateSelectionStates(nodeSelection, 'node');
      updateSelectionStates(linkSelection, 'link');
      updateSelectionStates(serviceSelection, 'service');
    }
  }, [itemSelection]);

  return (
    <Card
      className="map"
      size="small"
      style={{ height: '100%', display: 'flex' }}
      bodyStyle={{ padding: 0, flex: 1 }}
    >
      <div id="container" ref={containerRef}></div>
    </Card>
  );
};

export default Map;
