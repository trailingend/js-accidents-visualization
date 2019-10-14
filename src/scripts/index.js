import { retrieveWindowWidth, 
         retrieveWindowHeight, 
         checkIfDesktopToMobile, 
         checkIfMobileToDesktop, 
         testPlatform } from './utils';
import Ranking from './Ranking';


const widthLimit = 960;
let platform;
let winW, winH;
let ranking;


window.addEventListener('load', (event) => {
    platform = testPlatform();
    winW = retrieveWindowWidth(platform);
    winH = retrieveWindowHeight(platform);
    console.log('=== On Init ===: (' + winW + ", " + winH + ")");

    // ================ Main content goes here =================
    ranking = new Ranking();
    ranking.init(winW, winH);
    // ================ Main content ends here =================

    if (winW <= widthLimit) {
        // ================ Mobild resize calls go here =================

        // ================ Mobild resize calls go here =================
    }
});

window.addEventListener('resize', (event) => {
    const newWinW = retrieveWindowWidth(platform);
    const newWinH = retrieveWindowHeight(platform);
    const ifDToM = checkIfDesktopToMobile(winW, newWinW, widthLimit);
    const ifMToD = checkIfMobileToDesktop(winW, newWinW, widthLimit);
    winW = newWinW;
    winH = newWinH;
    
    console.log('=== On Resize ===: (' + newWinW + ", " + newWinH + ")");
    // ================ Resize calls go here =================
    ranking.onResize(winW, winH);
    // ================ Resize calls go here =================

    if (ifDToM || ifMToD) {
        console.log('=== Acrossing platforms ===');
        // ================ Selected Resize calls go here =================
        
        // ================ Selected Resize calls end here =================
    }
});
