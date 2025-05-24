import "./App.css";
import { useCallback, useState, useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { FaRegGrinBeamSweat } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import useIntersectionObserver from "@suzyp0223/use-intersection-observer";
// console.log("useIntersectionObserver: ", useIntersectionObserver);

const AccesKey = `RzET3BuayfQPFkw2I2ughAAj4ox4S0J0WSwJSFogL2M`;
const getKey = (pageIndex, previousPageData, query) => {
  if (!query) return null;
  if (previousPageData && previousPageData?.results?.length === 0) return null;
  return `https://api.unsplash.com/search/photos?client_id=${AccesKey}&page=${
    pageIndex + 1
  }&query=${query}&per_page=12`;
};

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

function App() {
  const [query, setQuery] = useState("");
  const ref = useRef();
  const isIntersecting = useIntersectionObserver(ref);
  const onKeyDown = useCallback((event) => {
    if (event.key === "Enter" && event.target.value.trim().length > 0) {
      setQuery(event.target.value.trim());
    }
  }, []);

  const { data, error, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, query),
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    }
  );

  const photos = data?.map((item) => item.results).flat() ?? [];
  const isEmpty = data?.[0]?.results?.length === 0;
  const isEnd = photos.length === data?.[0]?.total;
  const isLoading = (!data & !error && query) || isValidating;

  useEffect(() => {
    if (isIntersecting && !isEnd && !isLoading) {
      setSize((oldSize) => oldSize + 1);
    }
  }, [isIntersecting, setSize, isEnd, isLoading]);

  return (
    <>
      <div className="input-container">
        <input
          style={{ margin: "30px" }}
          type="text"
          placeholder="검색어를 입력해주세요."
          className="search-input"
          onKeyDown={onKeyDown}
        />
      </div>
      {isEmpty ? (
        <div className="no-result">
          <FaRegGrinBeamSweat className="no-result-icon" />
          No Images Found
        </div>
      ) : null}
      <div className="image-container">
        {photos.map(({ id, urls, alt_description }) => (
          <img
            key={id}
            className="image"
            src={urls?.small}
            alt={alt_description || "unsplash image"}
          />
        ))}
      </div>

      <div ref={ref} className="loading">
        {isLoading ? (
          <RotatingLines width="100" strokeColor="white" />
        ) : isEnd && !isEmpty ? (
          <p>- - No More Images - -</p>
        ) : null}
      </div>
    </>
  );
}

export default App;
