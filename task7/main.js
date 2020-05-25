'use strict';

let posts1 = [];
for (let i = 1; i < 21; i++) {
    let post =
    {
        id: i,
        description: 'description of post with id: ' + i,
        createdAt: new Date('2020-03-17T23:00:0' + i),
        author: 'Lesha Malinovski ' + i,
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg ' + i,
        hashtags: ['hashtags of post with id ' + i, 'hashtag1', 'hashtag2'],
        likes: ['likes of post with id ' + i, 'user1', 'user2', 'user3']
    }
    posts1.push(post);
}
class PostList {
    constructor(posts) {
        this.posts = posts || [];
    }
    indexById(id) {
        return this.posts.findIndex(x => x.id === id);
    }
    getPosts(skip = 0, top = 10, filterConfig) {
        let filteredPosts = [];
        if (filterConfig == undefined)
            filteredPosts = this.posts.slice();
        else {
            if ('author' in filterConfig)
                filteredPosts = this.posts.filter(x => x.author == filterConfig.author);
            if ('createdAt' in filterConfig)
                filteredPosts = this.posts.filter(x => x.createdAt == filterConfig.createdAt);
            if ('hashtags' in filterConfig) {

                filteredPosts = this.posts.filter(function (post) {
                    let n = 0;
                    for (let i = 0; i < filterConfig.hashtags.length; i++) {
                        if (post.hashtags.some(x => x == filterConfig.hashtags[i]))
                            n++;
                    }
                    if (n == filterConfig.hashtags.length)
                        return true;
                    else
                        return false;
                });
            }
        }

        filteredPosts.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });

        filteredPosts = filteredPosts.slice(skip, skip + top);
        return filteredPosts;
    }
    getPost(id) {
        return this.posts.find(x => x.id === id);
    }
    static validatePost(post) {
        if (post.id === undefined || post.description === undefined || post.createdAt === undefined
            || post.author === undefined || post.description.length >= 200 || post.author.length === 0)
            return false;
        return true;

    }
    addLike(id, user) {
        if (id === undefined || user === undefined) return false;
        const index = this.indexById(id);
        if (index === -1) return false;
        this.posts[index].likes.push(user);
        return true;
    }
    deleteLike(id, user) {
        if (id === undefined || user === undefined) return false;
        const index = this.indexById(id);
        if (index === -1) return false;
        for (let i = 0; i < this.posts[index].likes.length; i++) { if (this.posts[index].likes[i] === user) { this.posts[index].likes.splice(i, 1); return true; } }
    }
    addHashtag(id, hash) {
        if (id === undefined || hash === undefined) return false;
        const index = this.indexById(id);
        if (index === -1) return false;
        this.posts[index].hashtags.push(hash);
        return true;
    }
    deleteHashtag(id, hash) {
        if (id === undefined || hash === undefined) return false;
        const index = this.indexById(id);
        if (index === -1) return false;
        for (let i = 0; i < this.posts[index].hashtags.length; i++) { if (this.posts[index].hashtags[i] === hash) { this.posts[index].hashtags.splice(i, 1); return true; } }
    }
    addPost(post) {
        if (!PostList.validatePost(post)) return false;
        this.posts.push(post);
        return true;
    }
    editPost(id, param) {
        let clone = Object.assign({}, this.posts[this.indexById(id)]);
        if ('description' in param) {
            clone.description = param.description;
        }
        if ('photoLink' in param) {
            clone.photoLink = param.photoLink;
        }
        if (PostList.validatePost(clone)) {
            this.posts[this.indexById(id)] = clone;
            return true;
        }
        return false;
    }
    removePost(id) {
        const index = this.indexById(id);
        if (index === -1) return false;
        this.posts.splice(index, 1);
        return true;
    }
    getAllPosts() {
        return this.posts;
    }
    addAll(postsAr) {
        let notAddedPosts = [];
        postsAr.forEach(post => {
            if (!(this.addPost(post)))
                notAddedPosts.push(post);
        });
        return notAddedPosts;

    }
}
(function () {
    let _posts = new PostList(posts1);
    console.log("All posts:");
    console.log(_posts.getAllPosts());
    console.log("GetPosts default usage");
    console.log(_posts.getPosts());
    console.log("GetPosts not default usage");
    console.log(_posts.getPosts(1, 2));
    console.log("GetPosts not default usage at all");
    console.log(_posts.getPosts(1, 2, { author: 'Lesha Malinovski 2' }));
    console.log("GetPost");
    console.log(_posts.getPost(2));
    console.log("validatePost");
    let post21 = {
        id: 21,
        description: 'description of post with id: ' + 21,
        createdAt: new Date('2020-03-17T23:00:0' + 21),
        author: 'Lesha Malinovski ' + 21,
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg ' + 21,
        hashtags: ['hashtags of post with id ' + 21, 'hashtag1', 'hashtag2'],
        likes: ['likes of post with id ' + 21, 'user1', 'user2', 'user3']

    };
    console.log(PostList.validatePost(post21));
    console.log("addPost");
    console.log(_posts.addPost(post21));
    console.log("addLike");
    console.log(_posts.addLike(1, "user4"));
    console.log("deleteLike");
    console.log(_posts.deleteLike(1, "user1"));
    console.log("addHashtag");
    console.log(_posts.addHashtag(1, "hashtag3"));
    console.log("deleteHashtag");
    console.log(_posts.deleteHashtag(1, "hashtag1"));
    console.log("All posts:");
    console.log(_posts.getAllPosts());
    console.log("editPost");
    console.log(_posts.editPost(2, { description: "edited description" }));
    console.log("List of all posts:");
    console.log(_posts.getAllPosts());
    console.log("removePost");
    console.log(_posts.removePost(1));
    console.log("All posts:");
    console.log(_posts.getAllPosts());
    console.log("getPosts with hashtag");
    console.log(_posts.getPosts(1, 20, { hashtags: ["hashtags of post with id 19", "hashtag1", "hashtag2"] }));
    let posts2 = [];
    let post22 =
    {
        description: 'description of post with id: ' + 23,
        createdAt: new Date('2020-03-17T23:00:0' + 23),
        author: 'Lesha Malinovski ' + 23,
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg ' + 22,
        hashtags: ['hashtags of post with id ' + 23, 'hashtag1', 'hashtag2'],
        likes: ['likes of post with id ' + 23, 'user1', 'user2', 'user3']
    }
    let post23 =
    {
        id: 23,
        description: 'description of post with id: ' + 23,
        createdAt: new Date('2020-03-17T23:00:0' + 23),
        author: 'Lesha Malinovski ' + 23,
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg ' + 23,
        hashtags: ['hashtags of post with id ' + 23, 'hashtag1', 'hashtag2'],
        likes: ['likes of post with id ' + 23, 'user1', 'user2', 'user3']
    }
    posts2.push(post22);
    posts2.push(post23);
    console.log("Add posts and get undefined:");
    console.log(_posts.addAll(posts2));
    console.log("All posts:");
    console.log(_posts.getAllPosts());
}());
