const ImageBox = (props: {
  src: string;
}) => {

  return (
    <div className="img-box">
      <img src={props.src} />
    </div>
  )
};

export default ImageBox;