import React from "react";
import { CreditCardTile } from "../shared.jsx";

export function CardsGrid({ cards, onApply, onCardClick }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((c) => (
        <CreditCardTile
          key={c.id || c._id}
          card={c}
          onApply={onApply}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

