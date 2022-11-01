import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';

const PORT = process.env.PORT || 5000
const app = express()

// const URL = 'https://www.google.com/search?q=matt+damon&oq=matt+damon+&aqs=chrome.0.35i39j46i67i131i433l2j46i67j46i433i512j46i512j46i433i512j69i61.1198j0j7&sourceid=chrome&ie=UTF-8'

const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

// Async function which scrapes the data

// Async function which scrapes the data
async function scrapeData() {
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);
      // Select all the list items in plainlist class
      const listItems = $(".plainlist ul li");
      // Stores data for all countries
      const countries = [];
      // Use .each method to loop through the li we selected
      listItems.each((idx, el) => {
        // Object holding data for each country/jurisdiction
        const country = { name: "", iso3: "" };
        // Select the text content of a and span elements
        // Store the textcontent in the above object
        country.name = $(el).children("a").text();
        country.iso3 = $(el).children("span").text();
        // Populate countries array with country data
        countries.push(country);
      });
      // Logs countries array to the console
      console.dir(countries);
      // Write countries array in countries.json file
      fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });
    } catch (err) {
      console.error(err);
    }
  }
  // Invoke the above function
  scrapeData();
/**
 * WORKING sample code
 *  */ 

// const URL = 'https://www.manchestereveningnews.co.uk/sport/football/'

// axios(URL)
//     .then(res => {
//         const htmlData = res.data
//         const $ = cheerio.load(htmlData)
//         const articles = []

//         $('.teaser', htmlData).each((index, element) => {
//             const title = $(element).children('.headline').text()
//             const titleURL = $(element).children('.headline').attr('href')
//             articles.push({
//                 title,
//                 titleURL
//             })
//         })
//         console.log(articles)
//     }).catch(err => console.error(err))

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))