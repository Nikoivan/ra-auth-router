import { useContext, useEffect, useState } from "react";
import http from "../../../assets/services/http";
import Preloader from "../../Preloader/Preloader";
import NewsItem, { NewsItemProps } from "../Item/Neto-Item";
import Context, { ContextTypeProps } from "../../../assets/services/Context";

import "./Neto-News.css";

const NetoNews = () => {
  const [news, setNews] = useState<NewsItemProps[]>([]);
  const { baseUrl, token, logout } = useContext<ContextTypeProps>(Context);

  const getNews = async (token: string) => {
    const response = await http(baseUrl + "/private/news", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response?.error) {
      logout();
    }
    if (response.length) {
      setNews(response);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await getNews(token);
      })();
    }
  }, [token]);

  return (
    <>
      {news.length ? (
        <ul className="Neto-News">
          {news.map((item) => (
            <NewsItem key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default NetoNews;
