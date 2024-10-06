import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

interface ChartComponentProps {
    data: { time: string; value: number }[];
    colors?: {
        backgroundColor?: string;
        lineColor?: string;
        textColor?: string;
        areaTopColor?: string;
        areaBottomColor?: string;
    };
}

const ChartComponent: React.FC<ChartComponentProps> = ({
    data,
    colors: {
        backgroundColor = 'black',
        lineColor = '#2962FF',
        textColor = 'black',
        areaTopColor = '#2962FF',
        areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
}) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<any>(null); // Store chart instance

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
        chart.timeScale().fitContent();
        
        const series = chart.addAreaSeries({
            lineColor,
            topColor: areaTopColor,
            bottomColor: areaBottomColor,
        });
        series.setData(data);
        chartInstance.current = chart;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ChartComponent;