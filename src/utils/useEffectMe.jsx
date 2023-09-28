import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";

function useEffectMe(...args) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((cok) => {
        dispatch(setUser(cok.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [args]);

  return <div>useEffect</div>;
}

export default useEffectMe;
