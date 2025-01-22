'use client';
import React, { useRef, useState, useEffect } from "react";
import { Icon } from '@iconify/react'
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import useReactApexChart from "../../hook/useReactApexChart";


const HandwritingQuiz = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // State untuk skor
  const [quizCompleted, setQuizCompleted] = useState(false); // State untuk status kuis selesai
  let { basicDonutChartOptions } = useReactApexChart();
  

  const questions = [
    { quiz_id: 2, quiz_item_id: 1, soal: "Jika kamu diberi hadiah bagaimana perasaanmu ?", correctAnswer: "senang" },
    { quiz_id: 2, quiz_item_id: 2, soal: "Tuliskan huruf ketiga dalam kata 'bersama' ", correctAnswer: "r" },
    { quiz_id: 2, quiz_item_id: 3, soal: "Berapakah 5+3 ?", correctAnswer: "8" },
    { quiz_id: 2, quiz_item_id: 4, soal: "Apa bahasa inggris dari kata 'buku' ?", correctAnswer: "book" },
    { quiz_id: 2, quiz_item_id: 5, soal: "Mengurangi sampah adalah pengertian dari ?", correctAnswer: "reduce" },
    { quiz_id: 2, quiz_item_id: 6, soal: "Coba tebak hewan apakah aku ? </br> <h6>ciri-ciri: berkaki dua dan berkokok di pagi hari</h6> ", correctAnswer: "ayam" },
    { quiz_id: 2, quiz_item_id: 7, soal: "Apa bahasa inggris dari kata 'apel' ?", correctAnswer: "apple" },
    { quiz_id: 2, quiz_item_id: 8, soal: "Coba tebak hewan apakah aku ? </br> <h6>ciri-ciri: memiliki belalai dan berkaki empat</h6> ", correctAnswer: "gajah" },
    { quiz_id: 2, quiz_item_id: 9, soal: "Andi memiliki 5 kue dan Abi memintanya 2. Berapakah kue Andi sekarang ?", correctAnswer: "3" },
    { quiz_id: 2, quiz_item_id: 10, soal: "Tuliskan huruf pertama", correctAnswer: "A" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // Set up canvas resolution for high DPI displays
    const scale = window.devicePixelRatio || 1;
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.scale(scale, scale);

    // Set the background to white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
  }, [currentQuestionIndex]); // Reset canvas when the question changes

  const getEventPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getEventPosition(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);

    e.preventDefault();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { x, y } = getEventPosition(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineTo(x, y);
    ctx.stroke();

    e.preventDefault();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const nextQuestion = async () => {
    try {
      const response = await fetch('/api/quiz/quiz-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          quiz_id: 2,
          quiz_item_id: currentQuestionIndex + 1,
          image: canvasRef.current.toDataURL(),
          correct_answer: questions[currentQuestionIndex].correctAnswer,
        }).toString(),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.score !== undefined) {
          setScore(score + data.score);
        } else {
          console.log('Gagal mendapatkan skor dari API. Skor ditetapkan menjadi 0.');
        }
      } else {
        console.log('Respon API tidak berhasil. Skor ditetapkan menjadi 0.');
      }
    } catch (error) {
      console.log('Terjadi kesalahan:', error);
      console.log('Skor ditetapkan menjadi 0.');
    } finally {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        clearCanvas();
      } else {
        setQuizCompleted(true);
      }
    }
  };
  

  // const Correction = async () => {
  //   const canvas = canvasRef.current;
  //   const image = canvas.toDataURL();
  //   function saveBase64ToFile(base64Data, filename) {
  //     const blob = new Blob([base64Data], { type: 'text/plain' }); // Buat Blob tipe teks
  //     const link = document.createElement('a'); // Buat elemen <a> sementara
  //     link.href = URL.createObjectURL(blob); // Buat URL dari Blob
  //     link.download = filename; // Tentukan nama file
  //     link.click(); // Jalankan klik untuk unduh file
  //     URL.revokeObjectURL(link.href); // Hapus URL sementara
  // }
  
  // // Simpan base64 ke temp.txt
  // saveBase64ToFile(image, 'temp.txt');
  // };

  return (
    <div>
      {!quizCompleted ? (
      <div>
        <h4 
          className="text-start mb-32" 
          dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].soal }}
        ></h4>      
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            minHeight: "50vh",
            position: "relative", // Tambahkan ini untuk membuat posisi absolut tombol berbasis div ini
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "400px",
              background: "#fff",
              touchAction: "none",
              borderRadius: "8px",
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="mt-4 w-full">
            <button onClick={clearCanvas}>Bersihkan Canvas</button>
          </div>
          {/* Tambahkan posisi absolut ke tombol */}
          <div
            style={{
              position: "absolute",
              bottom: "-40px", // Jarak dari bawah
              right: "20px", // Jarak dari kanan
            }}
          >
            <button
              type="button"
              onClick={nextQuestion}
              className="btn btn-success-600 radius-8 px-20 py-11 d-flex align-items-center gap-2"
            >
              Selanjutnya{" "}
              <Icon
                icon="mingcute:square-arrow-right-line"
                className="text-xl"
              />
            </button>
          </div>
        </div>
      </div>
      ): (
        // Donut chart setelah kuis selesai
        <div className="">
        <div className="card h-100 p-0">
            <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Hasil Quiz</h6>
            </div>
            <div className="card-body p-24 text-center d-flex flex-wrap align-items-start gap-5 justify-content-center">
            <div className="position-relative">
                <ReactApexChart
                id="basicDonutChart"
                className="w-auto d-inline-block"
                options={basicDonutChartOptions}
                series={[score, 10 - score]}
                type="donut"
                height={264}
                />
                <div className="position-absolute start-50 top-50 translate-middle">
                <span className="text-lg text-secondary-light fw-medium">Total Skor</span>
                <h4 className="mb-0">{score}</h4>
                </div>
                {/* Menambahkan kalimat semangat */}
                <p className="text-lg">
                    {score >= 8 ? "Luar biasa! Terus pertahankan!" :
                    score >= 5 ? "Bagus! Masih ada ruang untuk lebih baik!" :
                    "Ayo semangat, coba lebih keras lagi!"}
                </p>
            </div>
            </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default HandwritingQuiz;
