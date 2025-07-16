import React, { useState } from "react";

export default function MiniparkarAI() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);
    setImage(null);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      alert("Image generation failed. Try again.");
      setLoading(false);
      return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setImage(imageUrl);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎨 Miniparkar AI Image Generator</h1>
      <input
        className="p-3 w-full max-w-md rounded shadow text-lg"
        type="text"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
        disabled={loading || prompt === ""}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {image && (
        <div className="mt-6">
          <img src={image} alt="Generated" className="rounded-lg shadow-lg max-w-full" />
          <a
            href={image}
            download="miniparkar-ai-image.png"
            className="block mt-2 text-center text-blue-500 hover:underline"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
