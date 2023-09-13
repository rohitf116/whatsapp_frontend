import { useRef, useState } from "react";

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
  const inputRef = useRef();
  const [error, setError] = useState("");
  const handlePicture = (e) => {
    let pic = e.target.files[0];

    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`Imgae is not valid`);
      return;
    } else {
      setError("");
      setPicture(pic);
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 sppace-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="readableImage"
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex  item-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload Image
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpg,image/webp"
        onChange={handlePicture}
      />
      <div className="mt-2">
        <p clssName="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default Picture;
