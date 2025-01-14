/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";

export function useFetchOneBeer<Beer>(API_URL: string) {
    // Retourne les données récupérées
    const [beer, setBeer] = useState<Beer>();
    // Gestion du chargement = booléen pour savoir si les données sont entrain d'être chargées ou non
    const [loading, setLoading] = useState<boolean>(true);
    // Gestion des erreurs = Permettra d'afficher un message d'erreur
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBeer = async () => {
            try {
                const response: AxiosResponse = await axios.get<Beer>(API_URL);
                const data = response.data;
                const beer = data.beer;
                setBeer(beer);
            } catch (err) {
                setError("Erreur lors de la récupération des bières.");
            } finally {
                setLoading(false);
            }
        };

        fetchBeer();
    }, [API_URL]);  // Le tableau vide [] pour executer l'effect une seule fois au composant

    return { beer, loading, error };
}
