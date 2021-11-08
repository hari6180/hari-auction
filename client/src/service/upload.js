class UploadService {
  async upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "czyfv6b0");
    const result = await fetch("https://api.cloudinary.com/v1_1/dulmvnb0a/image/upload", {
      method: "POST",
      body: data,
    });
    return await result.json();
  }
}

export default UploadService;
