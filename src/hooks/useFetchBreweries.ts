/* eslint-disable @typescript-eslint/no-unused-vars */
import { Brewery } from '../models/BreweryModel';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";

export function useFetchBreweries(API_URL: string) {
    // Retourne les données récupérées
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    // Gestion du chargement = booléen pour savoir si les données sont entrain d'être chargées ou non
    const [loading, setLoading] = useState<boolean>(true);
    // Gestion des erreurs = Permettra d'afficher un message d'erreur
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const response: AxiosResponse = await axios.get(API_URL);
                const data = response.data;
                const breweries = data.breweries;
                setBreweries(breweries);
            } catch (err) {
                setError("Erreur lors de la récupération des bières.");
            } finally {
                setLoading(false);
            }
        };

        fetchBreweries();
    }, [API_URL]);  // Le tableau vide [] pour executer l'effect une seule fois au composant

    return { breweries, loading, error };
}
