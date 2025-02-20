// pages/book/update/[id].tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Book } from "../../../types/Book"; 


const UpdateBook = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);
 
  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const response = await fetch(`https://managementbook-be.onrender.com/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
          setUpdatedBook(data);
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

  // Handle book update
  const handleUpdate = async () => {
    if (!updatedBook) {
      console.error("updatedBook is null");
      return;
    }

    try {
      const response = await fetch(`https://managementbook-be.onrender.com/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        alert("Cập nhật sách thành công!");
        router.push("/"); 
      } else {
        alert("Không thể cập nhật sách");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật sách:", err);
      alert("Lỗi khi cập nhật sách.");
    }
  };

  // If book data is not yet fetched
  if (!book) return <h2>Đang tải...</h2>;

  return (
    <div className="container mt-3">
      <h1>Cập Nhật Sách</h1>
      <div className="d-flex flex-column flex-md-row mt-1 mb-2">
        <label className={`col-4 col-md-2 col-lg-1  `}>
          Tên sách:
        </label>
        <input
          type="text"
          className="col-md-5 ps-2"
          value={updatedBook?.title || ""}
          onChange={(e) => setUpdatedBook({ ...updatedBook!, title: e.target.value })}
        />
        
      </div>
      <div className="d-flex flex-column flex-md-row mt-1 mb-2">
        <label className={`col-4 col-md-2 col-lg-1  `}>
          Tác giả:
        </label>
        <input
          type="text"
          className="col-md-5 ps-2"
          value={updatedBook?.author || ""}
          onChange={(e) => setUpdatedBook({ ...updatedBook!, author: e.target.value })}
        />
      </div>
      <div className="d-flex flex-column flex-md-row mt-1 mb-2">
        <label className={`col-4 col-md-2 col-lg-1  `}>
          Năm xuất bản:
        </label>
        <input
          type="number"
          className="col-md-5 ps-2"
          value={updatedBook?.year || ""}
          onChange={(e) => setUpdatedBook({ ...updatedBook!, year: Number(e.target.value) })}
        />
        
      </div>

      <div className="d-flex gap-3 mt-3">
        <button className="py-1 px-2 rounded-1" onClick={() => router.push("/")}>
          <i className="fa-solid fa-backward-step pe-1"></i>
          Quay lại trang chủ
        </button>
        <button className="py-1 px-2 rounded-1" onClick={handleUpdate}>
          <i className="fa-solid fa-save pe-1"></i>
          Lưu thay đổi
        </button>
        
      </div>
    </div>
  );
};

export default UpdateBook;
