import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);
            console.log(response)
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
            console.log(response);
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async checkAuth() {
        try {
            const response = axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
            });

             localStorage.setItem("token", response.data.accessToken);
             this.setAuth(true);
             this.setUser(response.data.user);
        } catch (error) {
            return error;
        }
    }
}
