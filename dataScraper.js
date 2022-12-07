import puppeteer from "puppeteer";

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
    for (let i = 0; i < names.length - 1; i += 3) {
        let j = 0;
        let match = {
            "team1": names[i],
            "team2": names[i + 1],
            "oddsTeam1": bestOdds[j],
            "oddsTeam2": bestOdds[j++ + 1]
        }

        matches.push(match);
    }

    await browser.close();

    return matches;
}


export { scrapeData };