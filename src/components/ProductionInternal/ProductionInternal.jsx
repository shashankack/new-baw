import React from "react";
import "./ProductionInternal.scss";
import ImageSlider from "../ImageSlider/ImageSlider";
import { productionData } from "../../data";
import { useParams } from "react-router-dom";
import arrow from "../../assets/images/arrow.png";

const ProductionInternal = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { slug } = useParams();
  const productionItem = productionData.find(
    (item) => item.redirect === `/production/${slug}`
  );

  return (
    <div className="production-internal-container">
      <div className="left">
        <div className="top">
          <h1>{productionItem.title_one}</h1>
          <h1>{productionItem.title_two}</h1>
        </div>

        <div className="middle">
          <div className="client">
            <h3>Client</h3>
            <p>{productionItem.client}</p>
          </div>
          <div className="involvement">
            <h3>Involvement</h3>
            {productionItem.involvement.split(", ").map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
          </div>
          <div className="deliverables">
            <h3>Deliverables</h3>
            {productionItem.deliverables.split(", ").map((item, index) => (
              <p key={index}>{item.trim()}</p>
            ))}
          </div>
        </div>

        <div className="bottom">
          <div className="description">
            <h3>BRAND OVERVIEW</h3>
            <p>{productionItem.description}</p>
          </div>
          <div
            className="arrow"
            title="Go Back"
            onClick={() => window.history.back()}
          >
            <img src={arrow} />
          </div>
        </div>
      </div>
      <div className="right">
        <ImageSlider
          images={productionItem.images}
          direction={isMobile ? "horizontal" : "vertical"}
        />
      </div>
    </div>
  );
};

export default ProductionInternal;
