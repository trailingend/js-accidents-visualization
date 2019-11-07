import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import {occu_data, test_data} from "./data_radar";

class Occurances {
    constructor() {
        this.container = am4core.create("occu-chart-ctnr", am4core.Container);
        this.container.width = am4core.percent(100);
        this.container.height = am4core.percent(100);

        this.radarChart = undefined;
        // am4core.useTheme(am4themes_animated);
    }

    init(winW, winH) {
        this.initRadarChart();
    }

    initRadarChart() {
        this.radarChart = this.container.createChild(am4charts.RadarChart);
        this.radarChart.data = occu_data[0].occurances;
        let xAxis = this.radarChart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = "date";
        xAxis.renderer.maxLabelPosition = 0.99;
        xAxis.renderer.line.disabled = true;
        xAxis.renderer.labels.template.fillOpacity = 0.4;
        xAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        xAxis.renderer.minLabelPosition = 0;
        xAxis.renderer.minGridDistance = 30;
        xAxis.renderer.grid.template.location = 0;
        xAxis.renderer.cellStartLocation = 0.0;
        xAxis.renderer.cellEndLocation = 0.01;
        xAxis.renderer.grid.template.stroke = am4core.color("#ffffff");
        xAxis.tooltip.background.pointerLength = 4;
        xAxis.tooltip.background.fill = am4core.color("#666666");
        xAxis.tooltip.background.stroke = xAxis.tooltip.background.fill;

        let yAxis = this.radarChart.yAxes.push(new am4charts.ValueAxis());
        yAxis.renderer.labels.template.verticalCenter = "bottom";
        yAxis.renderer.labels.template.horizontalCenter = "right";
        yAxis.renderer.maxLabelPosition = 0.99;
        yAxis.min = 0;
        yAxis.max = 500;
        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.line.disabled = true;
        yAxis.tooltip.disabled = true;
        yAxis.strictMinMax = true;
        yAxis.renderer.labels.template.fillOpacity = 0;
        yAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        yAxis.renderer.grid.template.stroke = am4core.color("#ffffff");
        yAxis.renderer.inside = true;


        let barSeries = this.radarChart.series.push(new am4charts.RadarColumnSeries());
        barSeries.data = occu_data[0].occurances;
        barSeries.dataFields.categoryX = "date";
        barSeries.dataFields.valueY = "dist";
        barSeries.name = "Distance";
        barSeries.strokeWidth = 0;
        barSeries.columns.template.width = am4core.percent(100);
        barSeries.columns.template.fill = am4core.color("#BB8FCE");


        let injuSeries = this.radarChart.series.push(new am4charts.RadarSeries());
        injuSeries.data = occu_data[0].occurances;
        injuSeries.dataFields.categoryX = "date";
        injuSeries.dataFields.valueY = "dist";
        injuSeries.dataFields.value = "inju";
        injuSeries.name = "Injuries";
        injuSeries.strokeOpacity = 0;
        injuSeries.sequencedInterpolation = true;
        injuSeries.sequencedInterpolationDelay = 10;
        // injuSeries.tooltipText = "Injuries: {value}";
        let injuBullets = injuSeries.bullets.push(new am4charts.CircleBullet());
        injuBullets.circle.fill = am4core.color("#FFC300");
        injuBullets.circle.fillOpacity = 0.2;
        injuBullets.circle.stroke = am4core.color("#FFC300");
        injuBullets.circle.propertyFields.radius = "inju";

        var fataSeries = this.radarChart.series.push(new am4charts.RadarSeries());
        fataSeries.data = occu_data[0].occurances;
        fataSeries.dataFields.categoryX = "date";
        fataSeries.dataFields.valueY = "dist";
        fataSeries.dataFields.value = "fata";
        fataSeries.name = "Distance";
        fataSeries.strokeOpacity = 0;
        fataSeries.sequencedInterpolation = true;
        fataSeries.sequencedInterpolationDelay = 10;
        fataSeries.tooltipText = "Fatality: {value}";
        fataSeries.tooltipText = `[bold]Distance {dist}[/]
                                ----
                                Fatalities: {fata}
                                Injuries: {inju}`;
        fataSeries.tooltip.pointerOrientation = "vertical";
        let fataBullets = fataSeries.bullets.push(new am4charts.CircleBullet());
        fataBullets.circle.fill = am4core.color("#FF5733");
        fataBullets.circle.fillOpacity = 0.2;
        fataBullets.circle.stroke = am4core.color("#FF5733");
        // fataSeries.heatRules.push({
        //     target: bullets.circle,
        //     min: 0.5,
        //     max: 8,
        //     property: "radius"
        // });
        fataBullets.circle.propertyFields.radius = "fata";

        this.radarChart.cursor = new am4charts.RadarCursor();
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