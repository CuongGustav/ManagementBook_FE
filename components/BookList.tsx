import React, {useState, useEffect} from "react";
import { useRouter } from "next/router"
import { Book } from "../types/Book"; 
import styles from "../styles/BookList.module.css";


interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({books}) => {
    const [bookList, setBookList] = useState<Book[]>(books);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        year: "",
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState<number|null>(null);

    const router = useRouter();

    // DeleteBook
    const handleDelete = async (bookId: number) => {
      setDeleteBookId(bookId);
      setShowDeleteModal(true);
    };
  
    const confirmDelete = async () => {
      try {
        const response = await fetch(`https://managementbook-be.onrender.com/books/${deleteBookId}`, { method: 'DELETE' });
        if (response.status === 200) {
          fetchBooks(); 
        } else {
          alert("Không thể xóa vì bị lỗi");
        }
      } catch (err) {
        console.error(err);
        alert("Đã xảy ra lỗi trong khi xóa cuốn sách.");
      } finally {
        setShowDeleteModal(false);
        setDeleteBookId(null);
      }
    };
  
    // Get all books
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://managementbook-be.onrender.com/books');
        if (response.ok) {
          const data = await response.json();
          setBookList(data);
        } else {
          alert("Không thể lấy danh sách sách vì bị lỗi");
        }
      } catch (err) {
        console.error(err);
        alert("Đã xảy ra lỗi trong khi lấy danh sách sách.");
      }
    };
  
    // Create book
    const handleCreateNewBook = async () => {
      try {
        const response = await fetch("https://managementbook-be.onrender.com/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });
        if (response.ok) {
          setNewBook({ title: "", author: "", year: "" });
          setShowCreateModal(false);
          fetchBooks();
        } else {
          alert("Không thể thêm sách mới");
        }
      } catch (err) {
        console.error(err);
        alert("Đã xảy ra lỗi khi thêm sách mới.");
      }
    };
  
    useEffect(() => {
      fetchBooks();
    }, []);
   
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="align-items-center text-capitalize ">
                    <table className="table-bordered w-100 ">
                        <thead>
                            <tr>
                                <th className="col-4 p-2">Tên sách</th>
                                <th className="col-4 p-2">Tác Giả</th>
                                <th className="col-2 p-2">Năm Xuất Bản</th>
                                <th className="col-2 p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book) => (
                                <tr key={book.id}>
                                    <td className={`p-1 ps-2 ${styles.booklistTitle}`}>
                                      <a className={`${styles.booklistTitleA}`} onClick={() => router.push(`/book/${book.id}`)}>{book.title}</a>
                                    </td>
                                    <td className="p-1 ps-2">{book.author}</td>
                                    <td className="p-1 ps-2">{book.year}</td>
                                    <td className="p-1 ps-2 d-flex justify-content-center gap-2 flex-column flex-lg-row"> 
                                      <button className={`rounded border-1 bg-primary p-1 ${styles.booklistButton}`} onClick={() => router.push(`/book/update/${book.id}`)}>
                                        <i className="fa-solid fa-pen-to-square pe-1  "></i>
                                        Update
                                      </button> 
                                      <button className={`rounded border-1 bg-danger p-1 ${styles.booklistButton}`} onClick={() => handleDelete(book.id)}>
                                        <i className="fa-solid fa-trash pe-1"></i>
                                        Delete
                                      </button> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>          
                </div>
 
            </div>
            <div className="row mt-3">
              <div className="align-items-center">
                <button className="py-1 px-3" onClick={() => setShowCreateModal(true)}>
                  <i className="fa-solid fa-plus pe-2"></i>
                  Thêm mới
                </button>  
              </div>     
            </div>

            {/*Modal Create*/}
            <div className={`modal fade ${showCreateModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showCreateModal ? 'block' : 'none' }} aria-labelledby="createModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title" id="createModalLabel">Thêm Mới Cuốn Sách</h5>
                        <button type="button" className={`close px-2 rounded border-0 fs-4 ${styles.booklistButtonClose}`} data-dismiss="modal" aria-label="Close" onClick={() => setShowCreateModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body d-flex flex-column gap-3">
                          <div className="form-floating">
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                placeholder="Enter email"
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            />
                            <label htmlFor="title">Tên sách</label>
                          </div>
                          
                          <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                placeholder="Tác giả"
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                            />
                            <label htmlFor="author">Tác giả</label>
                          </div>
                          <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="year"
                                placeholder="Năm xuất bản"
                                value={newBook.year}
                                onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                            />
                            <label htmlFor="year">Năm xuất bản</label>
                          </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary bg-danger" onClick={() => setShowCreateModal(false)}>
                            Đóng
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => handleCreateNewBook()}>
                            Lưu
                        </button>
                        </div>
                    </div>
                </div>
            </div>                

            {/*Modal Delete*/}
            <div className={`modal fade ${showDeleteModal ? "show" : ""}`} tabIndex={-1} style={{ display: showDeleteModal ? 'block' : 'none' }} aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title" id="deleteModalLabel">Xác Nhận Xóa Sách</h5>
                            <button type="button" className={`close px-2 rounded border-0 fs-4 ${styles.booklistButtonClose}`} data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa cuốn sách này?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                Hủy
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookList;