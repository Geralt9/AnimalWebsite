import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faX,
  faImage,
  faCamera,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import imageCompression from "browser-image-compression";

import "./Profile.css";
import { useAuthenticate } from "./AuthenticateContext.jsx";
import { useEffect, useState, useRef } from "react";
import ReactCrop, { makeAspectCrop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Modal from "./CropModel.jsx";
import setCanvasPreview from "./setCanvasPreview.js";

export default function Profile() {
  const {
    fetchProfile,
    finalCroppedpfpImage,
    setfinalCroppedPfpImage,
    finalCroppedBgImage,
    setfinalCroppedBgImage,
  } = useAuthenticate();

  const [UpdatedProfilePic, setUpdatedPfp] = useState(null);
  const [updatedBG, setUpdatedBG] = useState();

  const [compressedPfp, setCompressedPfp] = useState(null);
  const [compressedBG, setCompressedBG] = useState(null);

  useEffect(() => {
    if (compressedPfp || compressedBG) {
      Profile_Api();
    }
  }, [compressedPfp, compressedBG]);

  useEffect(() => {
    if (UpdatedProfilePic) {
      compressBase64ToFile(UpdatedProfilePic).then(setCompressedPfp);
    }
  }, [UpdatedProfilePic]);

  useEffect(() => {
    if (updatedBG) {
      compressBase64ToFile(updatedBG).then(setCompressedBG);
    }
  }, [updatedBG]);

  async function compressBase64ToFile(base64, quality = 0.6) {
    const res = await fetch(base64);
    const blob = await res.blob();

    const file = new File([blob], "image.jpg", { type: blob.type });

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality,
    });

    return compressedFile;
  }

  async function Profile_Api() {
    try {
      const formData = new FormData();
      if (compressedPfp) formData.append("profile_img", compressedPfp);
      if (compressedBG) formData.append("background_img", compressedBG);

      const Profile_fetch = await fetch("http://localhost:8080/Api/Upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const response = await Profile_fetch.json();

      localStorage.setItem(
        "images",
        JSON.stringify({
          profilePic: response.ProfilePic,
          backgroundPic: response.BackgroundPic,
        })
      );

      setfinalCroppedBgImage(response.BackgroundPic);
      setfinalCroppedPfpImage(response.ProfilePic);
    } catch (error) {
      console.error(error);
      console.log("An error has occured while sending the profile");
    }
  }

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const containerRef = useRef(null);

  const [ModalState, setModalState] = useState(false);
  const [BGPop, setBGPop] = useState(false);
  const [BackgroundPic, setBackgroundPic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageType, setImageType] = useState("");

  const [Crop, setCrop] = useState({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [ProfileBio, setProfileBio] = useState(false);
  const [BioText, setBioText] = useState("");
  const [Bio, setBio] = useState();
  const [BioAlert, setBioAlert] = useState(false);

  async function ModifyBio() {
    try {
      if (BioText === "") {
        console.log("need to input something");
      } else {
        await fetch("http://localhost:8080/Profile/Bio", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Bio_text: BioText }),
        });

        setBioAlert((prev) => !prev);
        setProfileBio(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function GetBio() {
    try {
      const BioRequest = await fetch("http://localhost:8080/Profile/GetBio", {
        method: "GET",
        credentials: "include",
      });

      const response = await BioRequest.json();
      const Biodata = response.Bio_data.Bio;

      setBio(Biodata);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetBio();
  }, [BioAlert]);

  const [petImage, setPetImage] = useState();
  const [UploadedPetdetails, setUploadedPet] = useState();
  const [ModifiedAlert, setModified] = useState(false);

  function HandlePet_image_upload(e) {
    const file = e.target.files[0];
    if (file) {
      setPetImage(file);
    }
  }

  async function HandlePetCard() {
    try {
      if (!petImage) return;

      const formdata = new FormData();
      formdata.append("PetImage", petImage);

      await fetch("http://localhost:8080/Pet/Card", {
        method: "POST",
        body: formdata,
        credentials: "include",
      });

      setModified((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    HandlePetCard();
  }, [petImage]);

  async function GetPetImage() {
    try {
      const PetImage = await fetch("http://localhost:8080/Profile/Pet", {
        method: "GET",
        credentials: "include",
      });

      const response = await PetImage.json();

      if (response.PetImgUrl) {
        setUploadedPet(response.PetImgUrl);
        localStorage.setItem("petImage", JSON.stringify(response.PetImgUrl));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetPetImage();
  }, [ModifiedAlert, petImage]);

  useEffect(() => {
    GetPetForm();
    fetchProfile();

    document.body.style.backgroundColor = "#0047AB";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
      document.body.style.minHeight = "";
    };
  }, []);

  useEffect(() => {
    if (UpdatedProfilePic) {
      setModalState(false);
    }
  }, [UpdatedProfilePic]);

  function HandleClosingModal() {
    if (UpdatedProfilePic) setModalState(false);
    setModalState(false);
  }

  const HandleLoadedBG = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const containerHeight = container.offsetHeight;
    const containerWidth = container.offsetWidth;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 100,
        height: 100,
      },
      width / height,
      containerWidth,
      containerHeight
    );

    setCrop(crop);
  };

  function handleImageUpload(e, type) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImageType(type);

    const reader = new FileReader();
    reader.onload = () => {
      setBackgroundPic(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleBGPop(e) {
    e.preventDefault();
    setBGPop(true);
  }

  const [formState, setFormState] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
    Breed: "",
    Age: "",
    Sex: "",
  });

  function HandleformChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      if (Object.values(formData).some((value) => value === "")) {
        setFormError("One of the fields is Missing");
      } else {
        await fetch("http://localhost:8080/Api/pet/form", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        GetPetForm();
        setFormState((prev) => !prev);
        setFormError("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [Pet_Details, setPetData] = useState();

  async function GetPetForm() {
    try {
      const response = await fetch("http://localhost:8080/Api/pet/Getform", {
        method: "GET",
        credentials: "include",
      });

      const response_data = await response.json();
      setPetData(response_data.petDetails[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {ModalState && (
        <Modal
          isOpen={ModalState}
          onClose={HandleClosingModal}
          setUpdatedPfp={setUpdatedPfp}
        />
      )}

      <section className={`BG_CropPopUp ${BGPop ? "Visible" : "Hidden"}`}>
        <div className={BGPop ? "Container_Crop" : "Container_Crop_Before"} ref={containerRef}>
          <button
            className="closePopUp"
            onClick={() => {
              setBGPop(false);
              setBackgroundPic(null);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>

          <input
            type="file"
            accept="image/*"
            id="BG"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e, "Background")}
          />

          <label htmlFor="BG" className={BackgroundPic ? "BG_Uploaded_label" : "Bg_non_uploaded_label"}>
            Upload Image
          </label>

          {BackgroundPic && (
            <section className="BG_Crop_element">
              <ReactCrop
                crop={Crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                ruleOfThirds
                style={{ width: "100%", height: "100%" }}
                locked={true}
                disabled={false}
              >
                <img
                  src={BackgroundPic}
                  className="BackgroundUpload"
                  onLoad={HandleLoadedBG}
                  style={{ display: "block", maxWidth: "100%" }}
                  ref={imgRef}
                />
              </ReactCrop>

              <button
                className="ApplyCrop"
                onClick={() => {
                  setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    convertToPixelCrop(Crop, imgRef.current.width, imgRef.current.height)
                  );
                  const dataUrl = previewCanvasRef.current.toDataURL();
                  setUpdatedBG(dataUrl);
                  setBackgroundPic(null);
                  setBGPop(false);
                }}
              >
                Crop Image
              </button>

              <canvas
                className="Preview_Box"
                ref={previewCanvasRef}
                style={{
                  display: "none",
                  border: "1px solid black",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                }}
              />
            </section>
          )}
        </div>
      </section>

      <main className="profile_page">
        <div className="profile_feed">
          <section className="profile_header">
            <div className="Background_Image">
              <FontAwesomeIcon
                icon={faImage}
                className={finalCroppedBgImage ? "HiddenBgSilouhette" : "BgSilouhette"}
              />

              <button className="AddBG" onClick={handleBGPop}>
                <FontAwesomeIcon icon={faCamera} />
              </button>

              {finalCroppedBgImage && (
                <img
                  src={finalCroppedBgImage}
                  className="BackgroundUpload"
                  onLoad={HandleLoadedBG}
                  style={{ display: "block", maxWidth: "100%" }}
                  ref={imgRef}
                />
              )}
            </div>

            <div className="profile_identity">
              <div className="Pfp">
                {finalCroppedpfpImage ? (
                  <img className="Default_Pfp" src={finalCroppedpfpImage} alt="Profile" />
                ) : (
                  <img
                    className="Default_Pfp"
                    src="https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                    alt="Default profile"
                  />
                )}

                <FontAwesomeIcon
                  icon={faPen}
                  className="ModifyPfp"
                  onClick={() => setModalState(true)}
                />
              </div>
            </div>
          </section>

          <section className="Profile_details1">
            <div className="Bio card">
              <div className="Bio_Title">About / Bio</div>

              {ProfileBio ? (
                <div className="bio_editor">
                  <textarea
                    className="Bio_text"
                    value={BioText}
                    onChange={(e) => setBioText(e.target.value)}
                  />
                  <button className="Save_bio" onClick={ModifyBio}>
                    Save
                  </button>
                </div>
              ) : (
                <div className="Text_Bio_Container">
                  <div className="bio_content">{Bio}</div>
                  <button className="Edit_Bio" onClick={() => setProfileBio(true)}>
                    Edit Bio <FontAwesomeIcon className="Bio_pen" icon={faPen} />
                  </button>
                </div>
              )}
            </div>

            <div className="Pet_details card">
              <div className="Pet_title">Pet details</div>

              <div className="pet_main">
                {formState ? (
                  <form className="Pet_form">
                    <label>Name :</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Input your pet's name"
                      value={formData.Name}
                      onChange={HandleformChange}
                    />

                    <label>Breed :</label>
                    <input
                      type="text"
                      name="Breed"
                      placeholder="Enter your pet's breed"
                      value={formData.Breed}
                      onChange={HandleformChange}
                    />

                    <label htmlFor="age">Age (in years) :</label>
                    <input
                      type="number"
                      id="age"
                      name="Age"
                      min="0"
                      max="100"
                      value={formData.Age}
                      onChange={HandleformChange}
                    />

                    <label>Sex :</label>

                    <div className="sex_options">
                      <label>
                        <input
                          type="radio"
                          name="Sex"
                          value="male"
                          checked={formData.Sex === "male"}
                          onChange={HandleformChange}
                        />{" "}
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Sex"
                          value="female"
                          checked={formData.Sex === "female"}
                          onChange={HandleformChange}
                        />{" "}
                        Female
                      </label>
                    </div>

                    {formError && <div className="Form_Error">{formError}</div>}

                    <div className="pet_form_actions">
                      <button className="Submit_Pet_Card" onClick={handleFormSubmit}>
                        Save
                      </button>
                      <button
                        type="button"
                        className="Cancel_Pet_Card"
                        onClick={() => setFormState(false)}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="form_details">
                    <div id="Form_title">Form details</div>

                    <div id="form_sub_element">Pet Name : {Pet_Details?.name}</div>
                    <div id="form_sub_element">Age : {Pet_Details?.age}</div>
                    <div id="form_sub_element">Sex : {Pet_Details?.sex}</div>
                    <div id="form_sub_element">Breed : {Pet_Details?.breed}</div>

                    <button className="Edit_form_Butt" onClick={() => setFormState(true)}>
                      Edit Pet details
                    </button>
                  </div>
                )}

                <div className="pet_media_panel">
                  <div className="pet_image">
                    {UploadedPetdetails ? (
                      <img className="pet-image" src={UploadedPetdetails} alt="Pet" />
                    ) : (
                      <img className="animal_silhouette" src="../Icons_Images/Dog.png" alt="Dog silhouette" />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      id="pet_image"
                      style={{ display: "none" }}
                      onChange={(e) => HandlePet_image_upload(e)}
                    />

                    <label
                      htmlFor="pet_image"
                      className="pet_image_upload"
                      style={UploadedPetdetails && { display: "none" }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </label>
                  </div>

                  {UploadedPetdetails && (
                    <label htmlFor="pet_image" className="pet_image_reupload">
                      <FontAwesomeIcon icon={faImage} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="Routes_box card">Routes</div>
          </section>
        </div>
      </main>
    </>
  );
}