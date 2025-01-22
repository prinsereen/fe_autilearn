'use client'

import { useState } from 'react';
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const SignUpLayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Validasi sederhana (pastikan password dan konfirmasi password sama)
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }

    // Menyiapkan data untuk dikirimkan
    const body = new URLSearchParams({
      name,
      email,
      password,
      conf_password: confirmPassword
    }).toString();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });

      const data = await response.json();

      if (data.success) {
        // Redirect ke halaman utama setelah sukses
        router.push('/');
      } else {
        // Tangani jika terjadi kesalahan dalam pendaftaran
        alert('Gagal mendaftar. Coba lagi.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mendaftar.");
    }
  };

  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/auth-img.png' alt='' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link href='/' className='mb-40 max-w-290-px'>
              <img src='assets/images/logo.png' alt='' />
            </Link>
            <h4 className='mb-12'>Buat akun Autilearn</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Daftar untuk mendapatkan akses ke fitur Autilearn
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
              <input
                type='text'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Nama'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-20'>
              <div className='position-relative'>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <input
                    type='password'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    id='your-password'
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className='mb-20'>
              <div className='position-relative'>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <input
                    type='password'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    id='conf-password'
                    placeholder='Konfirmasi Password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              {" "}Sign Up
            </button>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Sudah punya akun?{" "}
                <Link href='/' className='text-primary-600 fw-semibold'>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
