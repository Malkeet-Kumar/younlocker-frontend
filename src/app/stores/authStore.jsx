import { API_URL } from "../utils/constant";
import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

class AuthStore {
  user = {
    avatar: null,
    email: null,
    name: null,
    role: null,
    credits: 0
  };
  isInitialized = false;
  isAuthenticated = false;
  isSubmitting = false;
  error = null;
  success = null;
  pageAccess = [];

  constructor() {
    makeObservable(this, {
      login: action,
      logout: action,
      initialize: action,
      register: action,
      user: observable,
      error: observable,
      success: observable,
      isAuthenticated: observable,
      isInitialized: observable,
      isSubmitting: observable,
      pageAccess: observable
    });
  }

  async initialize() {
    try {
      const response = await axios.get("/auth/profile");
      const { data } = response.data;
      runInAction(() => {
        this.isAuthenticated = true;
        this.user = { ...data.user };
        this.pageAccess = [...data.pageAccess];
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
        if (err.response) {
          this.error = "Session Expired! Please log in again.";
        } else if (err.request) {
          this.error = "Server is unavailable!";
        } else {
          this.error = "An unexpected error occurred!";
        }
      });
    } finally {
      runInAction(() => {
        this.isInitialized = true;
      });
      console.log("Initialization completed");
    }
  }

  async login(email, password) {
    runInAction(() => {
      this.error = null;
      this.isSubmitting = true;
    });
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { data } = response.data;
      runInAction(() => {
        this.isAuthenticated = true;
        this.user = { ...data.user };
        this.pageAccess = [...data.pageAccess];
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.response ? error.response.data.msg : "Server is unavailable!";
      });
    } finally {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  }

  async register(email, name, password) {
    runInAction(() => {
      this.error = null;
      this.isSubmitting = true;
    });
    try {
      await axios.post("/auth/register", { email, name, password });
      runInAction(() => {
        this.success = true;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.response ? error.response.data.msg : "Server is unavailable!";
      });
    } finally {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  }

  async logout() {
    try {
      await axios.get("/auth/logout");
      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
        this.pageAccess = [];
        this.error = null;
        this.success = "Logged out successfully.";
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.error = error.response
          ? error.response.data.msg
          : "An error occurred while logging out!";
      });
    }
  }

  get getPageAccess(){
    return this.pageAccess.map(p=>({...p,access:""}))
  }
}

export default AuthStore;
