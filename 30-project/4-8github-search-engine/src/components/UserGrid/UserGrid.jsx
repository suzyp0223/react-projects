import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useGithubUsersStore from "./../../store/githubUsers";
import Pagination from "@mui/material/Pagination";
import UserItem from "../UserItem/UserItem";

const UserGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const { users, totalCount, loading, searchUsers } = useGithubUsersStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = searchParams.get("q");
    const page = searchParams.get("page") || 1;

    if (!query) return;
    searchUsers(query, page);
  }, [searchParams, searchUsers]);

  // 총페이지 계산
  const totalPageCount = useMemo(() => {
    const pageCount = Math.ceil(totalCount / 20);
    return pageCount > 50 ? 50 : pageCount;
  }, [totalCount]);

  const handleChangePage = useCallback(
    (e, number) => {
      setSearchParams({ q: searchParams.get("q"), page: number });
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const page = searchParams.get("page");

    //setCurrentPage(parseInt(page ?? 1));
    if (!page) {
      setCurrentPage(1); // ✅ 기본 페이지 설정
      return;
    }

    // setCurrentPage(parseInt(searchParams.get("page")));
    setCurrentPage(parseInt(page));
  }, [searchParams]);

  if (loading) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "200px" }}
        size={100}
      />
    );
  } else {
    return (
      <>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          columns={{ xs: 2, sm: 3, md: 4 }}
          style={{ padding: "10px" }}
        >
          {users.map((user) => (
            <Grid item xs={1} sm={1} md={1} key={user.id}>
              <UserItem user={user} />
              CircularProgress
            </Grid>
          ))}
        </Grid>
        {totalCount === 0 ? null : (
          <Pagination
            sx={{ margin: "auto", marginTop: "16px" }}
            page={currentPage}
            count={totalPageCount}
            color="primary"
            onChange={handleChangePage}
          />
        )}
      </>
    );
  }
};

export default UserGrid;
