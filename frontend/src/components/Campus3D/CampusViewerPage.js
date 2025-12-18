import React, { Suspense, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress, PointerLockControls, Environment } from "@react-three/drei";
import ModelViewer from "./ModelViewer";
import FirstPersonCamera from "./FirstPersonCamera";
import "./CampusViewerPage.css";

const API_URL = "http://localhost:5000/public/";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader-box">
        Đang tải mô hình... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function CampusViewerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);

  const campus = location.state?.campus;

  useEffect(() => {
    if (!campus) {
      navigate("/");
    }
  }, [campus, navigate]);

  const handleBack = () => {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setIsLocked(false);
    navigate("/", { state: { scrollTo: "campus" } });
  };

  if (!campus) return null;

  return (
    <div className="campus-viewer-container">
      {/* 1. Nút Quay lại (Góc trên trái) */}
      <div className="back-button-container">
        <button className="btn-back" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Quay lại
        </button>
      </div>

      {/* 2. Bảng Hướng dẫn Điều khiển (Góc trên trái, dưới nút Back) */}
      <div className="controls-panel">
        <h4 className="controls-title">HƯỚNG DẪN</h4>
        
        {/* Nhóm Di chuyển */}
        <div className="control-group">
          <div className="keys-layout">
            <div className="key-row">
              <div className="key-cap">W</div>
            </div>
            <div className="key-row">
              <div className="key-cap">A</div>
              <div className="key-cap">S</div>
              <div className="key-cap">D</div>
            </div>
          </div>
          <span className="control-label">Di chuyển</span>
        </div>

        <div className="divider"></div>

        {/* Nhóm Nhìn */}
        <div className="control-group horizontal">
          <div className="icon-box"><i className="bi bi-mouse"></i></div>
          <span className="control-label">Xoay góc nhìn</span>
        </div>

        <div className="divider"></div>

        {/* Nhóm Thoát */}
        <div className="control-group horizontal">
          <div className="key-cap wide">ESC</div>
          <span className="control-label">Hiện con trỏ chuột</span>
        </div>
      </div>

      {/* 3. Màn hình Canvas 3D */}
      <div className="three-canvas-container">
        {/* Thông báo Click để bắt đầu (Chỉ hiện khi chưa khóa chuột) */}
        {!isLocked && (
          <div className="start-prompt" onClick={() => setIsLocked(true)}>
            <div className="prompt-content">
              <i className="bi bi-cursor-fill"></i>
              <span>CLICK VÀO MÀN HÌNH ĐỂ BẮT ĐẦU</span>
            </div>
          </div>
        )}

        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 75 }} 
          onClick={() => setIsLocked(true)}
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            intensity={1.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Environment preset="park" background blur={0.5} />

          <Suspense fallback={<Loader />}>
            <ModelViewer modelUrl={`${API_URL}${campus.file_name}`} />
          </Suspense>

          {isLocked && (
            <PointerLockControls
              onUnlock={() => setIsLocked(false)}
            />
          )}
          <FirstPersonCamera active={isLocked} />
        </Canvas>
      </div>
    </div>
  );
}