import React from "react";

function Footer() {
  return (
    <div className="flex h-[75px] items-center justify-center">
      <div>&copy; Jesse van der Voet {new Date().getFullYear()}</div>
    </div>
  );
}

export default Footer;
