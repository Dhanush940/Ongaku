// import { AiOutlineHome } from "react-icons/ai";
// import { BsSearchHeartFill } from "react-icons/bs";

// export const array = [
//   {
//     icon: AiOutlineHome,
//     text: "Home",
//   },
//   {
//     icon: BsSearchHeartFill,
//     text: "Search",
//   },
// ];

export interface SpotifyItem {
  image: string;
  text1: string;
  text2: string;
}

export const spotify: SpotifyItem[] = [
  {
    image: "https://i.scdn.co/image/ab67706f000000028aac8628d0ae78c212d69117",
    text1: "Today's Top Hits",
    text2: "Post Malone is on top of the Hottest 50!",
  },
  {
    image: "https://i.scdn.co/image/ab67706f00000002e5382c6955d7aee148ac4e07",
    text1: "RapCaviar",
    text2: "New music from Travis Scott, Drake, Central Cee and Offset.",
  },
  {
    image: "https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1",
    text1: "All Out 2010s",
    text2: "The biggest songs of the 2010s.",
  },
  {
    image: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e",
    text1: "Rock Classics",
    text2:
      "Rock legends & epic songs that continue to inspire generations. Cover: Foo Fighters",
  },
];
