import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = (url) => {
  const [gifUrl, setGifUrl] = useState(null);
  const [loading, setLoading] = useState(true);
};
