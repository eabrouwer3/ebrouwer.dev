import * as React from "react";
import {useEffect, useRef} from "react";
import { select} from "d3";

const PlayChart: React.FC = () => {
    const node = useRef(null);
    const {current: chart} = node;
    const width = 400, height = 400;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};

    useEffect(() => {
        if (chart) {
            const fruits = [
                {name: "🍊", count: 21},
                {name: "🍇", count: 13},
                {name: "🍏", count: 8},
                {name: "🍌", count: 5},
                {name: "🍐", count: 3},
                {name: "🍋", count: 2},
                {name: "🍎", count: 1},
                {name: "🍉", count: 1}
            ]

            const svg = select(chart)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.selectAll('g')
                .data(fruits)
                .enter()
                .append('rect')
                .text(d => `${d.name}: ${d.count}`);
        }
    }, [chart]);

    return (
        <div  ref={node}/>
    );
};

export default PlayChart;