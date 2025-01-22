'use client'
import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import useReactApexChart from "../../hook/useReactApexChart";

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0); // State untuk skor
    const [quizCompleted, setQuizCompleted] = useState(false); // State untuk status kuis selesai
    const questionRef = useRef();
    let { basicDonutChartOptions } = useReactApexChart();

  const questions = [
    {
      quiz_id: 1,
      quiz_item_id: 1,
      text: "Contoh interaksi sosial di sekolah adalah…",
      image: "",
      correct_answer: 3,
      options: [
        { id: 1, text: "Bersepeda" },
        { id: 2, text: "Membaca buku" },
        { id: 3, text: "Bermain bola dengan teman" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 2,
      text: "Apa yang kamu lakukan saat melihat teman seperti gambar di atas?",
      image: "/assets/images/soal/1.png",
      correct_answer: 2,
      options: [
        { id: 1, text: "Membiarkan" },
        { id: 2, text: "Menenangkan" },
        { id: 3, text: "Menertawakan" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 3,
      text: "Interaksi sosial adalah…",
      image: "",
      correct_answer: 2,
      options: [
        { id: 1, text: "Aktivitas sendiri" },
        { id: 2, text: "Hubungan antar individu" },
        { id: 3, text: "Bermain piano" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 4,
      text: "Apa yang seharusnya kamu lakukan saat melihat teman seperti gambar di atas?",
      image: "/assets/images/soal/2.png",
      correct_answer: 1,
      options: [
        { id: 1, text: "Membantu" },
        { id: 2, text: "Meninggalkan" },
        { id: 3, text: "Mengejek" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 5,
      text: "Mengapa kita harus berinteraksi dengan orang lain?",
      image: "",
      correct_answer: 1,
      options: [
        { id: 1, text: "Mendapat Teman" },
        { id: 2, text: "Kesepian" },
        { id: 3, text: "Ditinggalkan" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 6,
      text: "Apa yang harus kita lakukan?",
      image: "/assets/images/soal/3.png",
      correct_answer: 1,
      options: [
        { id: 1, text: "Berterima kasih" },
        { id: 2, text: "Marah" },
        { id: 3, text: "Bertanya" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 7,
      text: "Mengapa kita harus sopan dengan orang yang lebih tua?",
      image: "",
      correct_answer: 1,
      options: [
        { id: 1, text: "Menghargai" },
        { id: 2, text: "Diperintah" },
        { id: 3, text: "Keamanan" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 8,
      text: "Apa itu anti sosial?",
      image: "",
      correct_answer: 1,
      options: [
        { id: 1, text: "Tidak mau berteman" },
        { id: 2, text: "Menyapa orang" },
        { id: 3, text: "Bersepeda" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 9,
      text: "Contoh interaksi sosial dalam keluarga adalah…",
      image: "",
      correct_answer: 3,
      options: [
        { id: 1, text: "Menonton TV" },
        { id: 2, text: "Membaca buku" },
        { id: 3, text: "Membantu ibu" },
      ],
    },
    {
      quiz_id: 1,
      quiz_item_id: 10,
      text: "Apa dampak anti sosial?",
      image: "",
      correct_answer: 1,
      options: [
        { id: 1, text: "Kesepian" },
        { id: 2, text: "Bahagia" },
        { id: 3, text: "Memiliki teman" },
      ],
    },
  ];
  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleNextQuestion = async () => {
    try {
      const response = await fetch('/api/quiz/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          quiz_id: 1,
          quiz_item_id: currentQuestion.quiz_item_id,
          answer: selectedOption,
          correct_answer: currentQuestion.correct_answer,
        }).toString(),
      });
      
      const data = await response.json();
  
      if (data.score) {
        console.log('Jawaban berhasil disimpan');
  
        // Update skor jika jawaban benar
        if (selectedOption === currentQuestion.correct_answer) {
          setScore(score + 1);
        }
  
        // Lanjut ke pertanyaan berikutnya jika masih ada
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          questionRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          setQuizCompleted(true);
        }
      } else {
        console.error('Gagal menyimpan jawaban');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container my-4" ref={questionRef}>
      {!quizCompleted ? (
        <div className="card h-100 p-0">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">
              Soal {currentQuestionIndex + 1} dari {questions.length}
            </h6>
          </div>
          <div className="card-body p-24">
            {/* Pertanyaan */}
            <h5 className="fw-semibold mb-3">{currentQuestion.text}</h5>
            {currentQuestion.image && (
              <div className="mb-12 text-center">
                <img
                  src={currentQuestion.image}
                  alt="Pertanyaan"
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}

            {/* Pilihan Jawaban */}
            <ul className="list-group radius-8">
              {currentQuestion.options.map((option) => (
                <li
                  key={option.id}
                  className={`list-group-item border text-secondary-light p-16 ${
                    selectedOption === option.id ? "bg-primary-600 text-white" : "bg-base"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="d-flex justify-content-end align-items-end"
            style={{
              position: "relative",
              height: "60px",
              padding: "16px",
            }}
          >
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn btn-success radius-8 px-20 py-11"
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
              }}
            >
              Selanjutnya
              <Icon icon="mingcute:square-arrow-right-line" className="ms-2 text-xl" />
            </button>
          </div>
        </div>
      ) : (
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

export default Quiz;