import SocialLinks from "../common/SocialLinks";
import Link from "next/link";
import { Button } from "../ui/button";

function Banner() {
  return (
    <div className="flex justify-between bg-accent2-500 py-3 px-5">
      <div className="flex items-center gap-5">
        <p className="text-sm text-background text-ellipsis w-fit truncate max-w-32 md:text-base md:max-w-full">
          Save up to 70% on our Furniture sales
        </p>

        <Button asChild size="sm" className="bg-lime-300 h-6 hover:bg-lime-500">
          <Link href="#" className="text-sm md:text-base">
            Sales
          </Link>
        </Button>
      </div>

      <SocialLinks />
    </div>
  );
}

export default Banner;
