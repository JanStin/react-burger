import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home } from "../../pages/home/home";
import { IngredientsDetails } from "../../pages/ingredient-details/ingredients-details";
import Header from "../app-header/App-header";
import { Modal } from "../modal/modal";
import { CLOSE_POPUP } from "../../services/actions/ingredientsData";
import styles from "./styles.module.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    dispatch({ type: CLOSE_POPUP });
    navigate(-1);
  };

  return (
    <>
      <div className={styles.app}>
        <Header />
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients/:id" element={<IngredientsDetails />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onTrigger={handleModalClose}>
                  <IngredientsDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
