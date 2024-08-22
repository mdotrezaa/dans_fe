import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { getLists } from "../actions/dataActions";
import Filter from "../components/filter";
import Header from "../components/header";
import { BsThreeDots } from "react-icons/bs";
import "./style.scss";

function Jobs() {
  const [list, setList] = useState([]);
  const [rawList, setRawList] = useState([]);
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getData = (
    pageNumber = 1,
    description = "",
    location = "",
    fulltime = false,
  ) => {
    setIsLoading(true);
    getLists(pageNumber, description, location, fulltime)
      .then((res) => {
        setRawList(res);

        const filteredData = res.filter(
          (item) =>
            item != null &&
            item.title &&
            item.company &&
            item.location &&
            item.created_at,
        );
        if (pageNumber === 1) {
          setList(filteredData);
        } else {
          setList((prevList) => [...prevList, ...filteredData]);
        }
        setPage(pageNumber);
        setHasMore(filteredData.length > 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleChange = (field, value, check) => {
    setParams({ ...params, [field]: value, fulltime: check });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findJobsAPI();
  };

  const findJobsAPI = () => {
    const des = params.description?.toLowerCase() || "";
    const loc = params.location?.toLowerCase() || "";
    getData(1, des, loc, params.fulltime);
    setSearchPerformed(true);
  };

  const redirectDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const loadMore = () => {
    getData(
      page + 1,
      params.description?.toLowerCase(),
      params.location?.toLowerCase(),
      params.fulltime,
    );
  };

  useEffect(() => {
    const { state } = location;
    if (state && (state.description || state.company)) {
      setParams({
        ...params,
        description: state.description || "",
        company: state.company || "",
      });
      getData(1, state.description?.toLowerCase() || "", "", false);
    } else {
      getData();
    }
  }, [location]);

  const shouldShowMoreButton = () => {
    const lastRawItem = rawList[rawList.length - 1];
    return (
      lastRawItem != null &&
      lastRawItem.title &&
      lastRawItem.company &&
      lastRawItem.location &&
      lastRawItem.created_at &&
      hasMore
    );
  };

  return (
    <div className="Lists">
      <Header />
      <Filter
        onSearchChange={(field, value, check) =>
          handleChange(field, value, check)
        }
        defaultDescription={params.description || ""}
        defaultLocation={params.location || ""}
        handleSubmit={(field, value) => handleSubmit(field, value)}
      />
      <div className="data">
        <h2 className="p-3 font-bold">
          {searchPerformed
            ? `Showing ${list.length} job${list.length !== 1 ? "s" : ""} found`
            : "Job List"}
        </h2>
        {list.map((v, index) => (
          <div key={index} className="list">
            <div className="left-list">
              <h4 onClick={() => redirectDetail(v.id)}>{v?.title}</h4>
              <span>
                {v?.company} - <span>{v?.type}</span>
              </span>
            </div>
            <div className="right-list">
              <span>{v?.location}</span>
              <span>
                <Moment fromNow>{v?.created_at}</Moment>
              </span>
            </div>
          </div>
        ))}

        {isLoading ? (
          <div className="flex justify-center w-full">
            {" "}
            <BsThreeDots size={30} />
          </div>
        ) : (
          ""
        )}
      </div>
      {shouldShowMoreButton() && (
        <div className="load-more">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            className="rounded-[4px] font-medium"
          >
            {isLoading ? "Loading..." : "More Jobs"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Jobs;
