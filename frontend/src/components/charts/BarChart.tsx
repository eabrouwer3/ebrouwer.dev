import * as React from 'react';
import {select} from 'd3-selection';
import {useEffect, useRef} from "react";
import * as R from 'ramda';

interface Props {
    data: {
        label?: string,
        value: number
    }[]
}

const BarChart: React.FC<Props> = ({data}) => {
    const node = useRef(null);
    const {current: chart} = node;
    const width = 1000,
          scaleFactor = (width - 100) / data.map(R.prop('value')).reduce((a, b) => Math.max(a, b), 0),
          barHeight = 30;

    useEffect(() => {
        if (chart) {
            const bar = select(chart)
                .selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);
            bar.append('rect')
                .attr('width', ({value}) => value * scaleFactor)
                .attr('height', barHeight - 1);
            bar.append('text')
                .attr('x', ({value}) => value * scaleFactor)
                .attr('y', barHeight / 2)
                .attr('dy', '.35em')
                .text(({label, value}) => label || value);
        }
    }, [data, chart]);

    return <svg width={width} height={barHeight * data.length} ref={node}/>;
};

export default BarChart;

// chart = {
//     const svg = d3.create("svg")
//         .attr("viewBox", [0, 0, width, height]);
//
//     const bar = svg.append("g")
//         .attr("fill", "steelblue")
//         .selectAll("rect")
//         .data(data)
//         .join("rect")
//         .style("mix-blend-mode", "multiply")
//         .attr("x", d => x(d.name))
//         .attr("y", d => y(d.value))
//         .attr("height", d => y(0) - y(d.value))
//         .attr("width", x.bandwidth());
//
//     const gx = svg.append("g")
//         .call(xAxis);
//
//     const gy = svg.append("g")
//         .call(yAxis);
//
//     return Object.assign(svg.node(), {
//         update(order) {
//             x.domain(data.sort(order).map(d => d.name));
//
//             const t = svg.transition()
//                 .duration(750);
//
//             bar.data(data, d => d.name)
//                 .order()
//                 .transition(t)
//                 .delay((d, i) => i * 20)
//                 .attr("x", d => x(d.name));
//
//             gx.transition(t)
//                 .call(xAxis)
//                 .selectAll(".tick")
//                 .delay((d, i) => i * 20);
//         }
//     });
// }