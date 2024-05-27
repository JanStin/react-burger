import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/home";
import Header from "../app-header/App-header";
import styles from "./styles.module.css";

function App() {
  return (
    <>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
