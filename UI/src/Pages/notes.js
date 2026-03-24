 
 
 //Preview images code 

 const [imageURLs, setImageURLs] = useState([]);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  
  const urls = files.map(file => URL.createObjectURL(file));
  setImageURLs(prev => [...prev, ...urls]);
};

//-----------------------------------------
 
 const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // for Cloudinary

  const res = await fetch("https://api.cloudinary.com/v1_1/yourname/image/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  const uploadedUrl = data.secure_url; // this is what you store in DB
};


