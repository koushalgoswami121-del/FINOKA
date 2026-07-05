interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentImage({
  src,
  alt,
  className = "",
}: TransparentImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}

