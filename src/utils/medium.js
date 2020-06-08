const https = require("https");
const fs = require("fs");
const parseString = require("xml2js").parseString;
const feedURL = "https://medium.com/feed/@iqbaljihad";
const blogPath = "/Volumes/workplace/website/src/content/blog/medium";

const parseMediumXML = (xmlString) => {
    parseString(xmlString, function (err, result) {
        const { rss = {} } = result;
        const { channel = [] } = rss;
        const { item = [] } = channel[0];

        for (let index = 0; index < item.length; index++) {
            const link = item[index].link[0] || "";
            const fileName = link.substring(link.lastIndexOf("/") + 1, link.lastIndexOf("?"))
            console.log(`Generating JSON file for ${link}`);
            console.log(`${blogPath}/${fileName}.json`);
            fs.writeFile(`${blogPath}/${fileName}.json`, JSON.stringify(item[index], null, 4), () => {
                console.log("Done");
            });
        }
    });
};

const fetchMediumXML =  () => {
    console.log("fetching medium articles....");
    https
    .get(feedURL, resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
            console.log("receiving chunk....");
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
            console.log("whole response received");
            parseMediumXML(data);
        });
    })
    .on("error", err => {
        console.log("Fetch error: " + err.message);
    });
}

fetchMediumXML();