import {departures, destinations} from './data_airports';
import { TweenMax, TimelineLite, Linear, Power2 } from "gsap/All";

class Dropdown {
    constructor(alias, elemStrings) {
        this.unitH = 31;
        this.alias = alias;

        this.line = document.querySelector("#" + alias + "-line");
        this.choices = document.querySelector("#" + alias + "-choices");
        this.list = document.querySelector("#" + alias + "-choices ul");
        this.itemNames = (alias === '') ? departures : destinations;
        this.indexSelected = 0;

        this.startLoc = 0;
    }

    init(defaultIndex, maxIndex) {
        this.setLeft();
        this.generateDOM();
        this.setup(defaultIndex, maxIndex);
    }

    generateDOM() {
        let liText = '';
        this.itemNames.forEach((name)=>{
            liText += `<li class="home-drop-item">${name}</li>`;
        });
        this.list.innerHTML = liText;
        this.items = Array.from(document.querySelectorAll("#" + this.alias + "-choices li"));
    }
    
    setup(defaultIndex, maxIndex) {
        this.goTo(defaultIndex);
        this.items.forEach((itemElem, index) => {
            itemElem.addEventListener("click", (e) => {
                this.goTo(index);
            });
        });
        // ["mousedown", "touchstart"].forEach(evt => {
        //     this.choices.addEventListener(evt, (e) => {
        //         this.startLoc = e.clientY;
        //         console.log("start " + e.clientY)
        //     });
        // });
        // ["mousemove", "touchmove"].forEach(evt => {
        //     this.choices.addEventListener(evt, (e) => {
        //         if (this.startLoc != 0) {
        //             const diff = e.clientY - this.startLoc;
        //             const offsetIndex = Math.round(diff / 31);
        //             let calcIndex = this.indexSelected + offsetIndex;
        //             calcIndex = (calcIndex < 0) ? 0 : calcIndex;
        //             calcIndex = (calcIndex > maxIndex) ? maxIndex : calcIndex;
        //             this.goTo(calcIndex);
        //             console.log("up " + diff + " " + offsetIndex + " " + calcIndex);
        //         }
        //     });
        // });
        // ["mouseup", "touchend", "touchcancel"].forEach(evt => {
        //     this.choices.addEventListener(evt, (e) => {
        //         this.startLoc = 0;
        //         console.log("reset mouse event");
        //     });
        // });
    }

    setLeft() {
        TweenMax.to(this.choices, 0.0 , {
            css: { 
                left: this.line.offsetLeft,
            }
        });
    }

    goTo(defaultIndex) {
        this.indexSelected = defaultIndex;
        TweenMax.to(this.choices, 0.2 , {
            top: - this.unitH * defaultIndex - 2, 
            ease: Power2.easeOut,
            // color: "#6f9cbb"
        });

        this.items.forEach((item, idx) => {
            if (idx === defaultIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }
}
export default Dropdown;
