import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function DefaultLayout() {

  return <div className="flex bg-whiten filler main-container">
      <div className="relative flex flex-1 flex-col">
        <Header />
        <main className="flex filler">
          <div className="flex filler w-full mx-auto max-w-screen-2xl p-4 w-ull">
            <Outlet />
          </div>
        </main>
        <Footer/>
      </div>
    </div>
}
