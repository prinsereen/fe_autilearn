"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import Link from "next/link";
import Cookies from 'js-cookie';




const MasterLayout = ({ children }) => {
  let pathname = usePathname();
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = usePathname(); // Hook to get the current route

  const [role, setRole] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location ||
            link.getAttribute("to") === location
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = async () => {
    try {
      // Menyiapkan data dalam format URL-encoded
      const body = new URLSearchParams({
        // Anda dapat menambahkan data lain yang diperlukan, misalnya token jika diperlukan
        // token: 'yourToken' // Contoh tambahan token jika diperlukan
      }).toString();
  
      // Kirim request logout ke server menggunakan metode DELETE
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Menandakan bahwa body menggunakan URL-encoded
        },
        body: body, // Menambahkan body URL-encoded
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Hapus cookie 'authToken' setelah logout berhasil
        Cookies.remove('authToken'); // Hapus cookie dengan nama 'authToken'
        
        // Arahkan pengguna ke halaman login
        window.location.href = '/'; 
      } else {
        // Tangani jika logout gagal
        alert('Gagal logout. Coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat logout.');
    }
  }
  

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link href='/' className='sidebar-logo'>
            <img
              src='assets/images/logo.png'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='assets/images/logo-light.png'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='assets/images/logo-icon.png'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
            <li>
              <Link href='/dashboard' className={pathname === "/dashboard" ? "active-page" : ""}>
                <Icon
                  icon='solar:home-smile-angle-outline'
                  className='menu-icon'
                />
                <span>Dashboard</span>
              </Link>
            </li>
            {role === "teacher" && (
            <li>
              <Link href='/users-list' className={pathname === "/users-list" ? "active-page" : ""}>
                <Icon
                  icon='flowbite:users-group-outline'
                  className='menu-icon'
                />
                <span>Siswa</span>
              </Link>
            </li>
            )}
            
            {role === "student" && (
            <li>
            <Link href='/quiz' className={pathname.startsWith("/quiz") ? "active-page" : ""}>
                <Icon
                  icon='solar:document-text-outline'
                  className='menu-icon'
                />
                <span>Quiz</span>
              </Link>
            </li>
            )}
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
<div className='navbar-header'>
  <div className='row align-items-center justify-content-between'>
    <div className='col-auto'>
      <div className='d-flex flex-wrap align-items-center gap-4'>
        <button
          type='button'
          className='sidebar-toggle'
          onClick={sidebarControl}
        >
          {sidebarActive ? (
            <Icon
              icon='iconoir:arrow-right'
              className='icon text-2xl non-active'
            />
          ) : (
            <Icon
              icon='heroicons:bars-3-solid'
              className='icon text-2xl non-active '
            />
          )}
        </button>
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-mobile-toggle'
        >
          <Icon icon='heroicons:bars-3-solid' className='icon' />
        </button>
      </div>
    </div>
    <div className='col-auto'>
      {/* Tambahkan tombol logout */}
      <button
        type="button"
        className="btn btn-outline-danger-600 radius-8 px-20 py-8"
        onClick={handleLogout}
        >
          Logout
      </button>
    </div>
  </div>
</div>


        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 Autilearn. All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0'>
                Made by <span className='text-primary-600'>autilearn</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
