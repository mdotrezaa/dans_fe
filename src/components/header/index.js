import "./style.scss";
import { DiGithubFull } from "react-icons/di";

function Header() {
  return (
    <header>
      <div className="head-title px-2 flex items-center space-x-1">
        <DiGithubFull className="text-[80px]" />
        <h1 className="text-2xl">Job</h1>
      </div>
    </header>
  );
}

export default Header;
