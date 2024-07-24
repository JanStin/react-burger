import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { TUser, TRootState } from "../../utils/types";

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TProtectedProps): React.JSX.Element | null => {
  const isAuthChecked: boolean = useSelector(
    (store: TRootState) => store.user.isAuthChecked
  );
  const user: TUser = useSelector((store: TRootState) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = (props: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected {...props} />;

export const OnlyUnAuth = (props: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth={true} {...props} />;
