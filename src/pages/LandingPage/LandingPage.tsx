import { Link } from "react-router-dom";

import { PrimaryBtn } from "../../components";
import HeroImg from "../../assets/hero-img.svg";

export const LandingPage = () => {
  return (
    <div className="wrapper flex justify-center items-center">
      <main className="my-4 mx-5 p-5 max-w-screen-lg grid gap-8 place-content-center bg-white rounded-lg md:grid-cols-2 xl:mx-auto">
        <div className="flex flex-col justify-center min-h-60 md:min-h-70 md:ml-10">
          <h1 className="heading text-primary font-bold text-5xl md:mt-6">
            Simple<span className="text-black">Note</span>
          </h1>

          <div className="mt-10">
            <h2 className="heading font-bold text-2xl ">Meet your Modern</h2>
            <h2 className="heading font-bold text-primary mb-6 text-2xl">
              Note Taking App
            </h2>
            <p className="text-lg mb-5">
              Manage your daily tasks and workflow in a modern way and boost
              your efficiency without any effors.
            </p>

            <div>
              <Link to="/signup">
                <PrimaryBtn>Join Now</PrimaryBtn>
              </Link>
              <Link
                to="/login"
                className="block my-2 hover:text-primaryDark hover:underline"
              >
                Already have account?
              </Link>
            </div>
          </div>
        </div>

        <figure className="self-center">
          <img src={HeroImg} alt="" />
        </figure>
      </main>
    </div>
  );
};
