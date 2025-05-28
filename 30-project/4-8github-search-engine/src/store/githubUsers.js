import axios from "axios";
import { create } from "zustand";

const useGithubUsersStore = create((set) => ({
  users: [],
  totalCount: 0,
  loading: false,

  searchUsers: async (q, page = 1) => {
    if (!q || !page) return;
    set({ loading: true });

    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${q}&per_page=20&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      set({
        loading: false,
        users: res.data.items,
        totalCount: res.data.total_count,
      });
    } catch (error) {
      console.log("API 호출 실패:", error);
      set({ loading: false });
    }
  },
}));

export default useGithubUsersStore;
