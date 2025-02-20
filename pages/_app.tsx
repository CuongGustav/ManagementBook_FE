// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Thêm Bootstrap vào toàn bộ dự án
import "@/styles/globals.css"; // Đảm bảo import file CSS chung của bạn
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome
import { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
