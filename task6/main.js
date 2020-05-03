'use strict';

let posts = [];
for(let i =1; i<21; i++)
{
    let post =
    {
        id: i,
        description: 'description of post with id: ' + i,
        createdAt: new Date('2020-03-17T23:00:0' + i),
        author: 'Lesha Malinovski '+ i,
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg ' + i,
        hashtags: ['hashtags of post with id ' + i, 'hashtag1','hashtag2'],
        likes: ['likes of post with id ' + i, 'user1','user2', 'user3' ]
    }
    posts.push(post);
}
(function() {


    function getPosts(skip = 0, top = 10, filterConfig){
        let filteredPosts = [];
if(filterConfig == undefined)
    filteredPosts = posts.slice();
else
{
    if('author' in filterConfig)
filteredPosts = posts.filter(x => x.author == filterConfig.author);
if('createdAt' in filterConfig)
filteredPosts = posts.filter(x => x.createdAt == filterConfig.createdAt);
if('hashtags' in filterConfig)
{

filteredPosts = posts.filter(function(post) {
    let n =0;
    for(let i =0;i<filterConfig.hashtags.length;i++)
    {
        if(post.hashtags.some(x => x == filterConfig.hashtags[i]))
        n++;
    }
    if(n == filterConfig.hashtags.length)
    return true;
    else
    return false;
});
}
}

        filteredPosts.sort(function(a,b){
            return b.createdAt - a.createdAt;
        });

        filteredPosts = filteredPosts.filter(x => x.id > skip && x.id <= skip + top);
        return filteredPosts;
    }
    function getPost(id)
    {
        return posts.find(x => x.id == id);
    }
    function validatePost(id)
    {
       let post = getPost(id);
        if(post.id == undefined || post.description == undefined || post.createdAt==undefined 
            || post.author == undefined || post.description.length>=200 || post.author.length == 0)
            return false;
            else
            return true;

    }
    function addPost(post)
    {
        if(post.id == undefined || post.description == undefined || post.createdAt==undefined 
            || post.author == undefined || post.description.length>=200 || post.author.length == 0)
            return false;
        else
        {
            posts.push(post);
            return true;
        }

    }
    function editPost(id, param){
        let editPost = getPost(id);
        if('description' in param)
        {
            editPost.description = param;
        }
        if('photoLink'in param)
        {
            editPost.photoLink = param;
        }
        return validatePost(id);

    }
    function indexById(id)
    {
        return posts.findIndex(x => x.id == id);
    }
    function removePost(id)
    {
        let index = indexById(id);
        posts.splice(index, 1);
        return true;

    }
    console.log("All posts:");
    console.log(posts);
    console.log("GetPosts default usage");
    console.log(getPosts());
    console.log("GetPosts not default usage");
    console.log(getPosts(1,2));
    console.log("GetPosts not default usage at all");
    console.log(getPosts(1,2,{author: 'Lesha Malinovski 2'}));
    console.log("GetPost");
    console.log(getPost(2));
    console.log("validatePost");
    console.log(validatePost(13));
    let post21 = {
        id: 21,
        description: 'description of post with id: ' + 21,
        createdAt: new Date('2020-03-17T23:00:0' + 21),
        author: 'Lesha Malinovski '+ 21,
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg ' + 21,
        hashtags: ['hashtags of post with id ' + 21, 'hashtag1','hashtag2'],
        likes: ['likes of post with id ' + 21, 'user1','user2', 'user3' ]

    };
    console.log("addPost");
    console.log(addPost(post21));
    console.log("All posts:");
    console.log(posts);
    console.log("editPost");
    console.log(editPost(2, {description: "edited description"}));
    console.log("List of all posts:");
    console.log(posts);
    console.log("removePost");
    console.log(removePost(1));
    console.log("All posts:");
    console.log(posts);
    console.log("getPosts with hashtag");
    console.log(getPosts(1,20, {hashtags: ["hashtags of post with id 19", "hashtag1", "hashtag2"]}));
  
}());