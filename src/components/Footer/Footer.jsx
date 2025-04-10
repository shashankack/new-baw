import "./Footer.scss";

import whiteLogo from "../../assets/images/white_logo.png";
import {
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io";

const Footer = () => {
  return (
    <section className="footer-container">
      <div className="footer-left">
        <img src={whiteLogo} alt="BAW Logo" />
        <div className="footer-middle">
          <a href="/#web">WEB</a>
          <a href="/#social">SOCIAL</a>
          <a href="/#branding">BRANDING</a>

          <a className="email" href="mailto: bawstudios@gmail.com">
            www.bawstudios@gmail.com
          </a>
        </div>
      </div>

      <div className="footer-right">
        <div className="socials">
          <a href="#">
            <IoLogoInstagram />
          </a>
          <a href="#">
            <IoLogoLinkedin />
          </a>
          <a href="#">
            <IoLogoWhatsapp />
          </a>
          <a href="#">
            <IoLogoTwitter />
          </a>
        </div>
        <p className="copyright">Copyright©2024 BAW // All Rights Reserved</p>
      </div>
    </section>
  );
};

export default Footer;
