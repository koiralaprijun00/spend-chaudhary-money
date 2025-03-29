import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface FamilyTreeProps {
  data: any; // Replace 'any' with a more specific type if you know the structure of 'data'
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ data }) => {
  useEffect(() => {
    const width = 800;
    const height = 600;
    const svg = d3.select('svg')
                  .attr('width', width)
                  .attr('height', height);

    const treeLayout = d3.tree().size([width, height - 200]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    svg.selectAll('.link')
       .data(root.links())
       .enter()
       .append('line')
       .attr('class', 'link')
       .attr('x1', (d) => d.source.x ?? 0)
       .attr('y1', (d) => d.source.y ?? 0)
       .attr('x2', (d) => d.target.x ?? 0)
       .attr('y2', (d) => d.target.y ?? 0);

    svg.selectAll('.node')
       .data(root.descendants())
       .enter()
       .append('circle')
       .attr('class', 'node')
       .attr('cx', (d) => d.x ?? 0)
       .attr('cy', (d) => d.y ?? 0)
       .attr('r', 10);
  }, [data]);

  return <svg className="mx-auto mt-4"></svg>;
};

export default FamilyTree;
