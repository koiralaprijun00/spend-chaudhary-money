'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface FamilyMember {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  living: boolean;
  parentId?: string;
  spouseId?: string;
  imageUrl?: string;
  children?: FamilyMember[];
}

interface HierarchyNode extends d3.HierarchyNode<FamilyMember> {
  x: number;
  y: number;
}

interface FamilyTreeProps {
  data: FamilyMember;
  width?: number;
  height?: number;
}

const FamilyTreeVisualization: React.FC<FamilyTreeProps> = ({ 
  data, 
  width = 1000, 
  height = 600 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, 50)`);

    // Create a hierarchical layout
    const root = d3.hierarchy(data) as HierarchyNode;

    // Use tree layout
    const treeLayout = d3.tree<FamilyMember>()
      .nodeSize([120, 100])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 1.4));

    treeLayout(root);

    // Add links between nodes
    const links = svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d => {
        return `M${d.source.x},${d.source.y}
                C${d.source.x},${((d.source.y ?? 0) + (d.target.y ?? 0)) / 2}
                 ${d.target.x},${((d.source.y ?? 0) + (d.target.y ?? 0)) / 2}
                 ${d.target.x},${d.target.y}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    // Create node groups
    const nodes = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        // Dispatch event for node click
        const customEvent = new CustomEvent("nodeClick", { 
          detail: { member: d.data } 
        });
        window.dispatchEvent(customEvent);
      });

    // Add node boxes with different colors based on gender
    nodes.append("rect")
      .attr("width", 100)
      .attr("height", 60)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("x", -50)
      .attr("y", -30)
      .attr("fill", d => d.data.gender === "Male" ? "#ADD8E6" : "#FFCCCB")
      .attr("stroke", d => d.data.living ? "#228B22" : "#A9A9A9")
      .attr("stroke-width", 2);

    // Add person names
    nodes.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -10)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(d => d.data.name);

    // Add birth dates
    nodes.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 10)
      .attr("font-size", "10px")
      .text(d => {
        const birthYear = new Date(d.data.birthDate).getFullYear();
        return `b. ${birthYear}`;
      });

    // Add zoom capabilities
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
      });

    d3.select(svgRef.current)
      .call(zoom as any)
      .call(zoom.transform as any, d3.zoomIdentity.translate(width / 2, 50).scale(0.8));

  }, [data, width, height]);

  return (
    <div className="family-tree-container">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default FamilyTreeVisualization;