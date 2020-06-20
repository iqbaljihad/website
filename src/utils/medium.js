const fs = require("fs")
const blogPath = "/Volumes/workplace/website/src/content/thoughts"
const rssParser = require("rss-parser")

const runMedium = () => {
  const jsonFeedPromise = getJsonFeed(`@iqbaljihad`)

  jsonFeedPromise.then(
    function (response) {
      response.map(item => {
        fs.writeFile(
          `${blogPath}/${item.slug}.json`,
          JSON.stringify(item, null, 4),
          () => {
            console.log("Wrote " + item.slug + ".json")
          }
        )
      })
    },
    function (error) {
      console.log(error)
    }
  )
}

function getJsonFeed(userName) {
  const parser = new rssParser({
    customFields: {
      item: [["content:encoded", "content"]],
    },
  })

  return parser
    .parseURL(`https://medium.com/feed/${userName}`)
    .then(feed => {
      const parsedFeeds = feed.items.map(item => {
        const thumbnail = item.content.match(
          /(?<=(<img[^>]+src="))([^"\s]+)(?!"[^>]*\/z)/g
        )[0]
        const {
          title,
          isoDate: date,
          creator: author,
          link,
          content,
          categories,
        } = item
        const slug = item.title
          .replace(/[^a-zA-Z0-9\s]+/g, "")
          .toLowerCase()
          .split(" ")
          .join("-")
        return {
          title,
          date,
          author,
          link,
          content,
          thumbnail,
          slug,
          categories,
        }
      })
      return parsedFeeds
    })
    .catch(error => {
      return [
        {
          title: "No feed found",
          date: new Date(),
          author: "No author",
          link: "",
          content: "",
          thumbnail: "https://loremflickr.com/640/360",
          slug: "",
        },
      ]
    })
}

runMedium()

// {
//   "items":[
//      {
//         "creator":"jiji",
//         "title":"Test Story",
//         "link":"https://medium.com/@iqbaljihad/test-story-4e1c55aa1090?source=rss-99c074381f6------2",
//         "pubDate":"Mon, 08 Jun 2020 17:04:36 GMT",
//         "content:encoded":"<p>test story</p><blockquote>adfasdf</blockquote><h3>testing all the stuff:</h3><p><a href=\"https://www.youtube.com/embed/4SZl1r2O_bY\">https://www.youtube.com/embed/4SZl1r2O_bY</a></p><figure><img alt=\"\" src=\"https://cdn-images-1.medium.com/max/640/1*ut8M5KP3Rg8YwDsifRT4iw.jpeg\" /></figure><img src=\"https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=4e1c55aa1090\" width=\"1\" height=\"1\">",
//         "dc:creator":"jiji",
//         "content":"<p>test story</p><blockquote>adfasdf</blockquote><h3>testing all the stuff:</h3><p><a href=\"https://www.youtube.com/embed/4SZl1r2O_bY\">https://www.youtube.com/embed/4SZl1r2O_bY</a></p><figure><img alt=\"\" src=\"https://cdn-images-1.medium.com/max/640/1*ut8M5KP3Rg8YwDsifRT4iw.jpeg\" /></figure><img src=\"https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=4e1c55aa1090\" width=\"1\" height=\"1\">",
//         "guid":"https://medium.com/p/4e1c55aa1090",
//         "categories":[
//            "Array"
//         ],
//         "isoDate":"2020-06-08T17:04:36.000Z"
//      }
//   ],
//   "feedUrl":"https://medium.com/feed/@iqbaljihad",
//   "image":{
//      "link":"https://medium.com/@iqbaljihad?source=rss-99c074381f6------2",
//      "url":"https://cdn-images-1.medium.com/fit/c/150/150/0*vCHtj1DHv_GcVgYK.jpg",
//      "title":"Stories by jiji on Medium"
//   },
//   "title":"Stories by jiji on Medium",
//   "description":"Stories by jiji on Medium",
//   "webMaster":"yourfriends@medium.com",
//   "generator":"Medium",
//   "link":"https://medium.com/@iqbaljihad?source=rss-99c074381f6------2",
//   "lastBuildDate":"Fri, 19 Jun 2020 02:05:15 GMT"
// }
