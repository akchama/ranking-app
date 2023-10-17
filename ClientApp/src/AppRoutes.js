import {Home} from "./components/Home";
import MovieImageArr from "./components/MovieImages";
import AlbumImageArr from "./components/AlbumImages";
import RankItemsContainer from "./components/RankItemsContainer";

const AppRoutes = [
    {
        index: true,
        element: <Home/>
    },
    {
        path: '/rank-movies',
        element: <RankItemsContainer dataType={1} imgArr={MovieImageArr}/>
    },
    {
        path: '/rank-albums',
        element: <RankItemsContainer dataType={2} imgArr={AlbumImageArr}/>
    }
];

export default AppRoutes;
