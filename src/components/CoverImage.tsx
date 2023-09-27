import { Card } from "antd";
import React, { useState, useRef } from "react";
import "../styles/dashboard.css";
import { FiUpload } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

const CoverImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div>
      <Card
        title="Upload cover image"
        bordered={false}
        style={{ width: 500, fontSize: "14px" }}
        cover={imagePreview && <img src={imagePreview} alt="Cover Preview" />}
      >
        <input
          type="file"
          id="image-upload"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="image-upload" className="delete-reupload">
          {imagePreview ? (
            <>
              <RiCloseLine size="20px" />
              <span>Delete & re-upload image</span>
            </>
          ) : (
            ""
          )}
        </label>

        {!imagePreview && (
          <div className="cover-image-frame" onClick={handleImageUpload}>
            <div className="upload-images">
              <div className="upload-icon">
                {!imagePreview && <FiUpload size="18px" />}
              </div>

              <label htmlFor="image-upload" className="upload-text-header">
                Upload cover image
              </label>
              {!imagePreview && (
                <p className="upload-text-description">
                  16:9 ratio is recommended. Max image size 1mb
                </p>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CoverImage;
