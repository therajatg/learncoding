import style from "./heroContent.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, Link } from "react-router-dom";

export function HeroContent() {
  const url =
    "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video%20library";
  const items = [
    {
      URL: `${url}/react router/react_router_playlist_hlay9f`,
      id: "Gi7VHfOFxF8",
    },
    {
      URL: `${url}/javascript concepts/JavaScript_Playlist_xm8cmq`,
      id: "AvHIlRFENJs",
    },
    {
      URL: `${url}/promise in javascript/promise_playlist_jv13hj`,
      id: "lluVvNFLx5k",
    },
    { URL: `${url}/react hooks/hooks_playlist_tulf4o`, id: "hOQR3o9zAOo" },
    { URL: `${url}/css/css_playlist_xn6apj`, id: "Bvouevo03s4" },
  ];
  const navigate = useNavigate();
  return (
    <Carousel
      className={style.carousel}
      autoPlay
      infiniteLoop
      interval={3000}
      showThumbs={false}
      showIndicators={false}
      onClickItem={(index, item) => {
        if (item.props.link !== undefined) {
          navigate(`tutorial/${item.props.link}`);
        }
      }}
    >
      {items.map((item) => (
        <img
          src={item.URL}
          className={style.image}
          link={item.id}
          key={item.id}
        />
      ))}
    </Carousel>
  );
}
