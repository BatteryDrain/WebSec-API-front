import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
        <div>
            <h1>Home</h1>
            <p>Welcome to the website.</p>
        </div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    </>
  );
}

