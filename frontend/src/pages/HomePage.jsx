import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi } from "../services/api.js";
import {
  HeroSection,
  TrustedBanksMarquee,
  CategoryQuickNav,
  HowItWorksTimeline,
  FeaturedCardsSection,
  ExecutiveSubscriptionSection,
} from "../components/home/index.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: cards } = useLiveData(creditCardsApi.getAll, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cards?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/cards");
    }
  };

  return (
    <div className="fin-fade">
      <Seo />
      <HeroSection query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <TrustedBanksMarquee />
      <CategoryQuickNav navigate={navigate} />
      <HowItWorksTimeline />
      <FeaturedCardsSection cards={cards} navigate={navigate} />
      <ExecutiveSubscriptionSection navigate={navigate} />
    </div>
  );
}
