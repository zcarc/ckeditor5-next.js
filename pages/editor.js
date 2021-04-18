import dynamic from "next/dynamic";

const ReactEditor = dynamic(() => import("../components/editor"), {
  ssr: false,
});

const Home = () => {
  return <ReactEditor />;
};
export default Home;
