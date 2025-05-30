const ImageBox = (props: {
  src: string;
}) => {

  return (
    <div className="img-box">
      <img src={props.src} className="img" />
    </div>
  )
};

export default ImageBox;