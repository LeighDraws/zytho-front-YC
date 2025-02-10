/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";

export function useFetch<T>(API_URL: string, dataKey : string) {
    // Retourne les données récupérées
    const [data, setData] = useState<T[] | null>([]);
    // Gestion du chargement = booléen pour savoir si les données sont entrain d'être chargées ou non
    const [loading, setLoading] = useState<boolean>(true);
    // Gestion des erreurs = Permettra d'afficher un message d'erreur
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse = await axios.get<T[]>(API_URL);
                const data = response.data[dataKey];
                setData(data);
            } catch (err) {
                setError("Erreur lors de la récupération des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [API_URL, dataKey]);  // Le tableau vide [] pour executer l'effect une seule fois au composant

    return { data, loading, error };
}
