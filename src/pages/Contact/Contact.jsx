import "./Contact.scss";
import whiteLogo from "../../assets/images/white_logo.png";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="wrapper">
        <div className="left">
          <div className="top">
            <h2>Contact</h2>
            <div className="title-two">
              <h2>Us</h2> <hr />
            </div>
            <p>
              Got an idea or a dream? <br />
              We're here to bring it to life - let's talk.
            </p>
          </div>
          <div className="bottom">
            <div className="image-wrapper">
              <img src={whiteLogo} />
            </div>
            <a href="mailto: bawstudios@gmail.com">bawstudios@gmail.com</a>
          </div>
        </div>
        <div className="right">
          <form action="" method="">
            <input type="text" placeholder="Your Name" name="Name" />
            <input type="email" name="Email" placeholder="Your Email" />
            <input
              type="text"
              name="Comment"
              placeholder="Share your thoughts"
            />
            <button>Share your feedback</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
