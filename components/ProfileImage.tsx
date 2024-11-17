import Image from 'next/image';

type ProfileImageProps = {
  src: string;
  alt?: string;
  size?: number;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = 'Profile Image',
  size = 100,
}) => {
  return (
    <div
      className="rounded-full shadow-md overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  );
};

export default ProfileImage;
