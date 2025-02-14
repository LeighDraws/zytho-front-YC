/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "axios";

export function usePost() {

  const [error, setError] = useState<string | null>(null);

  const postData = async (beerId: number, userId: number) => {
    setError(null);

    try {
      await axios.post(`https://zythologue-api-pxf6.onrender.com/fave/user/${beerId}/${userId}`)
      console.log('Post!', beerId, userId);

    } catch (err) {
      setError("Erreur lors de l'envoi des données.");
    }
  };

  return { postData, error };
}
