import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import {occu_data, categories} from "./data_radar";

am4core.useTheme(am4themes_animated);

class Detail {
    constructor() {
        this.container = am4core.create("occu-chart-ctnr", am4core.Container);
        this.container.width = am4core.percent(100);
        this.container.height = am4core.percent(100);

        this.radarChart = undefined;   
        this.radarColumn = undefined;
        this.reasonAxis = undefined;
        this.colorSet = new am4core.ColorSet();
        // this.colorSet.list = ["#388E3C", "#FBC02D", "#0288d1", "#F44336", "#8E24AA"].map((color) => {
        //     return new am4core.color(color);
        // });

    }

    init(winW, winH) {
        this.initRadarChart();
    }

    initRadarChart() {
        this.radarChart = this.container.createChild(am4charts.RadarChart);
        this.radarChart.startAngle = 90 - 180;
        this.radarChart.endAngle = 90 + 180;
        this.radarChart.padding(5,15,5,10)
        this.radarChart.radius = am4core.percent(65);
        this.radarChart.innerRadius = am4core.percent(40);

        var yearLabel = this.radarChart.radarContainer.createChild(am4core.Label);
        yearLabel.horizontalCenter = "middle";
        yearLabel.verticalCenter = "middle";
        yearLabel.fill = am4core.color("#673AB7");
        yearLabel.fontSize = 30;
        yearLabel.text = String("yo");
       
        // category axis
        this.reasonAxis = this.radarChart.xAxes.push(new am4charts.CategoryAxis());
        this.reasonAxis.renderer.grid.template.location = 0;
        this.reasonAxis.dataFields.category = "reason";

        var reasonAxisRenderer = this.reasonAxis.renderer;
        var reasonAxisLabel = reasonAxisRenderer.labels.template;
        reasonAxisLabel.location = 0.5;
        reasonAxisLabel.radius = 28;
        reasonAxisLabel.relativeRotation = 90;

        reasonAxisRenderer.fontSize = 11;
        reasonAxisRenderer.minGridDistance = 10;
        reasonAxisRenderer.grid.template.radius = -25;
        reasonAxisRenderer.grid.template.strokeOpacity = 0.05;
        reasonAxisRenderer.grid.template.interactionsEnabled = false;

        reasonAxisRenderer.ticks.template.disabled = true;
        reasonAxisRenderer.axisFills.template.disabled = true;
        reasonAxisRenderer.line.disabled = true;
        reasonAxisRenderer.tooltipLocation = 0.5;
        reasonAxisRenderer.labels.template.fill = am4core.color("#ffffff");
        reasonAxisRenderer.grid.template.stroke = am4core.color("#ffffff");
        this.reasonAxis.tooltip.defaultState.properties.opacity = 0;

        // value axis
        var valueAxis = this.radarChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 8;
        valueAxis.strictMinMax = true;
        valueAxis.tooltip.defaultState.properties.opacity = 0;
        valueAxis.tooltip.animationDuration = 0;
        valueAxis.cursorTooltipEnabled = true;
        valueAxis.zIndex = 10;

        var valueAxisRenderer = valueAxis.renderer;
        valueAxisRenderer.axisFills.template.disabled = true;
        valueAxisRenderer.ticks.template.disabled = true;
        valueAxisRenderer.minGridDistance = 20;
        valueAxisRenderer.grid.template.strokeOpacity = 0.2;
        valueAxisRenderer.labels.template.fill = am4core.color("#ffffff");
        valueAxisRenderer.grid.template.stroke = am4core.color("#ffffff");

        // series
        // this.radarColumn = this.radarChart.series.push(new am4charts.RadarColumnSeries());
        // this.radarColumn.columns.template.width = am4core.percent(90);
        // this.radarColumn.columns.template.strokeOpacity = 0;
        // this.radarColumn.dataFields.valueY = "count";
        // this.radarColumn.dataFields.categoryX = "reason";
        // this.radarColumn.tooltipText = "{categoryX}:{valueY.value}";

        let dataSeries = this.radarChart.series.push(new am4charts.RadarSeries());
        dataSeries.dataFields.categoryX = "reason";
        dataSeries.dataFields.valueY = "count";
        // dataSeries.dataFields.value = "inju";
        dataSeries.name = "Injuries";
        dataSeries.strokeOpacity = 0;
        dataSeries.sequencedInterpolation = true;
        dataSeries.sequencedInterpolationDelay = 10;
        let dataBullets = dataSeries.bullets.push(new am4charts.CircleBullet());
        dataBullets.circle.fill = am4core.color("#FFC300");
        dataBullets.circle.fillOpacity = 0.5;
        dataBullets.circle.stroke = am4core.color("#FFC300");
        dataBullets.circle.propertyFields.radius = 4;
        dataBullets.horizontalCenter = "middle";
        dataBullets.verticalCenter = "middle";

        // this makes columns to be of a different color, depending on value
        // this.radarColumn.heatRules.push({ 
        //     target: this.radarColumn.columns.template, 
        //     property: "fill", 
        //     minValue: -3, 
        //     maxValue: 6, 
        //     min: am4core.color("#673AB7"), 
        //     max: am4core.color("#F44336"), 
        //     dataField: "valueY" 
        // });

        // cursor
        var cursor = new am4charts.RadarCursor();
        this.radarChart.cursor = cursor;
        cursor.behavior = "zoomX";

        cursor.xAxis = this.reasonAxis;
        cursor.innerRadius = am4core.percent(40);
        cursor.lineY.disabled = true;

        cursor.lineX.fillOpacity = 0.2;
        cursor.lineX.fill = am4core.color("#ffffff");
        cursor.lineX.strokeOpacity = 0;
        cursor.fullWidthLineX = true;

        this.radarChart.data = this.generateRadarData("YVR", "YYZ", 1999, "13", "Boeing", "Air Canada");
    }

    generateRadarData(depa, dest, year, time, manufacturer, organizer) {
        const target_data = occu_data.filter((record) => {
            const checkDepa = record["depa"] === depa;
            const checkDest = record["dest"] === dest;
            const checkYear = record["year"] == year;
            const checkTime = record["time"] == time;
            const checkManu = record["manu"] === manufacturer;
            const checkOrga = record["orga"] === organizer;
            return (checkDepa && checkDest && checkYear && checkTime && checkManu && checkOrga);
        });

        var data = [];
        var i = 0;
        var first_reason = undefined;
        var last_reason = undefined;
        categories.forEach((category) => {
            const cate_name = category.name;
            category.chil.forEach((reas_name)=> {    
                first_reason = (first_reason === undefined) ? reas_name : first_reason;
                last_reason = reas_name;            
                const reasoned_data = target_data.filter((record)=>record["reas"] === reas_name);
                // const reasoned_count = reasoned_data.length;
                if (reasoned_data.length === 0) {
                    data.push({
                        "reason": reas_name,
                        "count": null,
                        "summary": null
                    });
                } else {
                    reasoned_data.forEach((point, index)=> {
                        data.push({
                            "reason": reas_name,
                            "count": index + 1,
                            "summary": point
                        });
                    });
                }
            });

            this.createRange(cate_name, first_reason, last_reason, i);
            this.createRange2(cate_name, first_reason, last_reason, i);

            first_reason = undefined;
            last_reason = undefined;
            i++;
        })
        return data;
    }

    createRange(name, first_reason, last_reason, index) {
        var axisRange = this.reasonAxis.axisRanges.create();
        axisRange.axisFill.interactionsEnabled = true;
        axisRange.text = name;
        axisRange.category = first_reason;
        axisRange.endCategory = last_reason;
        // every 3rd color for a bigger contrast
        axisRange.axisFill.fill = this.colorSet.getIndex(index * 3);
        axisRange.grid.disabled = true;
        axisRange.label.interactionsEnabled = false;
        axisRange.label.bent = true;
        axisRange.label.location = 0.5;
        axisRange.label.fill = am4core.color("#ffffff");
        axisRange.label.radius = 3;
        axisRange.label.relativeRotation = 0;
    
        var axisFill = axisRange.axisFill;
        axisFill.innerRadius = -0.01; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
        axisFill.radius = -20; // negative radius means it is calculated from max radius
        axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
        axisFill.fillOpacity = 1;
        axisFill.togglable = true;
    
        axisFill.showSystemTooltip = true;
        axisFill.readerTitle = "click to zoom";
        axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    
        axisFill.events.on("hit", (event) => {
            var dataItem = event.target.dataItem;
            if (!event.target.isActive) {
                this.reasonAxis.zoom({ start: 0, end: 1 });
            } else {
                this.reasonAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
            }
        })
    
        // hover state
        var hoverState = axisFill.states.create("hover");
        hoverState.properties.innerRadius = -0.01;
        hoverState.properties.radius = -25;
    }

    createRange2(name, first_reason, last_reason, index) {
        var axisRange = this.reasonAxis.axisRanges.create();
        axisRange.axisFill.interactionsEnabled = true;
        axisRange.text = name;
        axisRange.category = first_reason;
        axisRange.endCategory = last_reason;
    
        // every 3rd color for a bigger contrast
        axisRange.axisFill.fill = this.colorSet.getIndex(index * 2);
        axisRange.grid.disabled = true;
        axisRange.label.text = "TODO";
        axisRange.label.inside = true;
        axisRange.label.location = 0.5;
        axisRange.label.interactionsEnabled = false;
        axisRange.label.bent = true;
        axisRange.label.fill = am4core.color("#ffffff");
        axisRange.label.radius = 7;
        axisRange.label.relativeRotation = 0;
    
        var axisFill = axisRange.axisFill;
        axisFill.innerRadius = - 20; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
        axisFill.radius = -0.01; // negative radius means it is calculated from max radius
        axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
        axisFill.fillOpacity = 0.8;
        axisFill.togglable = true;
    
        axisFill.showSystemTooltip = true;
        axisFill.readerTitle = "click to zoom";
        axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    
        axisFill.events.on("hit", (event) => {
            var dataItem = event.target.dataItem;
            if (!event.target.isActive) {
                this.reasonAxis.zoom({ start: 0, end: 1 });
            }
            else {
                this.reasonAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
            }
        })
    
        // hover state
        var hoverState = axisFill.states.create("hover");
        hoverState.properties.innerRadius = - 25;
        hoverState.properties.radius = - 0.01;
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

export default Detail;