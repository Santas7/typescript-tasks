interface Comment {
    id: number
    email: string
}

const COMMENTS_URL: string = 'https://jsonplaceholder.typicode.com/comments';

const getData = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Error! ${response.status}`);
    return response.json();
}

getData(COMMENTS_URL)
.then(data => {
    data.forEach((elem: Comment) => {
        console.log(`ID: ${elem.id}, Email: ${elem.email}`)
    })
});

/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */