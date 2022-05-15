import ReactLoading from "react-loading";

export function Loader() {
  const centerLoader: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    left: 0,
  };

  return (
    <div style={centerLoader}>
      <ReactLoading
        type={"bars"}
        color={"#000"}
        height={"70px"}
        width={"70px"}
      />
    </div>
  );
}
