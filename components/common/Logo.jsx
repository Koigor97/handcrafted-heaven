import Image from "next/image";

function Logo({ className }) {
  return (
    <div className={className}>
      <Image
        src="/handcrafted-haven-logo.png"
        alt="handcrafted-haven logo"
        width={273}
        height={305}
      />
    </div>
  );
}

export default Logo;
