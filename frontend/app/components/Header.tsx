import { Link, NavLink } from "react-router";

const Header = () => {

  return (
    <header className="sticky top-0 z-999 flex w-full mx-auto max-w-screen-2xl 2xl:px-4">
      <div className="flex flex-grow items-center justify-between pl-4 py-2 pr-2 bg-white">
        <Link to={'/'}>
        <img width={300} height={50} src={`/scs-logo.webp`} alt="Logo" />
        </Link>
        <div className="flex items-end pr-4">
            <NavLink to={'/settings'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-purple-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
