import { worksData } from "../../data";

import InteractiveGridGallery from "../../components/InteractiveGridGallery/InteractiveGridGallery";

const Works = () => {
  return (
    <>
      <section className="works-section" style={{ height: "100vh" }}>
        <InteractiveGridGallery data={worksData} />
      </section>
    </>
  );
};

export default Works;
