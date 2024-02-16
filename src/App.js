import React, { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const organizedQuotes = organizeQuotes(quotes);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory selection when a new category is selected
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const displayQuotes = () => {
    if (!selectedCategory) return [];

    if (selectedSubcategory) {
      return organizedQuotes[selectedCategory][selectedSubcategory];
    }

    // Flatten all subcategory quotes into a single array if no subcategory is selected
    return Object.values(organizedQuotes[selectedCategory]).flat();
  };


 return (
    <div>
      <div>
        {Object.keys(organizedQuotes).map((category) => (
          <button key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div>
          {Object.keys(organizedQuotes[selectedCategory]).map((subcategory) => (
            <button key={subcategory} onClick={() => handleSubcategorySelect(subcategory)}>
              {subcategory}
            </button>
          ))}
        </div>
      )}
      <div>
        {displayQuotes().map((quote, index) => (
          <p key={index}>
            "{quote.text}" - <em>{quote.author}</em>
          </p>
        ))}
      </div>
    </div>
  );
};

export default QuotesOrganizer;
