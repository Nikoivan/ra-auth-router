import { useContext, useEffect, useState } from "react";
import NetoItem, { NewsItemProps } from "../../Item/Neto-Item";
import Preloader from "../../../Preloader/Preloader";
import Context from "../../../../assets/services/Context";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../../assets/services/http";
import NotFound from "../../../NotFound/NotFound";

const MainPost = () => {
  const [content, setContent] = useState<NewsItemProps>();
  const [error, setError] = useState<string>();
  const { baseUrl, token, logout } = useContext(Context);
  const { postId } = useParams();
  const navigate = useNavigate();

  const getContent = async () => {
    const response = await http(`${baseUrl}/private/news/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.error) {
      setError(response.error);
    }
    setContent(response);
  };

  useEffect(() => {
    (async () => {
      await getContent();
    })();
  }, []);

  return (
    <>
      {error ? (
        <NotFound />
      ) : content ? (
        <NetoItem {...content} />
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default MainPost;
