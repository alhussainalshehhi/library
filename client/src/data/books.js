const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15175523-L.jpg",
    description:
      "A classic novel set in the 1920s that explores wealth, love, and the illusion of the American Dream through the mysterious life of Jay Gatsby.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description:
      "A dystopian novel depicting a totalitarian society under constant surveillance, where independent thought is suppressed and truth is controlled.",
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/14627222-L.jpg",
    description:
      "A fantasy adventure following Bilbo Baggins as he joins a group of dwarves on a dangerous journey to reclaim their homeland from a dragon.",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/8090214-L.jpg",
    description:
      "A romantic novel that explores love, social class, and personal growth through the evolving relationship between Elizabeth Bennet and Mr. Darcy.",
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15153500-L.jpg",
    description:
      "A powerful story addressing racial injustice and moral growth in the American South, seen through the eyes of a young girl named Scout.",
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15172466-L.jpg",
    description:
      "A coming-of-age story that follows Holden Caulfield as he struggles with identity, loneliness, and the transition into adulthood.",
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/14846947-L.jpg",
    description:
      "A futuristic novel portraying a highly controlled society driven by technology, conditioning, and the loss of individuality.",
  },
  {
    id: 8,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/15092781-L.jpg",
    description:
      "A science fiction epic set on a desert planet, exploring politics, religion, and survival in a complex and dangerous universe.",
  },
  {
    id: 9,
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/15154728-L.jpg",
    description:
      "The beginning of a magical journey where a young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
  },
  {
    id: 10,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/15131000-L.jpg",
    description:
      "An epic fantasy tale of friendship and courage, following a group on a quest to destroy a powerful ring and save Middle-earth.",
  },
  {
    id: 11,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15121528-L.jpg",
    description:
      "A philosophical novel about a shepherd’s journey to find treasure, discovering deeper truths about life and following one’s dreams.",
  },
  {
    id: 12,
    title: "The Fault in Our Stars",
    author: "John Green",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/7285167-L.jpg",
    description:
      "A heartfelt love story between two teenagers dealing with illness, exploring themes of life, loss, and meaningful connections.",
  },
  {
    id: 13,
    title: "Twilight",
    author: "Stephenie Meyer",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/14352258-L.jpg",
    description:
      "A supernatural romance that tells the story of a human girl and a vampire, exploring love, danger, and sacrifice.",
  },
  {
    id: 14,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/15139410-L.jpg",
    description:
      "A dystopian story where teenagers are forced to compete in a televised survival game, highlighting themes of power and rebellion.",
  },
  {
    id: 15,
    title: "Percy Jackson & The Lightning Thief",
    author: "Rick Riordan",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/14858779-L.jpg",
    description:
      "A modern fantasy adventure where a young boy discovers he is the son of a Greek god and must navigate a world of mythological dangers.",
  },
  {
    id: 16,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/12195363-L.jpg",
    description:
      "A classic novel following an orphaned girl’s journey toward independence, love, and self-respect in a restrictive society.",
  },
  {
    id: 17,
    title: "Dracula",
    author: "Bram Stoker",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/12622155-L.jpg",
    description:
      "A gothic horror novel about a vampire count who brings terror to England, blending suspense, fear, and supernatural elements.",
  },
  {
    id: 18,
    title: "Frankenstein",
    author: "Mary Shelley",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/12752093-L.jpg",
    description:
      "A dark science fiction story about a scientist who creates life, raising questions about ambition, responsibility, and humanity.",
  },
  {
    id: 19,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15162763-L.jpg",
    description:
      "A deeply emotional story of friendship, betrayal, and redemption set in Afghanistan, exploring the consequences of past choices.",
  },
  {
    id: 20,
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/11567416-L.jpg",
    description:
      "A fast-paced thriller that follows a symbologist uncovering hidden secrets within art and history, leading to shocking discoveries.",
  },
  {
    id: 21,
    title: "The Maze Runner",
    author: "James Dashner",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/14830679-L.jpg",
    description:
      "A fantasy series where children enter a magical world filled with mythical creatures, epic battles, and the struggle between good and evil.",
  },
];

export default books;
