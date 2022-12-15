import puppeteer from "puppeteer";
import { findTeamsByName } from "./mongoFns.js";
import client from "./server.js";

async function scrapeData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".game-info__team--desktop")).map(x => x.textContent);
    })

    const bestOdds = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".best-odds__open-cell")).map(x => x.textContent);
    })

    console.log(names);
    console.log(bestOdds);
    
    const matches = [];
    try {
        
        for (let i = 0; i < names.length - 1; i += 3) {
            //Gather teamData using findteamsdata function and calculate the odds inserting the odds into the object
            let [name1] = names[i].split(" ").splice(-1);
            let [name2] = names[i + 1].split(" ").splice(-1);
            
            const teamData = await findTeamsByName(client, name1, name2);
            console.log("TEAM DATA" + teamData);
            if (!teamData) {
                console.log("ERROR RETRIEVING DATA!");
                return;
            }
          
            let st1 = teamData[0]['diff'] + (teamData[0]['winPct'] * 1.5) + 3;
            let st2 = teamData[1]['diff'] + (teamData[1]['winPct'] * 1.5);            
            let calculated = Math.abs(st2)-Math.abs(st1);
            console.log("testststststt")
            let match = {
                "team1": names[i].split(" ").splice(-1),
                "team2": names[i + 1].split(" ").splice(-1),
                "oddsTeam1": bestOdds.pop().match(/[+-]?\d+(\.\d+)?/)[0],
                "oddsTeam2": bestOdds.pop().match(/[+-]?\d+(\.\d+)?/)[0],
                "odds": calculated.toFixed(2),
            }
            console.log(match);
            matches.push(match);
        }
    
    } catch (e) {
        console.error;
    } finally {
        await client.close();
    }
   
    await browser.close();

    return matches;
}


export { scrapeData };