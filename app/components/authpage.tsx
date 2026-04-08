"use client";

import Link from "next/link";
import React, { useState } from "react";

type AuthPageProps = {
  type: "login" | "signup";
};

export default function Authpage({  type }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background: #050810;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background glow */
        .login-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(30, 80, 200, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 50%, rgba(10, 40, 120, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-card {
          display: flex;
          width: 100%;
          max-width: 820px;
          min-height: 500px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(80, 140, 255, 0.3);
          box-shadow:
            0 0 0 1px rgba(80, 140, 255, 0.1),
            0 0 60px rgba(30, 80, 200, 0.15),
            0 40px 80px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 1;
        }

        /* LEFT PANEL — image background */
        .left-panel {
          width: 320px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: #010617;
          border-right: 1px solid rgba(80, 140, 255, 0.2);
        }

        .artwork-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* subtle dark overlay so the label text stays readable */
        .artwork-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(5, 8, 20, 0.1) 0%,
            rgba(5, 8, 20, 0.55) 100%
          );
        }

        .left-label {
          position: absolute;
          bottom: 32px;
          left: 28px;
          right: 28px;
          z-index: 2;
        }

        .left-label h2 {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }

        /* RIGHT PANEL — form */
        .right-panel {
          flex: 1;
          background: #0c1120;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 48px;
        }

        .form-inner {
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tagline {
          font-size: 14px;
          color: rgba(180, 195, 230, 0.75);
          margin-bottom: 36px;
          letter-spacing: 0.01em;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .field-label {
          font-size: 13px;
          color: rgba(200, 215, 240, 0.85);
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        .input-wrap {
          position: relative;
        }

        .field-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(100, 140, 220, 0.2);
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 14px;
          color: #e0e8ff;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field-input::placeholder { color: rgba(150, 170, 210, 0.3); }

        .field-input:focus {
          border-color: rgba(80, 140, 255, 0.6);
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 0 0 3px rgba(60, 120, 255, 0.12);
        }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(160, 180, 220, 0.5);
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: rgba(160, 180, 220, 0.9); }

        .login-btn {
          width: 100%;
          margin-top: 8px;
          padding: 12px;
          background: #2563eb;
          border: none;
          border-radius: 999px;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
        }
        .login-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(37, 99, 235, 0.55);
        }
        .login-btn:active { transform: translateY(0); }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0 20px;
          color: rgba(130, 155, 200, 0.4);
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(100, 130, 200, 0.2);
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(100, 140, 220, 0.2);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .google-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(100, 140, 220, 0.4);
          transform: translateY(-1px);
        }

        .signup-text {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: rgba(150, 170, 210, 0.5);
        }
        .signup-text a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          margin-left: 4px;
          transition: color 0.2s;
        }
        .signup-text a:hover { color: #60a5fa; }

        @media (max-width: 640px) {
          .left-panel { display: none; }
          .right-panel { padding: 40px 28px; }
          .login-card { max-width: 420px; }
        }
      `}</style>

      <div className="login-card">
        {/* Left decorative panel */}
        <div className="left-panel">
          <img
            src="/pic.jpeg"
            alt="Background artwork"
            className="artwork-img"
          />
          <div className="artwork-overlay" />
          <div className="left-label">
            <h2>Match-making Platform for Hackathons and Projects</h2>
          </div>
        </div>

        {/* Right form panel */}
        <div className="right-panel">
          <div className="form-inner">
            <p className="tagline">A platform to build, team up &amp; collaborate</p>

            <div className="field-group">
              <label className="field-label">Your email</label>
              <div className="input-wrap">
                <input type="email" className="field-input" placeholder="Enter your email"value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"} className="field-input" placeholder="Enter your password"
                  value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingRight: "40px" }}
                />
                <button
                  type="button" className="eye-btn" onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (

                    <img src = "/open_eye.png" alt="show password" style={{ height: "30px",width: "auto" }}  />
                    //<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     // <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      //<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      //<line x1="1" y1="1" x2="23" y2="23"/>
                    //</svg>
                  ) : (
                    <img src = "/close_eye.png" alt="hide password" style={{ height: "30px",width: "auto" }} />
                    //<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      //<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      //<circle cx="12" cy="12" r="3"/>
                   // </svg>
                  )}
                </button>
              </div>
            </div>

            <button className="login-btn">
                {type === "login" ? "Login" : "Sign Up"}
            </button>

            <div className="divider">or continue with</div>

            <button className="google-btn" aria-label="Continue with Google">
              <img src = "/google.png" alt="Google" style={{ height: "25px",width: "auto" }}/>
            </button>

            <p className="signup-text">
                {type === "login" ? (
                    <>
                    Dont have an account?
                    <Link href="/signup">Sign up</Link>
                    </>
                ) : (
                    <>
                    Already have an account?
                    <Link href="/login">Login</Link>
                    </>
                )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
