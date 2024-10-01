import Link from "next/link";
import { SiInstagram, SiFacebook, SiX } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";

function SocialLinks() {
  return (
    <div className=" flex gap-3">
      <Link href="#">
        <SiInstagram className=" text-slate-200 h-5 w-5 md:w-6 md:h-6" />
      </Link>
      <Link href="#">
        <SiFacebook className=" text-slate-200 h-5 w-5 md:w-6 md:h-6" />
      </Link>
      <Link href="#">
        <Linkedin className=" text-slate-200 h-5 w-5 md:w-6 md:h-6" />
      </Link>
      <Link href="#">
        <SiX className=" text-slate-200 h-5 w-5 md:w-6 md:h-6" />
      </Link>
    </div>
  );
}

export default SocialLinks;
