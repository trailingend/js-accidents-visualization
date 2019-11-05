import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";

import {home_line_data, home_map_data} from "./data";

class Home {
    constructor() {
        this.container = am4core.create("home-chart-ctnr", am4core.Container);
        this.container.width = am4core.percent(100);
        this.container.height = am4core.percent(100);

        this.mapChart = undefined;
        this.lineChart = undefined;
        this.mapImageSeries = undefined;
        this.sliderContainer = undefined;
        this.slider = undefined;
        this.sliderAnimation = undefined;
        this.playButton = undefined;
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
        circle.fill = am4core.color("#B27799");
        circle.stroke = am4core.color("#FFFFFF");
        circle.strokeWidth = 2;
        circle.nonScaling = true;
        circle.tooltipText = "{title}";

        this.mapImageSeries.data = home_map_data[0].images;
    }

    initLineChart() {
        this.lineChart = this.container.createChild(am4charts.XYChart);
        this.lineChart.padding(0, 50, 50, 50);
        this.lineChart.height = 350;
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
        valueAxis.max = 50;
        valueAxis.renderer.minGridDistance = 20;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.line.disabled = true;
        valueAxis.tooltip.disabled = true;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.fillOpacity = 0.4;
        valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        valueAxis.renderer.grid.template.stroke = am4core.color("#ffffff");
        valueAxis.renderer.inside = false;

        let fataSeries = this.lineChart.series.push(new am4charts.ColumnSeries());
        fataSeries.dataFields.dateX = "year";
        fataSeries.dataFields.valueY = "fata";
        fataSeries.name = "Fatalities";
        fataSeries.fill = am4core.color("#FF5733");
        fataSeries.fillOpacity = 0.7;
        fataSeries.strokeWidth = 0;
        fataSeries.tooltipText = "{name}: {valueY}";

        let injuSeries = this.lineChart.series.push(new am4charts.ColumnSeries());
        injuSeries.dataFields.dateX = "year";
        injuSeries.dataFields.valueY = "inju";
        injuSeries.name = "Injuries";
        injuSeries.fill = am4core.color("#FFC300");
        injuSeries.fillOpacity = 0.7;
        injuSeries.strokeWidth = 0;
        injuSeries.tooltipText = "{name}: {valueY}";
        injuSeries.stacked = true;

        var safeSeries = this.lineChart.series.push(new am4charts.ColumnSeries());
        safeSeries.dataFields.dateX = "year";
        safeSeries.dataFields.valueY = "safe";
        safeSeries.name = "No Damage";
        safeSeries.fill = am4core.color("#AED6F1");
        safeSeries.fillOpacity = 0.2;
        safeSeries.strokeWidth = 0;
        safeSeries.stacked = true;

        let occuSeries = this.lineChart.series.push(new am4charts.LineSeries());
        occuSeries.name = "Occurance";
        occuSeries.dataFields.dateX = "year";
        occuSeries.dataFields.valueY = "occu";
        occuSeries.stroke = am4core.color("#BB8FCE");
        occuSeries.strokeWidth = 2;
        occuSeries.tensionX = 1;
        occuSeries.tensionY = 1;
        occuSeries.tooltipText = "{name}: {valueY}";
        occuSeries.tooltip.background.fillOpacity = 0;
        occuSeries.tooltip.autoTextColor = false;
        occuSeries.tooltip.label.fill = am4core.color("#ffffff");
        occuSeries.tooltip.filters.clear();
        occuSeries.tooltip.pointerOrientation = "vertical";
        occuSeries.bullets.push(new am4charts.CircleBullet());
        occuSeries.bullets.fill = am4core.color("#BB8FCE");
        occuSeries.bullets.stroke = am4core.color("#BB8FCE");

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
        // this.playButton.events.on("toggled", (event) => {
        //     if (event.target.isActive) {
        //         this.play();
        //     } else {
        //         this.stop();
        //     }
        // });
        
        this.slider = this.sliderContainer.createChild(am4core.Slider);
        this.slider.valign = "middle";
        this.slider.margin(0, 0, 0, 0);
        this.slider.background.opacity = 1;
        
        this.slider.stroke = am4core.color("#ffffff");
        this.slider.strokeWidth = 3;
        this.slider.fill = am4core.color("#ffffff");
        this.slider.fillOpacity = 1;
        this.slider.marginLeft = 30;
        this.slider.height = 15;
        
        // this.addSliderEventListener();
        // this.addSliderAnimationEventListener();

        this.startAnimation();
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
        let time = new Date(startTime + (endTime - startTime) * slider.start).getTime();
        let roundedTime = am4core.time.round(new Date(time), "minute").getTime();

        if (roundedTime != currentTime) {
            currentTime = roundedTime;
            let count = lineSeries.dataItems.length;
            if (slider) {
                for (var i = 0; i < count; i++) {
                    let dataItem = lineSeries.dataItems.getIndex(i);

                    if (i < slider.start * count) {
                        dataItem.show(500, 0, ["valueY"]);
                    } else {
                        dataItem.hide(500, 0, 0, ["valueY"]);
                    }
                }
            }
        }

        // add some drama by zooming the map
        let bombFlyDuration = cancelTime - launchTime;
        let bombPosition = (time - launchTime) / bombFlyDuration;
        bombPosition = Math.min(1, bombPosition);
        bombPosition = Math.max(0, bombPosition);

        let oPoint = line.positionToPoint(bombPosition);
        let geoPoint = mapChart.seriesPointToGeo(oPoint);
        bomb.latitude = geoPoint.latitude;
        bomb.longitude = geoPoint.longitude;
        bomb.rotation = oPoint.angle + 90;

        if (bombPosition > 0 && bombPosition < 1) {
            bomb.opacity = 1;
        }

        if ((bombPosition >= 1 && !exploded)) {
            bomb.opacity = 0;
            bang.opacity = 1;
            bang.animate({ property: "opacity", to: 0, from: 1 }, 1000);
            exploded = true;
        }

        if (exploded && bombPosition < 1) {
            exploded = false;
            bang.opacity = 0;
            bomb.opacity = 1;
        }

        if (bombPosition <= 0.001) {
            bomb.opacity = 0;
        }

        if (time > alertTime && time < cancelTime) {
            if (!bulletAlertCircle.visible) {
                bulletAlertCircle.visible = true;
                bulletAlertAnimation.resume();
            }
        }
        else {
            bulletAlertCircle.visible = false;
        }

        for (var i = 0; i < honoluluTexts.length; i++) {
            let honoluluText = honoluluTexts[i];
            if (time > honoluluText.time) {
                honoluluCircle.tooltipText = honoluluText.text;
            }
        }

        if (honoluluCircle.tooltipText) {
            honoluluCircle.showTooltip();
        }
        else {
            honoluluCircle.hideTooltip();
        }

        for (var i = 0; i < pyongyangTexts.length; i++) {
            let pyongyangText = pyongyangTexts[i];
            if (time > pyongyangText.time) {
                pyongyangCircle.tooltipText = pyongyangText.text;
            }
        }

        if (pyongyangCircle.tooltipText) {
            pyongyangCircle.showTooltip();
        }
        else {
            pyongyangCircle.hideTooltip();
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