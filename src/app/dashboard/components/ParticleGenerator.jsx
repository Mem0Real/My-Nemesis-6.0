"use client";

import { useThemeContext } from "@/context/ThemeProvider";
import { useState, useEffect, useCallback } from "react";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export default function ParticleGenerator() {
  const [currentTheme, setCurrentTheme] = useState("");

  const themeCtx = useThemeContext();

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "false") setCurrentTheme("light");
    else setCurrentTheme("dark");
  }, [themeCtx.update]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: "trasparent",
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "bubble",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 300,
              size: 5,
              opacity: 0.3,
              duration: 2,
            },
            repulse: {
              distance: 100,
              duration: 3,
            },
          },
        },
        particles: {
          color: {
            value: currentTheme === "dark" ? "#ffffff" : "#343434",
          },
          links: {
            color: currentTheme === "dark" ? "#ffffff" : "#343434",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 2,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 2,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 400,
            },
            value: 40,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        size: {
          value: 3,
          random: true,
        },
        detectRetina: false,
      }}
    />
  );
}
