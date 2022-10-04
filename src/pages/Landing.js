import main from "../assets/images/main1.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            smarter <span>Labs</span>
          </h1>
          <p>
            Get access to smarter labs and do practicals in real-time.For your elecronics and electrical practicals ,consider smarter labs.Reseacher,student or science hobbyist? we are at your disposal to build your skills remotely but in real time with our  Labs.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='computer' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
