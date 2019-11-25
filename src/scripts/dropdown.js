import {departures, destinations, time, airlines, manufacturers} from './data_filters';
import { TweenMax, TimelineLite, Linear, Power2 } from "gsap/All";

class Dropdown {
    constructor(alias) {
        this.unitH = 31;
        this.alias = alias;

        this.line = document.querySelector("#" + alias + "-line");
        this.choices = document.querySelector("#" + alias + "-choices");
        this.list = document.querySelector("#" + alias + "-choices ul");
        this.itemNames = ["any"];
        this.indexSelected = 0;
        this.maxIndex = this.itemNames.length - 1;
        this.startLoc = 0;
        this.callback = undefined;
    }

    init(defaultIndex) {
        this.setupChoices("2019");
        this.setupPosition();
        this.generateDOM();
        this.setupSelection(defaultIndex, this.maxIndex);
    }

    generateDOM() {
        this.list.innerHTML = "";

        let liText = '';
        this.itemNames.forEach((name)=>{
            liText += `<li class="drop-item">${name}</li>`;
        });
        this.maxIndex = this.itemNames.length - 1;
        this.list.innerHTML = liText;
        this.items = Array.from(document.querySelectorAll("#" + this.alias + "-choices li"));
    }

    resetChoices(yearInput) {
        const yearForRanking = (yearInput === "any") ? "2019" : yearInput;
        this.setupChoices("2019");
        this.generateDOM();
        this.setupSelection(0, this.maxIndex);
    }

    setupChoices(yearForRanking) {
        if (this.alias === 'depa') {
            this.itemNames = departures;
        } else if (this.alias === 'dest') {
            this.itemNames = destinations;
        } else if (this.alias === 'orga') {
            this.itemNames = airlines[parseInt(yearForRanking) - 1999].map((elem) => { return elem.name;});;
        } else if (this.alias === 'manu') {
            this.itemNames = manufacturers[parseInt(yearForRanking) - 1999].map((elem) => { return elem.name;});
        } else if (this.alias === 'time') {
            this.itemNames = time;
        }
    }
    
    setupSelection(defaultIndex, maxIndex) {
        this.initialGoTo(defaultIndex);
        this.items.forEach((itemElem, index) => {
            itemElem.addEventListener("click", (e) => {
                this.goTo(index);
            });
        });
    }

    setupPosition() {
        TweenMax.to(this.choices, 0.0 , {
            css: { 
                left: this.line.offsetLeft,
            }
        });
    }

    initialGoTo(defaultIndex) {
        this.indexSelected = defaultIndex;
        TweenMax.to(this.choices, 0.2 , {
            top: - this.unitH * defaultIndex - 2, 
            ease: Power2.easeOut,
        });

        this.items.forEach((item, idx) => {
            if (idx === defaultIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    goTo(defaultIndex) {
        this.indexSelected = defaultIndex;
        TweenMax.to(this.choices, 0.2 , {
            top: - this.unitH * defaultIndex - 2, 
            ease: Power2.easeOut,
        });

        this.items.forEach((item, idx) => {
            if (idx === defaultIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
        if (this.callback != undefined) {
            console.log(this.alias + " - called callback");
            this.callback(this.alias, this.getCurrentSelection());
        }
    }

    getCurrentSelection() {
        const name = this.itemNames[this.indexSelected];
        return (name === 'anywhere' || name === 'anytime') ? 'any' : name;
    }

    setCallback(func) {
        this.callback = func;
    }


}
export default Dropdown;
