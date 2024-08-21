import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { getDetail, getListsByCompany } from "../actions/dataActions";
import Header from "../components/header";
import "./style.scss";

function Detail() {
  const [detail, setDetail] = useState([]);
  const [other, setOthers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = () => {
    getDetail(id)
      .then((res) => {
        setDetail(res);
        getListsByCompany(res.company.toLowerCase())
          .then((res) => setOthers(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNavigateToList = () => {
    navigate("/", {
      state: { description: detail.company },
    });
  };

  return (
    <div className="App">
      <Header />
      <button
        className="flex my-4 mx-[20px] items-center"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack className="text-gray-500" />
        <span className="back">Back</span>
      </button>
      <div className="detail">
        <div className="top">
          <span className="title">
            {detail.type} / {detail.location}
          </span>
          <h2 className="text-2xl text-[#446ea1] font-bold">{detail.title}</h2>
        </div>
        <div className="flex space-x-4 p-4">
          <div className="left-column">
            <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
          </div>
          <div className="right-column">
            <div className="company">
              <div className="top flex items-center justify-between">
                <span>{detail.company}</span>
                {other.length ? (
                  <button
                    className="border-[1px] p-2 text-[#446ea1] font-bold text-xs"
                    onClick={handleNavigateToList}
                  >
                    {other.length} Jobs
                  </button>
                ) : (
                  ""
                )}
              </div>
              <img src={detail.company_logo} alt={detail.company} />
              <div className="bottom">
                <span>{detail.company_url}</span>
              </div>
            </div>
            <div className="how-to">
              <div className="top">
                <div
                  dangerouslySetInnerHTML={{ __html: detail.how_to_apply }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
