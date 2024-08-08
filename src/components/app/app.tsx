import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { TRootState, useDispatch, useSelector } from "../../services/store";
import { useEffect } from "react";
import { Pages } from "../../pages/index";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Header from "../app-header/app-header";
import { Modal } from "../modal/modal";
import { ActionIngredientsTypes } from "../../services/actions/ingredientsData";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import styles from "./styles.module.css";
import { checkUserAuth } from "../../services/actions/auth";
import { loadIngredients } from "../../services/actions/ingredientsData";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/feed";
import { DetailsOfOrder } from "../details-of-order/details-of-order";
import {
  wsUserConnectionClosed,
  wsUserConnectionStart,
} from "../../services/actions/userFeed";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const user = useSelector(store => store.user.user);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    dispatch({ type: ActionIngredientsTypes.CLOSE_POPUP });
    navigate(-1);
  };

  const handleModalOrderClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
    // eslint-disable-next-line

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    // Подключение к WebSocket
    dispatch(wsConnectionStart());
  }, [dispatch]);

  useEffect(() => {
    // Подключение к WebSocket
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <Header />
        <Routes location={background || location}>
          <Route path="/" element={<Pages.HomePage />} />
          <Route
            path="/ingredients/:id"
            element={<Pages.IngredientDetailsPage />}
          />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<Pages.LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<Pages.RegisterPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<Pages.ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<OnlyAuth component={<Pages.ProfileOrdersPage />} />}
          />
          <Route
            path="/profile/orders/:number"
            element={<OnlyAuth component={<Pages.DetailsOrder />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<Pages.ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<Pages.ResetPasswordPage />} />}
          />
          <Route path="/feed" element={<Pages.FeedPage />} />
          <Route path="/feed/:number" element={<Pages.DetailsOrder />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
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
        {background && (
          <Routes>
            <Route
              path="/feed/:number"
              element={
                <Modal title="" onTrigger={handleModalOrderClose}>
                  <DetailsOfOrder />
                </Modal>
              }
            />
          </Routes>
        )}

        {background && (
          <Routes>
            <Route
              path="/profile/orders/:number"
              element={
                <Modal title="" onTrigger={handleModalOrderClose}>
                  <DetailsOfOrder />
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
