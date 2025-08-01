import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const ImageUploadForm = ({ image, setNewProduct }) => {
  const fileInputRef = useRef(null);

  // const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image to upload.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setNewProduct((prev) => ({
        ...prev,
        imageUrl: res.data.secure_url,
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      setUploading(false);
      toast.error("Image upload failed. Please try again.");
      console.error("Upload error:", error);
      return;
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <div className="p-4 border rounded-md w-full md:w-md mx-4 ">
      <h2 className="text-xl font-semibold mb-4">Upload Image here</h2>

      <form className="relative " onSubmit={(e) => e.preventDefault()}>
        <label
          htmlFor="imageUpload"
          className="relative block cursor-pointer bg-[#f1e7dd] hover:bg-[#efd4b9] rounded-md text-center"
        >
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            disabled={file && true}
            required
            onChange={handleImageChange}
            className="mb-4 hidden"
          />

          {image ? (
            <img
              src={image}
              alt="Uploaded Preview"
              ref={fileInputRef}
              className="w-full max-h-64 object-cover rounded-md"
            />
          ) : uploading ? (
            <ClipLoader
              color="#9c6a24"
              loading={uploading}
              size={75}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <Plus color="#e3bc9a" className="w-30 h-30 mx-auto" />
          )}
        </label>
      </form>
    </div>
  );
};

export default ImageUploadForm;
