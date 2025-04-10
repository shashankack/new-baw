import "./Navbar.scss";
import logoWhite from "../../assets/images/white_logo.png";
import logoBlue from "../../assets/images/blue_logo.png";
import logoBlack from "../../assets/images/black_logo.png";

const Navbar = ({ dark = false }) => {
  return (
    <nav className="navbar">
      <section className="top-navbar">
        <div
          className="logo-wrapper"
          onClick={() => (window.location.href = "/")}
        >
          <img
            src={dark ? logoBlack : logoWhite}
            alt="White BAW Logo"
            className={dark ? "black-logo" : "white-logo"}
          />
          <img src={logoBlue} alt="Black BAW Logo" className="blue-logo" />
        </div>
      </section>

      <section className="bottom-navbar">
        <ul>
          <li>
            <a href="/about">
              <span className={dark ? "black" : "white"}>ABOUT</span>
              <span className="blue">ABOUT</span>
            </a>
          </li>
          <li>
            <a href="/works">
              <span className={dark ? "black" : "white"}>WORKS</span>
              <span className="blue"> WORKS</span>
            </a>
          </li>
          <li>
            <a href="/contact">
              <span className={dark ? "black" : "white"}>CONTACT</span>
              <span className="blue"> CONTACT</span>
            </a>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
