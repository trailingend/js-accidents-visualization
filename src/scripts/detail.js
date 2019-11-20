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

        // this.radarChart.data = occu_data[0].occurances;
       
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
        this.reasonAxis.tooltip.defaultState.properties.opacity = 0;

        // value axis
        var valueAxis = this.radarChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = -3;
        valueAxis.max = 6;
        valueAxis.strictMinMax = true;
        valueAxis.tooltip.defaultState.properties.opacity = 0;
        valueAxis.tooltip.animationDuration = 0;
        valueAxis.cursorTooltipEnabled = true;
        valueAxis.zIndex = 10;

        var valueAxisRenderer = valueAxis.renderer;
        valueAxisRenderer.axisFills.template.disabled = true;
        valueAxisRenderer.ticks.template.disabled = true;
        valueAxisRenderer.minGridDistance = 20;
        valueAxisRenderer.grid.template.strokeOpacity = 0.05;

        // series
        this.radarColumn = this.radarChart.series.push(new am4charts.RadarColumnSeries());
        this.radarColumn.columns.template.width = am4core.percent(90);
        this.radarColumn.columns.template.strokeOpacity = 0;
        this.radarColumn.dataFields.valueY = "count";
        this.radarColumn.dataFields.categoryX = "reason";
        this.radarColumn.tooltipText = "{categoryX}:{valueY.value}";

        // this makes columns to be of a different color, depending on value
        this.radarColumn.heatRules.push({ 
            target: this.radarColumn.columns.template, 
            property: "fill", 
            minValue: -3, 
            maxValue: 6, 
            min: am4core.color("#673AB7"), 
            max: am4core.color("#F44336"), 
            dataField: "valueY" 
        });

        // cursor
        // var cursor = new am4charts.RadarCursor();
        // chart.cursor = cursor;
        // cursor.behavior = "zoomX";

        // cursor.xAxis = this.reasonAxis;
        // cursor.innerRadius = am4core.percent(40);
        // cursor.lineY.disabled = true;

        // cursor.lineX.fillOpacity = 0.2;
        // cursor.lineX.fill = am4core.color("#000000");
        // cursor.lineX.strokeOpacity = 0;
        // cursor.fullWidthLineX = true;

        // year slider
        // var yearSliderContainer = chart.createChild(am4core.Container);
        // yearSliderContainer.layout = "vertical";
        // yearSliderContainer.padding(0, 38, 0, 38);
        // yearSliderContainer.width = am4core.percent(100);

        // var yearSlider = yearSliderContainer.createChild(am4core.Slider);
        // yearSlider.events.on("rangechanged", function () {
        //     updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
        // })
        // yearSlider.orientation = "horizontal";
        // yearSlider.start = 0.5;
        // yearSlider.exportable = false;

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
                const reasoned_count = reasoned_data.length;
                data.push({
                    "reason": reas_name,
                    "count": reasoned_count
                })
            });

            this.createRange(cate_name, first_reason, last_reason, i);
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
    
        var axisFill = axisRange.axisFill;
        axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
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
            }
            else {
                this.reasonAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
            }
        })
    
        // hover state
        var hoverState = axisFill.states.create("hover");
        hoverState.properties.innerRadius = -10;
        hoverState.properties.radius = -25;
    
        var axisLabel = axisRange.label;
        axisLabel.location = 0.5;
        axisLabel.fill = am4core.color("#ffffff");
        axisLabel.radius = 3;
        axisLabel.relativeRotation = 0;
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