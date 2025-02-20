import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Book } from "../../types/Book";

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const response = await fetch(`https://managementbook-be.onrender.com/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        } else {
          alert("Không tìm thấy sách");
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi khi lấy dữ liệu sách.");
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <h2>Đang tải...</h2>;

  return (
    <div className="container mt-2">
      <h1>Chi Tiết Sách</h1>
      <p><strong>Tên:</strong> {book.title}</p>
      <p><strong>Tác giả:</strong> {book.author}</p>
      <p><strong>Năm:</strong> {book.year}</p>
      <button className="py-1 px-2 rounded-1" onClick={() => router.push("/")}>
        <i className="fa-solid fa-backward-step pe-1"></i>
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default BookDetail;
