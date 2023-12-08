import "./Neto-Main.css";

export default function NetoMain(props: { title?: string }) {
  return (
    <div className="NetoMain">
      {props?.title ? (
        props.title
      ) : (
        <>
          <div className="NetoMain-Title">
            <h2>NetoSocial</h2>
          </div>
          <div className="NetoMain-Description">
            <p>Facebook and VK killer</p>
          </div>
        </>
      )}
    </div>
  );
}
