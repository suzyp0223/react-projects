import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});

  const onSubmit = useCallback(() => {
    if (text === "") return;
    setSearchParams({ q: text, page: 1 });
  }, [text, searchParams]);

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onKeyUp = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      onSubmit();
    },
    [onSubmit]
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query) return;
    setText(query);
  }, [searchParams]);

  return (
    <TextField
      label="Github User 입력"
      variant="outlined"
      sx={{ margin: "50px auto", width: "80%" }}
      value={text}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder="GitHub 사용자 검색"
      InputProps={{
        endAdornment: (
          <IconButton type="button" onClick={onSubmit}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchInput;
