import React, { useState } from "react";
import { X } from "lucide-react";

export const useImageLightbox = () => {
  const [lightboxImage, setLightboxImage] = useState(null as string | null);

  const LightboxImage = ({
    src,
    alt = "",
    className = "",
  }: {
    src: string;
    alt?: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={`${className} cursor-zoom-in hover:opacity-80 transition-opacity`}
      onClick={() => setLightboxImage(src)}
    />
  );

  const LightboxOverlay = () =>
    lightboxImage && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={() => setLightboxImage(null)}
      >
        <div className="relative">
          <img
            src={lightboxImage}
            alt="Imagen ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            title="Cerrar (ESC)"
          >
            <X size={32} />
          </button>
        </div>
      </div>
    );

  return { LightboxImage, LightboxOverlay, setLightboxImage };
};
