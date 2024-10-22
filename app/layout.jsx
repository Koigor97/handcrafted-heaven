import { nunito } from "./font";
import "../app/globals.css";

function PrivatePageLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} `}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}

export default PrivatePageLayout;
