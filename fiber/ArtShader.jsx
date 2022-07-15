import React, { useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { UniformsUtils, UniformsLib, Vector3 } from "three";
import { Detailed } from "@react-three/drei";
import { handleModalClick } from "./Modal";

// Constants

export const ArtShader = (props) => {
  const { artwork } = props;
  const { fragment } = props;
  const { vertex } = props;
  //Physics//

  const [cubeRef] = useBox(() => ({
    mass: 1,
    args: [5.5, 4.5, 1],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));
  //animation loop
  const shader = useRef();
  useFrame(({ clock, mouse }) => {
    shader.current.uniforms.u_time = { value: clock.getElapsedTime() };
  });
  // grab files from props//

  //FUNCTIONS
  function handleLeftClick(e) {
    handleModalClick(e, artwork);
  }
  return (
    <Detailed ref={cubeRef} distances={[0, 12]} {...props}>
      <mesh castShadow layers={props.layers} onClick={handleLeftClick}>
        <boxBufferGeometry args={[5, 4, 0.5]} />
        <shaderMaterial
          ref={shader}
          attach="material"
          fog={true}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={UniformsUtils.merge([
            UniformsLib["fog"],

            {
              customUniform: { u_time: { value: 0.5 } },
            },
          ])}
        />
      </mesh>
      {/* if 15 or more away render :  */}
      <mesh></mesh>
    </Detailed>
  );
};
