import $api from "../http";

export default class BlogService {
    static getPosts() {
        return $api.get("posts");
    }

    static getPost(postid) {
        return $api.get(`posts/${postid}`);
    }
    static updatePost(postid, text, title, author) {
        return $api.put(`posts/${postid}`, {
            text,
            title,
            author,
        });
    }

    static getPostComments(postid) {
        return $api.get(`posts/${postid}/comments`);
    }
}
