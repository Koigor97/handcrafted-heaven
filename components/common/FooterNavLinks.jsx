import Link from "next/link";

function FooterNavLinks({ navTitle, navLinks }) {
  return (
    <div>
      <h4 className="font-bold mb-1 text-text-600">{navTitle}</h4>
      <ul className="pl-2">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.path}
              className="text-text-600 text-sm hover:text-text-800 hover:underline md:text-base"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterNavLinks;
