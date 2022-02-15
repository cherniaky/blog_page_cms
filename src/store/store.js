import axios from "axios";
import { makeAutoObservable } from "mobx";
import $api, { API_URL } from "../http";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";
import BlogService from "../services/BlogService";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(username, password) {
        try {
            let response;
            if (username == "guest" && password == "guest") {
                response = await AuthService.loginAsGuest();
            } else {
                response = await AuthService.login(username, password);
            } // console.log(response);
            Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 15,
            });
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout();
            // console.log(response);
            Cookies.remove("refreshToken");
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            // console.log(error);
            return error;
        }
    }
    async getPost(postid) {
        try {
            const response = await BlogService.getPost(postid);
            // console.log(response);

            return response.data;
        } catch (error) {
            // console.log(error);
            return error;
        }
    }
    async updatePost(postid, text, title, author) {
        try {
            const response = await BlogService.updatePost(
                postid,
                text,
                title,
                author
            );
             console.log(response);

            return response.data;
        } catch (error) {
            // console.log(error);
            return error;
        }
    }
    async getPostComments(postid) {
        try {
            const response = await BlogService.getPostComments(postid);
            // console.log(response);

            return response.data;
        } catch (error) {
            // console.log(error);
            return error;
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            //const response = await $api.get('refresh')
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
            });
            Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 15,
            });
            //console.log(response.data)
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            return error;
        } finally {
            this.setLoading(false);
        }
    }
}
