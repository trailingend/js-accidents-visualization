import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";

import {home_line_data} from "./data";
import {home_map_data} from "./map_data";


class Home {
    constructor() {
        this.container = am4core.create("home-chart-ctnr", am4core.Container);
        this.container.width = am4core.percent(100);
        this.container.height = am4core.percent(100);

        this.mapChart = undefined;
        this.lineChart = undefined;
        this.fataSeries = undefined;
        this.injuSeries = undefined;
        this.safeSeries = undefined;
        this.occuSeries = undefined;
        this.mapImageSeries = undefined;
        this.sliderContainer = undefined;
        this.slider = undefined;
        this.sliderAnimation = undefined;
        this.playButton = undefined;

        this.numYears = home_line_data.length;
        this.prevYear = 1998;
    }

    init(winW, winH) {
        this.initMapChart();
        this.initLineChart();
        this.initLabel();
    }

    initLabel() {
        this.label = this.container.createChild(am4core.Label);
        this.label.text = "Canadian Aviation Accidents Occurances Over the Past 20 Years";
        this.label.valign = "bottom";
        this.label.padding(0, 50, 10, 0);
        this.label.align = "right";
    }

    initMapChart() {
        this.mapChart = this.container.createChild(am4maps.MapChart);
        this.mapChart.mouseWheelBehavior = "none";

        try {
            this.mapChart.geodata = am4geodata_continentsLow;
        } catch (e) {
            this.mapChart.raiseCriticalError({
                "message": "Map geodata could not be loaded."
            });
        }

        this.mapChart.projection = new am4maps.projections.Miller();
        this.mapChart.deltaLongitude = 145;
        this.mapChart.seriesContainer.draggable = false;
        this.mapChart.homeGeoPoint = { longitude: -99.311996, latitude: 37.314999 };
        this.mapChart.homeZoomLevel = 2.4;

        let polygonSeries = this.mapChart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.mapPolygons.template.fill = am4core.color("#3b3b3b");
        polygonSeries.mapPolygons.template.strokeOpacity = 0;
        polygonSeries.exclude = ["Antarctica"];

        this.mapImageSeries = this.mapChart.series.push(new am4maps.MapImageSeries());

        let mapImageSeriesTemplate = this.mapImageSeries.mapImages.template;
        mapImageSeriesTemplate.propertyFields.latitude = "latitude";
        mapImageSeriesTemplate.propertyFields.longitude = "longitude";
        let circle = mapImageSeriesTemplate.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color("#AED6F1");
        circle.stroke = am4core.color("#FFFFFF");
        circle.strokeWidth = 2;
        circle.nonScaling = true;
        circle.tooltipText = "{title}";

        this.mapImageSeries.data = home_map_data[0].images;
    }

    initLineChart() {
        this.lineChart = this.container.createChild(am4charts.XYChart);
        this.lineChart.padding(0, 50, 50, 50);
        this.lineChart.height = 450;
        this.lineChart.valign = "bottom";
        this.lineChart.data = home_line_data;
        this.lineChart.dateFormatter.inputDateFormat = "yyyy";

        let gradientFill = new am4core.LinearGradient();
        gradientFill.addColor(am4core.color("#000000"), 0, 0);
        gradientFill.addColor(am4core.color("#000000"), 1, 1);
        gradientFill.rotation = 90;

        this.lineChart.background.fill = gradientFill;

        let dateAxis = this.lineChart.xAxes.push(new am4charts.DateAxis());
        dateAxis.tooltip.dateFormatter.dateFormat = "YYYY";
        dateAxis.renderer.inside = false;
        dateAxis.tooltip.background.pointerLength = 4;
        dateAxis.tooltip.background.fill = am4core.color("#666666");
        dateAxis.tooltip.background.stroke = dateAxis.tooltip.background.fill;
        dateAxis.renderer.ticks.template.disabled = true;
        dateAxis.renderer.line.disabled = true;
        dateAxis.renderer.labels.template.fillOpacity = 0.4;
        dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        dateAxis.renderer.minLabelPosition = 0;
        dateAxis.renderer.minGridDistance = 30;
        // dateAxis.renderer.grid.template.strokeDasharray = "3,3";
        // dateAxis.renderer.grid.template.strokeOpacity = 0.2;
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.grid.template.stroke = am4core.color("#ffffff");

        let valueAxis = this.lineChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.min = 0;
        valueAxis.max = 900;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.line.disabled = true;
        valueAxis.tooltip.disabled = true;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.fillOpacity = 0.4;
        valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        valueAxis.renderer.grid.template.stroke = am4core.color("#ffffff");
        valueAxis.renderer.minGridDistance = 15;
        valueAxis.renderer.inside = false;

        let axisBreak = valueAxis.axisBreaks.create();
        axisBreak.startValue = 50;
        axisBreak.endValue = 540;
        axisBreak.breakSize = 0.02;
        let hoverState = axisBreak.states.create("hover");
        hoverState.properties.breakSize = 1;
        hoverState.properties.opacity = 0.1;
        hoverState.transitionDuration = 1500;
        axisBreak.defaultState.transitionDuration = 1000;

        this.fataSeries = this.lineChart.series.push(new am4charts.ColumnSeries());
        this.fataSeries.dataFields.dateX = "year";
        this.fataSeries.dataFields.valueY = "fata";
        this.fataSeries.name = "Fatalities";
        this.fataSeries.fill = am4core.color("#FF5733");
        this.fataSeries.fillOpacity = 0.7;
        this.fataSeries.strokeWidth = 0;
        this.fataSeries.tooltipText = "{name}: {valueY}";

        this.injuSeries = this.lineChart.series.push(new am4charts.ColumnSeries());
        this.injuSeries.dataFields.dateX = "year";
        this.injuSeries.dataFields.valueY = "inju";
        this.injuSeries.name = "Injuries";
        this.injuSeries.fill = am4core.color("#FFC300");
        this.injuSeries.fillOpacity = 0.7;
        this.injuSeries.strokeWidth = 0;
        this.injuSeries.tooltipText = "{name}: {valueY}";
        this.injuSeries.stacked = true;

        this.safeSeries = this.lineChart.series.push(new am4charts.ColumnSeries());
        this.safeSeries.dataFields.dateX = "year";
        this.safeSeries.dataFields.valueY = "safe";
        this.safeSeries.name = "No Damage";
        this.safeSeries.fill = am4core.color("#AED6F1");
        this.safeSeries.fillOpacity = 0.2;
        this.safeSeries.strokeWidth = 0;
        this.safeSeries.stacked = true;

        this.occuSeries = this.lineChart.series.push(new am4charts.LineSeries());
        this.occuSeries.name = "Occurance";
        this.occuSeries.dataFields.dateX = "year";
        this.occuSeries.dataFields.valueY = "occu";
        this.occuSeries.stroke = am4core.color("#BB8FCE");
        this.occuSeries.strokeWidth = 2;
        this.occuSeries.tensionX = 1;
        this.occuSeries.tensionY = 1;
        this.occuSeries.tooltipText = "{name}: {valueY}";
        this.occuSeries.tooltip.background.fillOpacity = 0;
        this.occuSeries.tooltip.autoTextColor = false;
        this.occuSeries.tooltip.label.fill = am4core.color("#ffffff");
        this.occuSeries.tooltip.filters.clear();
        this.occuSeries.tooltip.pointerOrientation = "vertical";
        let bullets = this.occuSeries.bullets.push(new am4charts.CircleBullet());
        bullets.circle.fill = am4core.color("#BB8FCE");
        bullets.circle.stroke = am4core.color("#BB8FCE");

        this.lineChart.cursor = new am4charts.XYCursor();
        this.lineChart.cursor.behavior = "none";
        this.lineChart.cursor.xAxis = dateAxis;
        this.lineChart.cursor.lineX.strokeOpacity = 0;
        this.lineChart.legend = new am4charts.Legend();
        this.lineChart.legend.labels.template.text = "[{color}]{name}[/]";

        this.addLineChartEventListener();
    }
    
    addLineChartEventListener() {
        this.lineChart.events.on("ready", ()=> {
            this.createSlider();
        });
    }

    createSlider() {
        this.sliderContainer = this.container.createChild(am4core.Container);
        this.sliderContainer.width = am4core.percent(100);
        this.sliderContainer.valign = "bottom";
        this.sliderContainer.padding(0, 50, 25, 50);
        this.sliderContainer.layout = "horizontal";
        this.sliderContainer.height = 50;
    
        this.playButton = this.sliderContainer.createChild(am4core.PlayButton);
        this.playButton.valign = "middle";
        
        this.slider = this.sliderContainer.createChild(am4core.Slider);
        this.slider.valign = "middle";
        this.slider.margin(0, 5, 0, 15);
        
        this.slider.stroke = am4core.color("#ffffff");
        this.slider.strokeWidth = 0.2;
        this.slider.fill = am4core.color("#ffffff");
        this.slider.fillOpacity = 1;
        // this.slider.marginLeft = 10;
        // this.slider.marginLeft = 10;
        this.slider.height = 15;
        
        this.addButtonEventListener();
        this.addSliderEventListener();
        this.addSliderAnimationEventListener();

        this.startAnimation();
    }

    addButtonEventListener() {
        this.playButton.events.on("toggled", (event) => {
            if (event.target.isActive) {
                this.play();
            } else {
                this.stop();
            }
        });
    }

    addSliderEventListener() {
        this.slider.events.on("rangechanged", () => {
            this.update();
        });
    
        this.slider.startGrip.events.on("drag", () => {
            this.stop();
            this.sliderAnimation.setProgress(this.slider.start);
        });
    }

    addSliderAnimationEventListener() {
        this.sliderAnimation = this.slider.animate({ 
            property: "start", 
            to: 1 
        }, 50000, am4core.ease.linear).pause();
        this.sliderAnimation.events.on("animationended", () => {
            this.playButton.isActive = false;
        });
    }

    startAnimation() {
        setTimeout(() => {
            this.play();
        }, 2000);
    }

    play() {
        if (this.slider) {
            if (this.slider.start >= 1) {
                this.slider.start = 0;
                this.sliderAnimation.start();
            }
            this.sliderAnimation.resume();
            this.playButton.isActive = true;
        }
    }
    
    stop() {
        this.sliderAnimation.pause();
        this.playButton.isActive = false;
    }

    update() {
        let currCount = Math.floor(this.slider.start * this.numYears);
        let currYear = Math.floor(this.slider.start * this.numYears) + 1999;

        if (currYear != this.prevYear && currCount < this.numYears) {
            console.log(currYear + " " + currCount + " " + this.numYears)

            this.prevYear = currYear;
            if (this.slider) {
                for (let i = 0; i < this.currCount; i++) {
                    let occuItem = this.occuSeries.dataItems.getIndex(i);
                    if (i < currCount) {
                        occuItem.show(500, 0, ["valueY"]);
                    } else {
                        occuItem.hide(500, 0, 0, ["valueY"]);
                    }
                }
                
                this.mapImageSeries.data = home_map_data[currCount].images;
            }
        }
    }

    resize(winW, winH) {

    }

    obDesktopToMobile() {

    }

    onMobileToDesktop() {

    }
}

export default Home;