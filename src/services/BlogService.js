import $api from "../http";

export default class BlogService {
    static getPosts() {
        return $api.get("posts");
    }
}
