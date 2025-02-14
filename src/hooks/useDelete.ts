import { useState } from "react";
import axios from "axios";

export function useDelete() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (userId: number, beerId: number) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`https://zythologue-api-pxf6.onrender.com/fave/user/${userId}/beer/${beerId}`);
      console.log("DELETE")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erreur lors de la suppression des données.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
}
