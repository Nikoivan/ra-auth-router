import imgUrl from "./not-foundjpg.jpg";

export default function NotFound() {
  return (
    <div className="NotFound">
      <img className="NotFound-Img" src={imgUrl} alt="Not Found Page" />
    </div>
  );
}
