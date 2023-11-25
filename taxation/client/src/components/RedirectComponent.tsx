import { FC, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";

const RedirectComponent: FC<{ to: To }> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, []);
  return <></>;
};
export default RedirectComponent;
