import { Icon } from "@iconify/react";
import Link from "next/link";

const CardWithBackgroundColor = () => {
  return (
    <div className=''>
      <h6 className='mb-72'>Mau Belajar Apa Hari Ini ?</h6>
      <div className='row gy-4 d-inline-flex align-items-center justify-content-center'
      style={{ minHeight: '50vh' }} >
        <div className='col-xxl-3 col-sm-6'>
          <div className='card h-100 radius-12 bg-gradient-purple text-center'>
            <div className='card-body p-24'>
              <div className='w-64-px h-64-px d-inline-flex align-items-center justify-content-center bg-lilac-600 text-white mb-16 radius-12'>
                <Icon
                  icon='solar:medal-ribbons-star-bold'
                  className='h5 mb-0'
                />
              </div>
              <h6 className='mb-8'>Interaksi</h6>
              <p className='card-text mb-8 text-secondary-light'>
                Yuk, belajar interaksi untuk melatih cara berkomunikasi 
                dan berhubungan dengan orang lain dalam berbagai situasi. 
                Jawablah dengan santai dan sesuai dengan yang kamu pahami, ya!
              </p>
              <Link
                href='/quiz-1'
                className='btn text-lilac-600 hover-text-lilac px-0 py-0 mt-16 d-inline-flex align-items-center gap-2'
              >
                Ayo Belajar{" "}
                <Icon icon='iconamoon:arrow-right-2' className='text-xl' />
              </Link>
            </div>
          </div>
        </div>
        <div className='col-xxl-3 col-sm-6'>
          <div className='card h-100 radius-12 bg-gradient-primary text-center'>
            <div className='card-body p-24'>
              <div className='w-64-px h-64-px d-inline-flex align-items-center justify-content-center bg-primary-600 text-white mb-16 radius-12'>
                <Icon icon='ri:computer-fill' className='h5 mb-0' />
              </div>
              <h6 className='mb-8'>Huruf dan Angka</h6>
              <p className='card-text mb-8 text-secondary-light'>
              Yuk, kita berlatih mengenal huruf dan angka bersama dengan cara yang seru dan menyenangkan!
              Ikuti langkah-langkahnya dan lakukan sesuai arahan, ya. Semangat mencoba!
              </p>
              <Link
                href='/quiz-2'
                className='btn text-primary-600 hover-text-primary px-0 py-10 d-inline-flex align-items-center gap-2'
              >
                Ayo Belajar{" "}
                <Icon icon='iconamoon:arrow-right-2' className='text-xl' />
              </Link>
            </div>
          </div>
        </div>
        <div className='col-xxl-3 col-sm-6'>
          <div className='card h-100 radius-12 bg-gradient-success text-center'>
            <div className='card-body p-24'>
              <div className='w-64-px h-64-px d-inline-flex align-items-center justify-content-center bg-success-600 text-white mb-16 radius-12'>
                <Icon icon='fluent:tree-deciduous-24-filled' className='h5 mb-0' />
              </div>
              <h6 className='mb-8'>Lingkungan</h6>
              <p className='card-text mb-8 text-secondary-light'>
              Yuk, kita belajar tentang lingkungan dan cara menjaga bumi! Kamu akan mengetahui langkah sederhana yang bisa kita lakukan untuk melestarikan alam.
              </p>
              <Link
                href='/quiz-3'
                className='btn text-success-600 hover-text-success px-0 py-10 d-inline-flex align-items-center gap-2'
              >
                Ayo Belajar{" "}
                <Icon icon='iconamoon:arrow-right-2' className='text-xl' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithBackgroundColor;
