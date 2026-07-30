"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Calendar,
  Camera,
  Check,
  Edit,
  Loader2,
  Mail,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import Cropper from "react-easy-crop";

import { getCurrentUser, updateProfile } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const avatarStoragePrefix = "linknest-profile-avatar:";

function getUserId(user) {
  return user?.id || user?._id || "";
}

function readStoredAvatar(userId) {
  if (typeof window === "undefined" || !userId) {
    return "";
  }

  return localStorage.getItem(`${avatarStoragePrefix}${userId}`) || "";
}

function saveAvatarSnapshot(userId, avatar) {
  if (typeof window === "undefined" || !userId) {
    return;
  }

  const key = `${avatarStoragePrefix}${userId}`;

  if (avatar) {
    localStorage.setItem(key, avatar);
  } else {
    localStorage.removeItem(key);
  }
}

async function getCroppedImage(imageSrc, cropPixels) {
  const image = await new Promise((resolve, reject) => {
    const nextImage = new Image();

    nextImage.onload = () => resolve(nextImage);
    nextImage.onerror = () =>
      reject(new Error("Unable to load the selected image."));

    nextImage.src = imageSrc;
  });
const canvas = document.createElement("canvas");
  const size = Math.min(cropPixels.width, cropPixels.height);

  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to crop the selected image.");
  }

  context.save();
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.closePath();
  context.clip();

  context.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    size,
    size
  );

  context.restore();

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  if (!blob) {
    throw new Error("Unable to create cropped image.");
  }

  return new File([blob], `avatar-${Date.now()}.png`, {
    type: "image/png",
  });
}

function Avatar({
  name,
  src,
  sizeClassName,
  onChangePhoto,
  onRemovePhoto,
}) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "LN";

  return (
    <div className={`group relative shrink-0 ${sizeClassName}`}>
      <div className="absolute -inset-2 rounded-full bg-linear-to-br from-violet-500/0 via-violet-400/12 to-cyan-400/0 blur-2xl transition duration-500 group-hover:scale-110" />
      <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] ring-1 ring-white/5 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-white/15">
        {src ? (
          <img src={src} alt={name || "Profile avatar"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-white/12 via-white/6 to-violet-500/10 text-2xl font-semibold tracking-[0.16em] text-white/85">
            {initials}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/25 group-hover:opacity-100">
          <button
            type="button"
            onClick={onChangePhoto}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-black/50"
          >
            <Camera className="h-4 w-4" />
            Change Photo
          </button>
        </div>

        {Boolean(src) && (
          <button
            type="button"
            onClick={onRemovePhoto}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/80 opacity-0 backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-black/65 group-hover:opacity-100"
            aria-label="Remove profile image"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ModalShell({ title, subtitle, onClose, children, maxWidthClassName = "max-w-2xl" }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4 py-4 backdrop-blur-xl" onClick={onClose}>
      <div
        className={`w-full ${maxWidthClassName} overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/96 shadow-[0_40px_120px_rgba(0,0,0,0.55)]`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{subtitle}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">{title}</h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition duration-300 hover:bg-white/8 hover:text-white"
              aria-label="Close modal"
            >
              <Check className="h-4 w-4 rotate-45" />
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function EditProfileModal({
  open,
  user,
  name,
  email,
  fieldErrors,
  submitError,
  avatarPreview,
  onClose,
  onUploadImage,
  onRemoveImage,
  onNameChange,
  onEmailChange,
  onSave,
  saving,
}) {
  if (!open) {
    return null;
  }

  return (
    <ModalShell title="Edit Profile" subtitle="Profile Settings" onClose={onClose}>
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[180px,1fr] md:items-start">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-3.5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">Profile Picture</p>
          <div className="mt-3 flex justify-center">
            <Avatar
              name={name || user?.name}
              src={avatarPreview}
              sizeClassName="h-45 w-45"
              onChangePhoto={onUploadImage}
              onRemovePhoto={onRemoveImage}
              showRemovePhoto={Boolean(avatarPreview)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={onUploadImage}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/88 transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/8"
            >
              <Upload className="h-4 w-4" />
              Upload New Image
            </button>
            {avatarPreview && (
              <button
                type="button"
                onClick={onRemoveImage}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-white/74 transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/6 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Remove Image
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {submitError && (
            <div className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{submitError}</p>
            </div>
          )}

          <div className="space-y-3.5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">Full Name</span>
              <input
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/25 focus:border-violet-400/40 focus:bg-white/5"
                placeholder="Enter your full name"
              />
              {fieldErrors.name && <p className="mt-2 text-xs text-rose-300">{fieldErrors.name}</p>}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/25 focus:border-violet-400/40 focus:bg-white/5"
                placeholder="Enter your email address"
              />
              {fieldErrors.email && <p className="mt-2 text-xs text-rose-300">{fieldErrors.email}</p>}
            </label>

            {fieldErrors.avatar && <p className="text-xs text-rose-300">{fieldErrors.avatar}</p>}
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-white/80 transition duration-300 hover:-translate-y-0.5 hover:bg-white/6 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-500 via-violet-600 to-purple-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(124,58,237,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(124,58,237,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Saving Changes" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function AvatarCropModal({
  open,
  imageSrc,
  previewSrc,
  crop,
  zoom,
  cropPixels,
  onCropChange,
  onCropComplete,
  onZoomChange,
  onCancel,
  onSave,
  saving,
  error,
}) {
  if (!open || !imageSrc) {
    return null;
  }

  return (
    <ModalShell title="Crop your profile photo" subtitle="Avatar Crop" onClose={onCancel} maxWidthClassName="max-w-3xl">
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
        <div className="space-y-3">
          <div className="relative h-70 overflow-hidden rounded-3xl border border-white/10 bg-black/35 sm:h-80">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              restrictPosition
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
          </div>
          <p className="text-sm text-white/45">Drag to reposition, then use zoom to fine-tune the crop.</p>
          <div>
            <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/45">
              <span>Zoom</span>
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(event) => onZoomChange(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/3 p-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">Live Preview</p>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-45 w-45 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <img src={previewSrc || imageSrc} alt="Cropped preview" className="h-full w-full object-cover" />
            </div>
          </div>
          {error && (
            <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
              {error}
            </div>
          )}
          
          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-violet-500 via-violet-600 to-purple-500 px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Use This Crop"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { setUser: setAuthUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cropSaving, setCropSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [cropError, setCropError] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [draftAvatar, setDraftAvatar] = useState({ preview: "",  file: null, dirty: false });
  const [cropSourceImage, setCropSourceImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropPreviewSrc, setCropPreviewSrc] = useState("");

  const fileInputRef = useRef(null);
  const previewRequestRef = useRef(0);

  const userId = getUserId(user);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getCurrentUser();
      const currentUser = response?.data?.user || null;

      if (!currentUser) {
        throw new Error("Unable to load profile data.");
      }

      const storedAvatar = readStoredAvatar(getUserId(currentUser));
      const committedAvatar = currentUser.avatar || storedAvatar || "";

      setUser(currentUser);
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setProfileAvatar(committedAvatar);
      setDraftAvatar({ preview: "", file: null, dirty: false });
      setCropSourceImage("");
      setCropPreviewSrc("");
      setActiveModal(null);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.message || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (draftAvatar.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(draftAvatar.preview);
      }
      if (cropSourceImage?.startsWith("blob:")) {
        URL.revokeObjectURL(cropSourceImage);
      }
    };
  }, [draftAvatar.preview, cropSourceImage]);

  const openEditModal = () => {
    setFieldErrors({});
    setSubmitError("");
    setName(user?.name || "");
    setEmail(user?.email || "");
    setActiveModal("edit");
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const closeEditModal = () => {
    setActiveModal(null);
    setFieldErrors({});
    setSubmitError("");
    setName(user?.name || "");
    setEmail(user?.email || "");
    setDraftAvatar({ preview: "", file: null, dirty: false });
  };

  const closeCropModal = () => {
    setActiveModal(null);
    setCropError("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropPreviewSrc("");
    setCropSourceImage("");
  };

  const handleAvatarSelect = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        avatar: "Please choose a valid image file.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        avatar: "Image must be 5MB or smaller.",
      }));
      return;
    }

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      avatar: "",
    }));
    setCropError("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setDraftAvatar({ preview: "", file: null, dirty: false });

    const previewUrl = URL.createObjectURL(file);
    setCropSourceImage(previewUrl);
    setCropPreviewSrc("");
    setActiveModal("crop");
  };

  const handleRemovePhoto = () => {
    setDraftAvatar({ preview: "", file: null, dirty: true });
    setFieldErrors((currentErrors) => ({ ...currentErrors, avatar: "" }));
    setActiveModal("edit");
  };

  const handleCropComplete = async (_croppedArea, nextPixels) => {
  setCroppedAreaPixels(nextPixels);

  if (!cropSourceImage || !nextPixels) return;

  const requestId = previewRequestRef.current + 1;
  previewRequestRef.current = requestId;

  try {
    const file = await getCroppedImage(
      cropSourceImage,
      nextPixels
    );

    const preview = URL.createObjectURL(file);

    if (previewRequestRef.current === requestId) {
      setCropPreviewSrc(preview);
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleSaveCroppedAvatar = async () => {
  if (!cropSourceImage || !croppedAreaPixels) {
    setCropError("Please adjust the crop before saving.");
    return;
  }

  setCropSaving(true);
  setCropError("");

  try {
    const file = await getCroppedImage(
      cropSourceImage,
      croppedAreaPixels
    );

    setDraftAvatar({
      preview: URL.createObjectURL(file),
      file,
      dirty: true,
    });

    closeCropModal();
  } catch (error) {
    console.error(error);
    setCropError(
      error?.message || "Unable to crop the selected image."
    );
  } finally {
    setCropSaving(false);
  }
};

  const validateForm = () => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    return nextErrors;
  };

  const handleSave = async () => {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setSaving(true);
    setSubmitError("");

    try {
     const formData = new FormData();

formData.append("name", name);
formData.append("email", email);

if (draftAvatar.file) {
    formData.append("profileImage", draftAvatar.file);
}

      const response = await updateProfile(formData);
      const updatedUser = response?.data?.user || {};
      const committedAvatar = response.data.user.avatar;
      const nextUser = {
        ...user,
        ...updatedUser,
        avatar: committedAvatar,
      };

      setUser(nextUser);
      setAuthUser(nextUser);g
      setProfileAvatar(committedAvatar || "");
      setDraftAvatar({ preview: "", file: null, dirty: false });
     setActiveModal(null);

      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...parsedUser,
                ...nextUser,
              })
            );
          } catch {
            // Ignore stale local storage payloads.
          }
        }

        saveAvatarSnapshot(userId, committedAvatar || "");
      }
    } catch (saveError) {
      console.error(saveError);
      setSubmitError(
        saveError?.response?.data?.message || saveError?.message || "Unable to save profile changes."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/3 p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <p className="text-lg font-medium text-white/90">Loading profile</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/3 p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-200">
            <AlertCircle className="h-5 w-5" />
          </div>
          <p className="text-lg font-medium text-white/90">Couldn't load your profile</p>
          <p className="mt-2 text-sm text-white/55">{error}</p>
          <button
            type="button"
            onClick={fetchProfile}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/8"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const accountCreated = (() => {
    const dateValue = user?.createdAt;
    if (!dateValue) {
      return "Recently joined";
    }

    const parsedDate = new Date(dateValue);
    return Number.isNaN(parsedDate.getTime())
      ? "Recently joined"
      : new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(parsedDate);
  })();
  const avatarImage = draftAvatar.dirty ? draftAvatar.preview : profileAvatar;

  return (
    <div className="relative space-y-4 overflow-hidden sm:space-y-5">
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 top-28 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl" />

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/6 via-white/3 to-white/2 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <Avatar
              name={user?.name}
              src={avatarImage}
              sizeClassName="h-24 w-24 sm:h-28 sm:w-28 lg:h-[120px] lg:w-[120px]"
              onChangePhoto={openFilePicker}
              onRemovePhoto={handleRemovePhoto}
            />

            <div className="min-w-0 space-y-3">
              <div className="inline-flex items-center rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-violet-200">
                Building your digital library
              </div>

              <div className="space-y-1.5">
                <h1 className="truncate text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl lg:text-[2.2rem]">
                  {user?.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Mail className="h-4 w-4 shrink-0 text-white/45" />
                  <span className="truncate">{user?.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/55">
                <Calendar className="h-4 w-4 shrink-0 text-white/40" />
                <span>Member since {accountCreated}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openEditModal}
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-violet-500 via-violet-600 to-purple-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(124,58,237,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(124,58,237,0.22)]"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/3 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">Account Information</h2>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            { icon: User, label: "Full Name", value: user?.name || "—" },
            { icon: Mail, label: "Email", value: user?.email || "—" },
            { icon: Calendar, label: "Account Created", value: accountCreated },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/5">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75 transition duration-300 group-hover:border-violet-400/20 group-hover:text-white">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{label}</p>
                <p className="mt-1 truncate text-sm font-medium text-white/90 sm:text-[15px]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EditProfileModal
        open={activeModal === "edit"}
        user={user}
        name={name}
        email={email}
        fieldErrors={fieldErrors}
        submitError={submitError}
        avatarPreview={avatarImage}
        onClose={closeEditModal}
        onUploadImage={openFilePicker}
        onRemoveImage={handleRemovePhoto}
        onNameChange={(nextValue) => {
          setName(nextValue);
          setFieldErrors((currentErrors) => ({ ...currentErrors, name: "" }));
        }}
        onEmailChange={(nextValue) => {
          setEmail(nextValue);
          setFieldErrors((currentErrors) => ({ ...currentErrors, email: "" }));
        }}
        onSave={handleSave}
        saving={saving}
      />

      <AvatarCropModal
        open={activeModal === "crop"}
        imageSrc={cropSourceImage}
        previewSrc={cropPreviewSrc}
        crop={crop}
        zoom={zoom}
        cropPixels={croppedAreaPixels}
        onCropChange={setCrop}
        onCropComplete={handleCropComplete}
        onZoomChange={setZoom}
        onCancel={closeCropModal}
        onSave={handleSaveCroppedAvatar}
        saving={cropSaving}
        error={cropError}
      />

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} />
    </div>
  );
}
