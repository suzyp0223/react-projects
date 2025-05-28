import axios from "axios";
import { create } from "zustand";

const useGithubUserStore = create((set) => ({
  user: {},
  loading: false,
  getUser: async (username) => {
    set({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    });
    set({
      loading: false,
      user: res.data,
    });
  },
}));

export default useGithubUserStore;
