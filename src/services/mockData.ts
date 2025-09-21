// Mock data for when API is not accessible
export const mockMovies = {
  results: [
    {
      id: 550,
      title: "Fight Club",
      overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      backdrop_path: "/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
      release_date: "1999-10-15",
      vote_average: 8.4,
      vote_count: 26280,
      genre_ids: [18, 53]
    },
    {
      id: 238,
      title: "The Godfather",
      overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      release_date: "1972-03-14",
      vote_average: 8.7,
      vote_count: 19611,
      genre_ids: [18, 80]
    },
    {
      id: 424,
      title: "Schindler's List",
      overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
      poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
      backdrop_path: "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
      release_date: "1993-12-15",
      vote_average: 8.6,
      vote_count: 15374,
      genre_ids: [18, 36, 10752]
    },
    {
      id: 372058,
      title: "Your Name",
      overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.",
      poster_path: "/q719jXXEzOoYaps6babgKnONONX.jpg",
      backdrop_path: "/F6KZyJNEyql5pn4xSJgZ6BtcXE.jpg",
      release_date: "2016-08-26",
      vote_average: 8.5,
      vote_count: 10662,
      genre_ids: [16, 18, 10749]
    },
    {
      id: 278,
      title: "The Shawshank Redemption",
      overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
      poster_path: "/9cqNxx0GxF0bflyCy3dznLCsa6z.jpg",
      backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
      release_date: "1994-09-23",
      vote_average: 8.7,
      vote_count: 26280,
      genre_ids: [18, 80]
    },
    {
      id: 680,
      title: "Pulp Fiction",
      overview: "A burger-loving hit man, his philosophical partner, a drug-addicted gangster's moll and a washed-up boxer converge in this sprawling crime caper.",
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
      release_date: "1994-09-10",
      vote_average: 8.5,
      vote_count: 27280,
      genre_ids: [18, 80]
    }
  ],
  total_pages: 1,
  total_results: 6
};

export const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export const mockMovieDetails = {
  550: {
    id: 550,
    title: "Fight Club",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    release_date: "1999-10-15",
    vote_average: 8.4,
    vote_count: 26280,
    runtime: 139,
    genres: [{ id: 18, name: "Drama" }, { id: 53, name: "Thriller" }],
    production_companies: [
      { id: 508, name: "Regency Enterprises" },
      { id: 711, name: "Fox 2000 Pictures" }
    ]
  }
};