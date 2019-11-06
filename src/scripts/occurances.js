import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import {occu_data, test_data} from "./data_radar";

class Occurances {
    constructor() {
        this.container = am4core.create("occu-chart-ctnr", am4core.Container);
        this.container.width = am4core.percent(100);
        this.container.height = am4core.percent(100);

        this.radarChart = undefined;
    }

    init(winW, winH) {
        this.initLineChart();
    }

    initLineChart() {
        this.radarChart = this.container.createChild(am4charts.RadarChart);

        var xAxis = this.radarChart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = "date";
        xAxis.renderer.maxLabelPosition = 0.99;

        var yAxis = this.radarChart.yAxes.push(new am4charts.ValueAxis());
        yAxis.renderer.labels.template.verticalCenter = "bottom";
        yAxis.renderer.labels.template.horizontalCenter = "right";
        yAxis.renderer.maxLabelPosition = 0.99;

        var fataSeries = this.radarChart.series.push(new am4charts.RadarSeries());
        fataSeries.data = occu_data[0].occurances;
        fataSeries.dataFields.categoryX = "date";
        fataSeries.dataFields.valueY = "dist";
        fataSeries.name = "Fatalities";
        let bullets = fataSeries.bullets.push(new am4charts.CircleBullet());
        bullets.circle.fill = am4core.color("#BB8FCE");
        bullets.circle.stroke = am4core.color("#BB8FCE");
        fataSeries.sequencedInterpolation = true;
        fataSeries.sequencedInterpolationDelay = 10;
    }

    update() {
    }

    resize(winW, winH) {

    }

    obDesktopToMobile() {

    }

    onMobileToDesktop() {

    }
}

export default Occurances;