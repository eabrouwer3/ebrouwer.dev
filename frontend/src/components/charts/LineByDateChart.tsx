import * as React from "react";
import {useEffect, useRef} from "react";
import { extent, scaleTime, select, scaleLinear, min, max, curveMonotoneX, line } from "d3";

interface Data {
    date: Date,
    value: number
}

interface Props {
    data: Data[]
}

const LineByDateChart: React.FC<Props> = ({data}) => {
    const node = useRef(null);
    const {current: chart} = node;
    const width = 1000, height = 400;
    const margin = {top: 20, right: 15, bottom: 25, left: 25};

    useEffect(() => {
        if (chart) {
            const lineChart = select(chart)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            const x = scaleTime().range([0, width]);
            x.domain(extent(data, (d) => d.date ) as [Date, Date]);

            const y = scaleLinear().range([height, 0]);
            y.domain([min(data, d => d.value) as number - 5, max(data, d => d.value) as number + 5]);

            const valueline = line()
                // @ts-ignore
                .x(d => x(d.date))
                // @ts-ignore
                .y(d => y(d.value))
                .curve(curveMonotoneX);

            lineChart.append("path")
                .data([data])
                .attr("class", "line")
                // @ts-ignore
                .attr("d", valueline);
        }
    }, [data, chart]);

    return <svg width={width} height={height} ref={node}/>;
};

export default LineByDateChart;