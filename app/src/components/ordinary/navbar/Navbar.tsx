import { Link } from "react-router-dom";
import { paths } from "../../../core/constants/paths";

export default function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to={paths.home}>главная</Link></li>
                    <li><Link to={paths.characters}>герои</Link></li>
                    <li><Link to={paths.locations}>локации</Link></li>
                    <li><Link to={paths.episodes}>эпизоды</Link></li>
                </ul>
            </nav>
        </>
    );
}