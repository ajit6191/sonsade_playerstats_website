import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAdminAuth } from "./authSlice";

export default function InitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAdminAuth());
  }, [dispatch]);

  return null;
}
