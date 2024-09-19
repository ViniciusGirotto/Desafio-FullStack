import Link from "next/link";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { name: "Niveis", path: "/niveis" },
  { name: "Desenvolvedores", path: "/desenvolvedores" },
];

export function NavBar({ containerStyles, linkStyles, underLineStyles }: any) {
  const path = usePathname();
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`capitalize ${linkStyles}`}
        >
          {link.path === path && (
            <motion.span
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ type: "tween" }}
              layoutId="underline"
              className={`${underLineStyles}`}
            />
          )}
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
