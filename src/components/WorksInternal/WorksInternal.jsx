import { useParams } from "react-router-dom";
import { worksData } from "../../data";
import ImageSlider from "../ImageSlider/ImageSlider";

import "./WorksInternal.scss";

const WorksInternal = () => {
  const { slug } = useParams();
  const workItem = worksData.find((item) => item.redirect === `/works/${slug}`);

  if (!workItem) {
    return <div>No work item found.</div>;
  }

  return (
    <div className="works-internal-container">
      {/* Left Section */}
      <div key={workItem.id} className="left-container">
        <div className="top">
          <div className="image-slider">
            <ImageSlider
              images={workItem.images[0].one}
              direction="horizontal"
            />
          </div>
          <div className="logo-section">
            <img src={workItem.logo} alt="" className="logo" />
          </div>
        </div>
        <div className="bottom">
          <div className="description">
            <p>
              BAW Studio is a creative hub established to deliver cutting-edge
              production, engaging social media management, innovative web
              design, and dynamic content creation. Our mission is to empower
              brands and artists by providing comprehensive solutions that
              enhance their digital presence and market impact. With a team of
              experienced professionals dedicated to excellence, we tailor our
              services to meet the unique.
            </p>
          </div>
          <div className="image-slider">
            <ImageSlider
              images={workItem.images[1].two}
              direction="horizontal"
            />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="right-container">
        <ImageSlider images={workItem.images[2].three} direction="vertical" />
      </div>
    </div>
  );
};

export default WorksInternal;
