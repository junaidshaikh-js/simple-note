import ReactLoading from "react-loading";

export const InlineLoader = () => {
  const centerLoader = {
    display: "inline-block",
  };
  return (
    <div style={centerLoader}>
      <ReactLoading
        type={"bars"}
        color={"#000"}
        height={"50%"}
        width={"30px"}
      />
    </div>
  );
};
