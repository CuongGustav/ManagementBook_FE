import React, {useEffect, useState} from "react";
import BookList from "@/components/BookList";
import { Book } from "../types/Book"; 


const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  useEffect (() => {
    const fetchBooks = async () => {
      const response = await fetch(`https://managementbook-be.onrender.com/books`);
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);
  return (
    <div className="container">
      <h1 className="pt-2">Have A Good Day</h1>
      <BookList books={books} />
    </div>
  );
};

export default Home;