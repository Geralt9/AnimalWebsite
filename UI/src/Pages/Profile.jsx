import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faX,
  faCamera,
  faPlus,
  faPaw,
  faCircleUser,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import imageCompression from "browser-image-compression";

import "./Profile.css";

const API = import.meta.env.VITE_API_URL;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
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
    UserName,
  } = useAuthenticate();

  const [UpdatedProfilePic, setUpdatedPfp] = useState(null);
  const [updatedBG, setUpdatedBG] = useState();

  const [compressedPfp, setCompressedPfp] = useState(null);
  const [compressedBG, setCompressedBG] = useState(null);

  const [uploadError, setUploadError] = useState('');
  const [isPetUploading, setIsPetUploading] = useState(false);

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
    setUploadError('');
    try {
      const formData = new FormData();
      if (compressedPfp) formData.append("profile_img", compressedPfp);
      if (compressedBG) formData.append("background_img", compressedBG);

      const Profile_fetch = await fetch(`${API}/Api/Upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!Profile_fetch.ok) {
        const errData = await Profile_fetch.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `Upload failed (${Profile_fetch.status})`);
      }

      const response = await Profile_fetch.json();

      setfinalCroppedBgImage(response.BackgroundPic);
      setfinalCroppedPfpImage(response.ProfilePic);
    } catch (error) {
      console.error(error);
      setUploadError('Failed to upload image. Please try again.');
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
        await fetch(`${API}/Profile/Bio`, {
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

  function CancelBioEdit() {
    setBioText(Bio || "");
    setProfileBio(false);
  }

  async function GetBio() {
    try {
      const BioRequest = await fetch(`${API}/Profile/GetBio`, {
        method: "GET",
        credentials: "include",
      });

      const response = await BioRequest.json();
      const Biodata = response.Bio_data?.Bio;

      setBio(Biodata);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetBio();
  }, [BioAlert]);

  const [petImage, setPetImage] = useState();
  const [petImagePreview, setPetImagePreview] = useState(null);
  const [UploadedPetdetails, setUploadedPet] = useState();
  const [ModifiedAlert, setModified] = useState(false);
  const petImageInputRef = useRef(null);

  function HandlePet_image_upload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError(`"${file.name}" is not a supported image type.`);
      return;
    }
    setUploadError('');
    setPetImage(file);
  }

  useEffect(() => {
    if (!petImage) {
      setPetImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(petImage);
    setPetImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [petImage]);

  function CancelPetImage() {
    setPetImage(undefined);
    setUploadError('');
    if (petImageInputRef.current) petImageInputRef.current.value = '';
  }

  async function HandlePetCard() {
    if (!petImage) return;
    setIsPetUploading(true);
    setUploadError('');
    try {
      const formdata = new FormData();
      formdata.append("PetImage", petImage);

      const res = await fetch(`${API}/Pet/Card`, {
        method: "POST",
        body: formdata,
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed (${res.status})`);
      }

      setModified((prev) => !prev);
      setPetImage(undefined);
      if (petImageInputRef.current) petImageInputRef.current.value = '';
    } catch (error) {
      console.error(error);
      setUploadError('Failed to upload pet image. Please try again.');
    } finally {
      setIsPetUploading(false);
    }
  }
  // Auto-submit removed — pet image is now saved via an explicit popup.

  async function GetPetImage() {
    try {
      const PetImage = await fetch(`${API}/Profile/Pet`, {
        method: "GET",
        credentials: "include",
      });

      const response = await PetImage.json();

      if (response.PetImgUrl) {
        setUploadedPet(response.PetImgUrl);
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

    document.body.style.backgroundColor = "#fefae0";
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
        await fetch(`${API}/Api/pet/form`, {
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
      const response = await fetch(`${API}/Api/pet/Getform`, {
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

      <section className={`bg-crop-overlay ${BGPop ? "bg-crop-overlay--visible" : ""}`}>
        <div className="bg-crop-panel" ref={containerRef}>
          <button
            className="bg-crop-panel__close"
            aria-label="Close"
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

          <label htmlFor="BG" className="bg-crop-upload">
            {BackgroundPic ? "Choose a different photo" : "Upload cover photo"}
          </label>

          {BackgroundPic && (
            <section className="bg-crop-stage">
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
                  className="bg-crop-stage__img"
                  onLoad={HandleLoadedBG}
                  style={{ display: "block", maxWidth: "100%" }}
                  ref={imgRef}
                />
              </ReactCrop>

              <button
                className="bg-crop-apply"
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
                Crop &amp; Apply
              </button>

              <canvas
                className="crop-canvas--hidden"
                ref={previewCanvasRef}
              />
            </section>
          )}
        </div>
      </section>

      <main className="profile-page">
        <div className="profile-sheet">
          <section className="profile-cover">
            <div className="profile-cover__media">
              <FontAwesomeIcon
                icon={faPaw}
                className={finalCroppedBgImage ? "profile-cover__paw profile-cover__paw--hidden" : "profile-cover__paw"}
              />

              {finalCroppedBgImage && (
                <img
                  src={finalCroppedBgImage}
                  className="profile-cover__img"
                  onLoad={HandleLoadedBG}
                  ref={imgRef}
                  alt="Cover"
                />
              )}
            </div>

            <button className="profile-cover__edit" onClick={handleBGPop} aria-label="Edit cover photo">
              <FontAwesomeIcon icon={faCamera} />
            </button>

            <div className="profile-identity">
              <div className="profile-avatar">
                {finalCroppedpfpImage ? (
                  <img className="profile-avatar__img" src={finalCroppedpfpImage} alt="Profile" />
                ) : (
                  <div className="profile-avatar__placeholder">
                    <FontAwesomeIcon icon={faCircleUser} />
                  </div>
                )}

                <button
                  className="profile-avatar__edit"
                  aria-label="Edit profile picture"
                  onClick={() => setModalState(true)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            </div>
          </section>

          <div className="profile-identity__caption">
            <h1 className="profile-identity__name">{UserName || "Your profile"}</h1>
            <span className="profile-identity__tag">Pet parent</span>
          </div>

          <section className="profile-grid">
            <div className="journal-card journal-card--bio">
              <div className="journal-card__header">
                <span className="journal-card__eyebrow">About</span>
                <h2 className="journal-card__heading">Field Notes</h2>
              </div>

              {ProfileBio ? (
                <div className="bio-editor">
                  <textarea
                    className="bio-editor__textarea"
                    placeholder="Tell the community about yourself and your pets..."
                    value={BioText}
                    onChange={(e) => setBioText(e.target.value)}
                  />
                  <div className="bio-editor__actions">
                    <button className="pf-btn pf-btn--solid" onClick={ModifyBio}>
                      Save
                    </button>
                    <button type="button" className="pf-btn pf-btn--ghost" onClick={CancelBioEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bio-view">
                  <p className="bio-view__text">
                    {Bio || "No bio yet — share a little about yourself and the pets you love."}
                  </p>
                  <button className="pf-btn pf-btn--ghost" onClick={() => setProfileBio(true)}>
                    <FontAwesomeIcon icon={faPen} /> Edit bio
                  </button>
                </div>
              )}
            </div>

            <div className="journal-card journal-card--pet">
              <div className="journal-card__header">
                <span className="journal-card__eyebrow">Pet Passport</span>
                <h2 className="journal-card__heading">{Pet_Details?.name || "Pet details"}</h2>
              </div>

              <div className="pet-record">
                {formState ? (
                  <form className="pet-form">
                    <div className="pet-form__field">
                      <label htmlFor="pet-name">Name</label>
                      <input
                        id="pet-name"
                        type="text"
                        name="Name"
                        placeholder="Your pet's name"
                        value={formData.Name}
                        onChange={HandleformChange}
                      />
                    </div>

                    <div className="pet-form__field">
                      <label htmlFor="pet-breed">Breed</label>
                      <input
                        id="pet-breed"
                        type="text"
                        name="Breed"
                        placeholder="Your pet's breed"
                        value={formData.Breed}
                        onChange={HandleformChange}
                      />
                    </div>

                    <div className="pet-form__field">
                      <label htmlFor="pet-age">Age (years)</label>
                      <input
                        type="number"
                        id="pet-age"
                        name="Age"
                        min="0"
                        max="100"
                        value={formData.Age}
                        onChange={HandleformChange}
                      />
                    </div>

                    <div className="pet-form__field">
                      <label>Sex</label>
                      <div className="pet-form__sex">
                        <label className="pet-form__sex-option">
                          <input
                            type="radio"
                            name="Sex"
                            value="male"
                            checked={formData.Sex === "male"}
                            onChange={HandleformChange}
                          />
                          Male
                        </label>
                        <label className="pet-form__sex-option">
                          <input
                            type="radio"
                            name="Sex"
                            value="female"
                            checked={formData.Sex === "female"}
                            onChange={HandleformChange}
                          />
                          Female
                        </label>
                      </div>
                    </div>

                    {formError && <div className="pet-form__error">{formError}</div>}

                    <div className="pet-form__actions">
                      <button className="pf-btn pf-btn--solid-invert" onClick={handleFormSubmit}>
                        Save
                      </button>
                      <button
                        type="button"
                        className="pf-btn pf-btn--icon-invert"
                        aria-label="Cancel"
                        onClick={() => setFormState(false)}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="pet-record__details">
                    <dl className="pet-record__stats">
                      <div className="pet-record__stat">
                        <dt>Name</dt>
                        <dd>{Pet_Details?.name || "—"}</dd>
                      </div>
                      <div className="pet-record__stat">
                        <dt>Breed</dt>
                        <dd>{Pet_Details?.breed || "—"}</dd>
                      </div>
                      <div className="pet-record__stat">
                        <dt>Age</dt>
                        <dd>{Pet_Details?.age ?? "—"}</dd>
                      </div>
                      <div className="pet-record__stat">
                        <dt>Sex</dt>
                        <dd>{Pet_Details?.sex || "—"}</dd>
                      </div>
                    </dl>

                    <button className="pf-btn pf-btn--ghost-invert" onClick={() => setFormState(true)}>
                      <FontAwesomeIcon icon={faPen} /> Edit pet details
                    </button>
                  </div>
                )}

                <div className="pet-record__photo-panel">
                  <div className="pet-record__photo">
                    {UploadedPetdetails ? (
                      <img className="pet-record__photo-img" src={UploadedPetdetails} alt="Pet" />
                    ) : (
                      <img className="pet-record__photo-silhouette" src="../Icons_Images/Dog.png" alt="Pet silhouette" />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      id="pet_image"
                      ref={petImageInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => HandlePet_image_upload(e)}
                    />

                    {UploadedPetdetails ? (
                      <label htmlFor="pet_image" className="pet-record__photo-edit" aria-label="Change pet photo">
                        <FontAwesomeIcon icon={faCamera} />
                      </label>
                    ) : (
                      <label htmlFor="pet_image" className="pet-record__photo-add" aria-label="Add pet photo">
                        <FontAwesomeIcon icon={faPlus} />
                      </label>
                    )}
                  </div>

                  {petImage && (
                    <div className="pet-photo-popup" role="dialog" aria-label="Save new pet photo">
                      <div className="pet-photo-popup__preview">
                        {petImagePreview && <img src={petImagePreview} alt="Selected pet" />}
                      </div>
                      <div className="pet-photo-popup__actions">
                        <button
                          type="button"
                          className="pet-photo-popup__save"
                          onClick={HandlePetCard}
                          disabled={isPetUploading}
                        >
                          {isPetUploading ? "Saving…" : "Save"}
                        </button>
                        <button
                          type="button"
                          className="pet-photo-popup__cancel"
                          aria-label="Cancel new pet photo"
                          onClick={CancelPetImage}
                          disabled={isPetUploading}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                      </div>
                    </div>
                  )}

                  {uploadError && <div className="pet-record__upload-error">{uploadError}</div>}
                </div>
              </div>
            </div>

            <div className="journal-card journal-card--routes">
              <div className="journal-card__header">
                <span className="journal-card__eyebrow">Coming soon</span>
                <h2 className="journal-card__heading">Routes</h2>
              </div>
              <div className="routes-card__body">
                <FontAwesomeIcon icon={faMapLocationDot} className="routes-card__icon" />
                <p className="routes-card__desc">
                  Walk logs, feeding schedules, and vet reminders will live here soon.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
