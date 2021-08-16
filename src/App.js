import { Layout, Row, Spin, Alert, Modal, Typography } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import ColCardBox from "./component/cardBox";
import MoviePoster from "./component/moviePoster";
import SearchBox from "./component/search";

const API_KEY = "faf7e5bb";
const { Header, Content, Footer } = Layout;
const TextTitle = Typography.Title;

const Loader = () => (
  <div style={{ margin: "20px, 0", textAlign: "center" }}>
    <Spin />
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("spider");
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
        console.log(response, "ini respon seacrh");
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="App">
      <Layout className="layout">
        <Header style={{ background: "rgba(121, 133, 118, 0.85)" }}>
          <div style={{ textAlign: "center" }}>
            <TextTitle style={{ color: "#fff", marginTop: "14px" }} level={3}>
              Movie
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
            title="Poster"
            centered
            visible={activeModal}
            onCancel={() => setActiveModal(false)}
            footer={null}
            width={350}
          >
            {detailReq === false ? <MoviePoster {...detail} /> : <Loader />}
          </Modal>
        </Content>

        <Footer style={{ textAlign: "center" }}>Movies</Footer>
      </Layout>
    </div>
  );
}

export default App;
