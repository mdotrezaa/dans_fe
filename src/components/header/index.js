import "./style.scss";
import { DiGithubFull } from "react-icons/di";

function Header() {
  return (
    <header>
      <div className="head-title px-2 flex items-center space-x-1">
        <DiGithubFull size={75} />
        <h1 className="text-2xl">Job</h1>
      </div>
    </header>
  );
}

export default Header;
