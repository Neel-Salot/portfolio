'use client';

import { Text } from "@react-three/drei";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import CloudContainer from "../models/Cloud";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";

import { useThemeStore } from "@/app/stores";

const Hero = () => {
  const { theme } = useThemeStore();
  const textColor = theme.type === 'light' ? 'black' : 'white';
  const titleRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
        // delay: 1.5,
      }, {
        y: 0,
        duration: 3
      });
    }
  }, [progress]);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 1.2,
  };

  return (
    <>
      <Text position={[0, 2, -10]} {...fontProps} ref={titleRef} color={textColor}>NEEL SALOT</Text>
      <Text position={[0, -2, -10]} font="./soria-font.ttf" fontSize={0.6} color={theme.type === 'light' ? '#3b82f6' : '#22d3ee'}>Developer building experimental tech systems.</Text>
      <StarsContainer />
      <CloudContainer/>
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10} color={theme.type === 'light' ? '#ffffff' : '#8b5cf6'} />
        <WindowModel receiveShadow/>
        <TextWindow/>
      </group>
    </>
  );
};

export default Hero;
