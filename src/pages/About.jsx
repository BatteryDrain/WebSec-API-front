import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
        <div>
            <h1>about</h1>
            <p>how to use pic share</p>
        </div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    </>
  );
}

