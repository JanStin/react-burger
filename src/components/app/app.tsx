import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  ProfileOrdersPage,
} from "../../pages/index";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Header from "../app-header/app-header";
import { Modal } from "../modal/modal";
import { CLOSE_POPUP } from "../../services/actions/ingredientsData";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import styles from "./styles.module.css";
import { checkUserAuth } from "../../services/actions/auth";
import { loadIngredients } from "../../services/actions/ingredientsData";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    dispatch({ type: CLOSE_POPUP });
    navigate(-1);
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(checkUserAuth());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // @ts-ignore
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <Header />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<OnlyAuth component={<ProfileOrdersPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
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
