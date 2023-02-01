import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

export default function RequireAuth({ children }: { children: JSX.Element | JSX.Element[]}): JSX.Element {
    const { idToken } = useSelector((state: RootState) => state.auth);
    return idToken ? children as unknown as JSX.Element : <Navigate to="/" replace /> as unknown as JSX.Element;
  }