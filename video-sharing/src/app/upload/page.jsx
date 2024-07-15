// client

"use client";
import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!title || !author) {
        alert("Title and Author are required fields.");
        return;
      }

      const formData = new FormData();

      formData.append("filename", selectedFile);
      console.log("nihal");

      const tempResponse = await axios.post(
        "http://localhost:8080/temp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from /temp API:", tempResponse);
      formData.delete("filename");
      formData.append("filename", selectedFile.name);
      console.log("nihal");
      const initializeRes = await axios.post(
        "http://localhost:8080/upload/initialize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { uploadId } = initializeRes.data;
      console.log("Upload id is ", uploadId);

      const chunkSize = 5 * 1024 * 1024; // 5 MB chunks
      const totalChunks = Math.ceil(selectedFile.size / chunkSize);

      let start = 0;
      const uploadPromises = [];
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const chunk = selectedFile.slice(start, start + chunkSize);
        start += chunkSize;
        const chunkFormData = new FormData();
        chunkFormData.append("filename", selectedFile.name);
        chunkFormData.append("chunk", chunk);
        chunkFormData.append("totalChunks", totalChunks);
        chunkFormData.append("chunkIndex", chunkIndex);
        chunkFormData.append("uploadId", uploadId);

        const uploadPromise = axios.post(
          "http://localhost:8080/upload",
          chunkFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadPromises.push(uploadPromise);
      }
      await Promise.all(uploadPromises);
      const completeRes = await axios.post(
        "http://localhost:8080/upload/complete",
        {
          filename: selectedFile.name,
          totalChunks: totalChunks,
          uploadId: uploadId,
          title: title,
          description: description,
          author: author,
        }
      );

      console.log(completeRes.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="relative mx-auto w-[70%] justify-start left-0 p-10">
      <div className="text-[50px] tracking-wider font-extrabold pb-6">Upload... </div>
      <form encType="multipart/form-data">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-3 py-2 w-full  rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
                    className="px-3 py-2 w-full  rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
                    className="px-3 py-2 w-full  rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
                    className="px-3 py-2 w-full  rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="text-white bg-gradient-to-br hover:scale-105 transition-all duration-150 bg-black shadow-lg shadow-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
