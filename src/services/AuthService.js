import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        return $api.post(
            "login",
            { username, password },
            {
                withCredentials: true,
            }
        );
    }
    static async loginAsGuest() {
        return $api.post(
            "login",
            { username: "cherniak", password: "123456" },
            {
                withCredentials: true,
            }
        );
    }

    static async logout() {
        return $api.get("logout");
    }
}
