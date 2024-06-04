import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
} from "../../pages/index";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onTrigger={handleModalClose}>
                  <IngredientDetails />
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
