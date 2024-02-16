// src/QuotesOrganizer.js
import React from 'react';
import quotes from './famousQuotes';

function organizeQuotes(quotes) {
  const tree = {};

  quotes.forEach((quote) => {
    if (!tree[quote.category]) {
      tree[quote.category] = {};
    }

    if (!tree[quote.category][quote.subcategory]) {
      tree[quote.category][quote.subcategory] = [];
    }

    tree[quote.category][quote.subcategory].push(quote);
  });

  return tree;
}

const QuotesOrganizer = () => {
  const organizedQuotes = organizeQuotes(quotes);

  return (
    <div>
      {Object.entries(organizedQuotes).map(([category, subcategories]) => (
        <div key={category}>
          <h2>{category}</h2>
          {Object.entries(subcategories).map(([subcategory, quotes]) => (
            <div key={subcategory}>
              <h3>{subcategory}</h3>
              <ul>
                {quotes.map((quote, index) => (
                  <li key={index}>
                    "{quote.text}" - <em>{quote.author}</em>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuotesOrganizer;
