var btoa = require('btoa');
const fetch = require("node-fetch");
const url = 'https://readwise.io/munger';

fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
    agent: null,
    headers: {
        "Content-Type": "text/plain",
        'Authorization': 'Basic ' + btoa('username:password'),
    },
    timeout: 5000
})
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
}).catch(err => console.error(err));