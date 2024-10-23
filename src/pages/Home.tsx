import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { HomePageVideos } from "../Types";
import Card from "../components/Card";
import { clearVideos } from "../store";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(clearVideos());
  }, [dispatch]);

  // Fetch videos on component mount
  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  // Remove duplicate videos by `videoId`
  const uniqueVideos = videos.filter(
    (video, index, self) =>
      self.findIndex((v) => v.videoId === video.videoId) === index
  );

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {uniqueVideos.length ? (
          <InfiniteScroll
            dataLength={uniqueVideos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={uniqueVideos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-16 grid-cols-4 p-8">
              {uniqueVideos.map((item, index) => (
                // Ensure unique key with `videoId` and `index`
                <Card data={item} key={`${item.videoId}-${index}`} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
