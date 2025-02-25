import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useDispatch, useSelector} from "react-redux";

import {RawMaterial} from "../model/RawMaterial.ts";
import {RootState} from "../store/store.tsx";

interface MaterialProcessChartProps {
    isModel : string
}

function MaterialProcessChart({isModel}:MaterialProcessChartProps) {

    const rawMaterials: RawMaterial[] = useSelector((state: RootState) => state.rawMaterial);


    // Group crops by category and calculate counts
    const cropCategoryData = rawMaterials.reduce<{ [key: string]: number }>((acc, material) => {
        acc[material.quantityInKg] = (acc[material.quantityInKg] || 0) + 10;
        return acc;
    }, {});

    // Convert grouped data to the Highcharts series format
    const chartData = Object.entries(cropCategoryData).map(([category, count]) => ({
        name: category,
        y: count,

    }));

    const options = {
        chart: {
            type: isModel,
            style: {
                fontFamily: "Poppins", // Set global font family
                backgroundColor: "#347486", // Set global background color
            },
        },
        title: {
            text: ' Stock Raw Material',
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily: "Poppins", // Set font for data labels
                        fontSize: "10px",
                    },
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "Raw Material",
                colorByPoint: true,
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default MaterialProcessChart;
