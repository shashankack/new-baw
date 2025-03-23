import "./Navbar.scss";
import logoWhite from "../../assets/images/white_logo.png";
import logoBlue from "../../assets/images/blue_logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <section className="top-navbar">
        <div
          className="logo-wrapper"
          onClick={() => (window.location.href = "/")}
        >
          <img src={logoWhite} alt="White BAW Logo" className="white-logo" />
          <img src={logoBlue} alt="Black BAW Logo" className="blue-logo" />
        </div>
      </section>

      <section className="bottom-navbar">
        <ul>
          <li>
            <a href="/about">
              <span className="white">ABOUT</span>
              <span className="blue">ABOUT</span>
            </a>
          </li>
          <li>
            <a href="/works">
              <span className="white">WORKS</span>
              <span className="blue"> WORKS</span>
            </a>
          </li>
          <li>
            <a href="#contact">
              <span className="white">CONTACT</span>
              <span className="blue"> CONTACT</span>
            </a>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
