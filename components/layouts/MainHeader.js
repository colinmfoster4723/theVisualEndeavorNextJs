import Link from "next/link";
import BackgroundCanvas from "./BackgroundCanvas";

import classes from "./main-header.module.css";
function MainHeader() {
  return (
    <div>
      <BackgroundCanvas className={classes.contain}>
        <header className={classes.header}>
          <div className={classes.logo}>
            <Link href="/">the Visual Endeavor</Link>
          </div>
          <nav className={classes.navigation}>
            <Link href="/gallery">GALLERY</Link>

            <Link href="/artists">ARTISTS</Link>

            <Link href="/about">ABOUT</Link>
          </nav>
        </header>
      </BackgroundCanvas>
    </div>
  );
}

export default MainHeader;
