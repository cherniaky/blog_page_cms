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
    static togglePublishPost(postid) {
        return $api.post(`posts/${postid}`);
    }
    static deletePost(postid) {
        return $api.delete(`posts/${postid}`);
    }

    static getPostComments(postid) {
        return $api.get(`posts/${postid}/comments`);
    }

    static deleteComment(postid, commentid) {
        return $api.delete(`posts/${postid}/comments/${commentid}`);
    }
    static deleteComments(postid) {
        return $api.delete(`posts/${postid}/comments`);
    }
}
