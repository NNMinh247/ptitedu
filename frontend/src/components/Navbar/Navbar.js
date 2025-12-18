import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Danh sách các mục điều hướng
  const navItems = [
    { id: "home", label: "Giới thiệu" },
    { id: "history", label: "Lịch sử" },
    { id: "achievements", label: "Thành tựu" },
    { id: "partners", label: "Đối tác" },
    { id: "campus", label: "Khám phá cơ sở" },
    { id: "admission", label: "TUYỂN SINH" }
  ];

  // Xử lý sự kiện click để cuộn mượt
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Trừ đi 80px chiều cao của navbar để không bị che mất nội dung
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // 1. Hiệu ứng đổi màu nền navbar khi cuộn xuống
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Logic Scroll Spy (Tự động active menu)
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // +100 để trigger sớm hơn chút

      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <nav className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo hoặc Tên trường */}
        <div className="nav-logo" onClick={() => scrollToSection("home")}>
          <i className="bi bi-mortarboard-fill"></i> PTIT EDU
        </div>

        {/* Menu Items */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;