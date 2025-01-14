/* eslint-disable @typescript-eslint/no-unused-vars */
import { Beer } from "../models/BeerModel"
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";

export function useFetchBeers(API_URL: string) {
    // Retourne les données récupérées
    const [beers, setBeers] = useState<Beer[]>([]);
    // Gestion du chargement = booléen pour savoir si les données sont entrain d'être chargées ou non
    const [loading, setLoading] = useState<boolean>(true);
    // Gestion des erreurs = Permettra d'afficher un message d'erreur
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                const response: AxiosResponse = await axios.get(API_URL);
                const data = response.data;
                const beers = data.beers;
                setBeers(beers);
            } catch (err) {
                setError("Erreur lors de la récupération des bières.");
            } finally {
                setLoading(false);
            }
        };

        fetchBeers();
    }, [API_URL]);  // Le tableau vide [] pour executer l'effect une seule fois au composant

    return { beers, loading, error };
}
