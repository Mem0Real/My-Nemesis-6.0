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
      options={{
        background: "trasparent",
        fpsLimit: 120,
        particles: {
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          color: {
            value: currentTheme === "dark" ? "#ffffff" : "#000",
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 3,
            random: true,
          },
          opacity: {
            value: 0.5,
          },
          links: {
            enable: true,
            distance: 150,
            color: currentTheme === "dark" ? "#ffffff" : "#343434",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            random: false,
            straight: false,
            direction: "none",
            outModes: {
              default: "out",
            },
            speed: 2,
            // attract: {
            //   enable: true,
            //   rotateX: 600,
            //   rotateY: 1200,
            // },
          },
        },
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
            repulse: {
              distance: 100,
            },
            bubble: {
              distance: 200,
              size: 5,
              opacity: 0.5,
              duration: 0.5,
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}
