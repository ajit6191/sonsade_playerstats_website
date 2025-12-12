import React, { useState } from "react";

function Upload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [teamId, setTeamId] = useState(""); // select from teams
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file || !name || !role || !teamId) {
      alert("Please fill all fields and select an image!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhl5cirq6/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      console.log("Cloudinary URL:", data.secure_url);

      // Send to backend
      await fetch("http://localhost:8000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          team: teamId,
          image: data.secure_url,
        }),
      });

      setFile(null);
      setName("");
      setRole("");
      setTeamId("");
      onUpload(); // Refresh parent
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-component text-center mb-4">
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="ms-2"
      />
      <input type="file" onChange={handleFileChange} className="ms-2" />
      <button
        className="btn btn-primary ms-2"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Player Image"}
      </button>
    </div>
  );
}

export default Upload;
