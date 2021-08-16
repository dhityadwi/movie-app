import { Card, Row, Col, Tag } from "antd";
import "antd/dist/antd.css";

const { Meta } = Card;
const API_KEY = "faf7e5bb";

const ColCardBox = ({
  Title,
  imdbID,
  Poster,
  Type,
  ShowDetail,
  DetailRequest,
  ActiveModal,
}) => {
  const clickHandler = () => {
    ActiveModal(true);
    DetailRequest(true);

    fetch(`http://www.omdbapi.com?i=${imdbID}&apikey=${API_KEY}`)
      .then((respon) => respon)
      .then((respon) => respon.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response);
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  return (
    <Col style={{ margin: "20px 0" }} className="gutter-row" span={4}>
      <div className="gutter-box">
        <Card
          style={{ width: 200 }}
          cover={
            <img
              alt={Title}
              src={
                Poster === "N/A"
                  ? "https://placehold.it/198x264&text=Image+Not+Found"
                  : Poster
              }
            />
          }
          onClick={() => clickHandler()}
        >
          <Meta title={Title} description={false} />
          <Row style={{ marginTop: "10px" }} className="gutter-row">
            <Col>
              <Tag color="magenta">{Type}</Tag>
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  );
};

export default ColCardBox;
