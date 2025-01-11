"use strict";
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Error! ${response.status}`);
    return response.json();
};
getData(COMMENTS_URL)
    .then(data => {
    data.forEach((elem) => {
        console.log(`ID: ${elem.id}, Email: ${elem.email}`);
    });
});
/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */ 
