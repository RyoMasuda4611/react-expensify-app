const book = {
    title: 'my life',
    author: 'ryo masuda',
    publisher: {
        
    }
}

const { name: publisherName = 'selfPublished'} = book.publisher;

console.log(publisherName);
