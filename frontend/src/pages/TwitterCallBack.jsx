import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAuthToken, storeUser } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TwitterCallback() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleTwitterAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("Window Location Search: ", window.location.search);

        const error = urlParams.get("error");
        if (error) {
          setMessage("Twitter authorization failed");
          return;
        }

        const code = urlParams.get("code");
        const personaId = urlParams.get("state");
        const userId = localStorage.getItem("userId"); // Retrieve userId from local storage

        if (!code || !personaId || !userId) {
          throw new Error("Missing code, personaId, or userId");
        }

        const response = await axios.get(`${import.meta.env.VITE_BASEURL_BACK_ALIAS}/auth/twitter/token`, {
          params: { code, state: personaId, userId }
        });

        const authToken = response.data.result;
        dispatch(addAuthToken({ personaId, authToken }));
        setMessage("Your Twitter account has been successfully connected!");
        navigate(`/persona/${personaId}/edit`);
      } catch (err) {
        console.error(err);
        setMessage("Failed to connect Twitter account. Please try again.");
      }
    };

    handleTwitterAuth();
  }, [dispatch, location, navigate]);

  return (
    <div className="page-container">
      <p>{message}</p>
    </div>
  );
}
