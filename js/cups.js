let elements = [
  {
    id:(new Date()).getTime() + 1,
    image: "./images/51sdUSo3LvL._AC_UF894,1000_QL80_.jpg",
    title: "Cup for citchen",
    volume: 400,
    material: "glass",
    color: "transperent",
  },
  {
    id:(new Date()).getTime() + 2,
    image: "./images/paper_cup.jpg",
    title: "Paper cup",
    volume: 300,
    material: "paper",
    color: "brown",
  },
  {
    id:(new Date()).getTime() + 3,
    image: "./images/ceramic_cup.jpg",
    title: "Cup for house",
    volume: 400,
    material: "ceramics",
    color: "white, blue",
  },
  {
    id:(new Date()).getTime() + 4,
    image: "./images/metal_cup.jpg",
    title: "Cup for travel",
    volume: 600,
    material: "metal",
    color: "metal",
  },
  {
    id:(new Date()).getTime() + 5,
    image: "./images/plastic_cup.jpg",
    title: "Cup for picnic",
    volume: 200,
    material: "plastic",
    color: "red",
  },
  {
    id:(new Date()).getTime() + 5,
    image: "./images/cold_cup.jpg",
    title: "Starbucks cup",
    volume: 600,
    material: "plastic",
    color: "green",
  },
];

function setDataToChannelStore() {
  localStorage.setItem("cups", JSON.stringify(elements));
}
setDataToChannelStore();