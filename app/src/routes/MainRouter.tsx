import { Route, Routes } from "react-router-dom";
import { paths } from "../core/constants/paths";
import HomePage from "../pages/home/HomePage";
import CategoryPage from "../pages/category/CategoryPage";
import DetailsPage from "../pages/details/DetailsPage";

export default function MainRouter() {
    return (
        <Routes>
            <Route path={paths.home} element={<HomePage />} />
            <Route path={paths.characters} element={<CategoryPage />} />
            <Route path={paths.locations} element={<CategoryPage />} />
            <Route path={paths.episodes} element={<CategoryPage />} />
            <Route path={paths.episodes} element={<CategoryPage />} />
            <Route path={paths.detail(':category', ':id')} element={<DetailsPage />} />
        </Routes>
    );
}