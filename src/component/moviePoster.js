import { Row, Col } from "antd";
import "antd/dist/antd.css";

const MoviePoster = ({ Title, Poster }) => {
  return (
    <Row>
      <Col span={11}>
        <img
          src={
            Poster === "N/A"
              ? "https://placehold.it/198x264&text=Image+Not+Found"
              : Poster
          }
          alt={Title}
        />
      </Col>
    </Row>
  );
};

export default MoviePoster;
