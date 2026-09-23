
import Fashion from "./assets/Fashion.jpg";
import Eating from "./assets/Eating.jpg";
import Writing from "./assets/writing.jpg";
import Photography from "./assets/Photography.jpg";
import Traveling from "./assets/Travelling.jpg";
import Cooking from "./assets/cooking.jpg";
import "./App.css";

//child component

function HobbyCard(props) {
  return (
    <div className="card">

      <img
        src={props.image}
        alt={props.hobby}
      />

      <h2>{props.hobby}</h2>

      <p>{props.description}</p>

    </div>
  );
}

//Parent component
function Display() {
  return (
    <div>
      <h1>My Hobbies</h1>

      <div className="hobby-container">

        <HobbyCard
          image={Fashion}
          hobby="Fashion"
          description="I enjoy staying updated with the latest fashion trends.I love fashion Designing and it's my dream to become a fashion designer."
        />

        <HobbyCard
          image={Eating}
          hobby="Eating"
          description="I enjoy trying out new restaurants and cuisines."
        />

        <HobbyCard
          image={Writing}
          hobby="Writing"
          description="I enjoy writing stories and articles."
        />

        <HobbyCard
          image={Photography}
          hobby="Photography"
          description="I like taking beautiful photos."
        />

        <HobbyCard
          image={Traveling}
          hobby="Traveling"
          description="I enjoy visiting new places."
        />

        <HobbyCard
          image={Cooking}
          hobby="Cooking"
          description="I enjoy cooking different dishes."
        />

      </div>
    </div>
  );
}





export default Display;