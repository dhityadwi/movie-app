import {
  Layout,
  Input,
  Row,
  Col,
  Card,
  Tag,
  Spin,
  Alert,
  Modal,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";

const API_KEY = "faf7e5bb";
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;

const SearchBox = ({ searchHandler }) => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Search
          placeholder="Search Movie"
          enterButton="Search"
          size="large"
          onSearch={(value) => searchHandler(value)}
        />
      </Col>
    </Row>
  );
};

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

const MovieDetail = ({
  Title,
  Poster,
  imdbRating,
  Rated,
  Runtime,
  Genre,
  Plot,
}) => {
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
      <Col span={13}>
        <Row>
          <Col span={21}>
            <TextTitle level={4}></TextTitle>
          </Col>
          <Col span={3} style={{ textAlign: "right" }}>
            <TextTitle level={4}>
              <span style={{ color: "#41A8F8" }}>{imdbRating}</span>
            </TextTitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Tag>{Rated}</Tag>
            <Tag>{Runtime}</Tag>
            <Tag>{Genre}</Tag>
          </Col>
        </Row>
        <Row>
          <Col>{Plot}</Col>
        </Row>
      </Col>
    </Row>
  );
};

const Loader = () => (
  <div style={{ margin: "20px, 0", textAlign: "center" }}>
    <Spin />
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("batman");
  const [activeModal, setActiveModal] = useState(false);
  const [detail, setDetail] = useState(false);
  const [detailReq, setDetailReq] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      .then((respon) => respon)
      .then((respon) => respon.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          setData(response.Search);
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div style={{ textAlign: "center" }}>
            <TextTitle style={{ color: "#fff", marginTop: "14px" }} level={3}>
              OMDB API
            </TextTitle>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <SearchBox searchHandler={setQuery} />
            <br />

            <Row gutter={16} type="flex" justify="center">
              {loading && <Loader />}

              {error !== null && (
                <div style={{ margin: "20px 0" }}>
                  <Alert message={error} type="error" />
                </div>
              )}

              {data !== null &&
                data.length > 0 &&
                data.map((result, index) => (
                  <ColCardBox
                    ShowDetail={setDetail}
                    DetailRequest={setDetailReq}
                    ActiveModal={setActiveModal}
                    key={index}
                    {...result}
                  />
                ))}
            </Row>
          </div>

          <Modal
            title="Detail"
            centered
            visible={activeModal}
            onCancel={() => setActiveModal(false)}
            footer={null}
            width={800}
          >
            {detailReq === false ? <MovieDetail {...detail} /> : <Loader />}
          </Modal>
        </Content>

        <Footer style={{ textAlign: "center" }}>OMDB Movies</Footer>
      </Layout>
    </div>
  );
}

export default App;
