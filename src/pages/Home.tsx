import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import { clearVideos } from "../store";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(clearVideos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

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
        {uniqueVideos.length ? (
          <InfiniteScroll
            dataLength={uniqueVideos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={uniqueVideos.length < 500}
            loader={<Spinner />}
            height={800}
          >
            <div className="grid gap-y-14 gap-x-8 p-8 lg:grid-cols-3 xl:grid-cols-5">
              {uniqueVideos.map((item, index) => (
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
