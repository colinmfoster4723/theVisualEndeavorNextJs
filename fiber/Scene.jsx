// REACT
import React, { useEffect, useRef } from "react";

// Physics
import { Physics } from "@react-three/cannon";

// Three
import { extend, useThree } from "@react-three/fiber";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
// Prefabs
import { initFog } from "./scene-config";
import { Plane } from "./Plane";
import { Player } from "./Player";
import { Cube } from "./Cube";
import { ArtImage } from "./ArtImage";
import { ArtShader } from "./ArtShader";
import { Model } from "./Model";
import { StartModal } from "./StartModal";

//SHADERS///
import fragment0 from "../public/files/shaders/a1-sha0-fragment.glsl";
import vertex0 from "../public/files/shaders/a1-sha0-vertex.glsl";
import fragment1 from "../public/files/shaders/a1-sha1-fragment.glsl";
import vertex1 from "../public/files/shaders/a1-sha1-vertex.glsl";
import fragment2 from "../public/files/shaders/a1-sha2-fragment.glsl";
import vertex2 from "../public/files/shaders/a1-sha2-vertex.glsl";
import fragment3 from "../public/files/shaders/a1-sha3-fragment.glsl";
import vertex3 from "../public/files/shaders/a1-sha3-vertex.glsl";
/////////////

import { ArtVideo } from "./ArtVideo";
import { Lamp } from "./Light";
import { ArtistCenterPiece } from "./ArtistCenterPiece";

extend({ PointerLockControls });

export const Scene = (props) => {
  initFog();
  const { camera, gl } = useThree();
  const controls = useRef();
  const lite = useRef();
  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  function keyQuit(e) {
    if (e.key === "q") {
      //Remove all modals//
      document.querySelector(".roomModal")?.remove();
      document.querySelector(".roomStartModal")?.remove();
      //click logo//
      const logo = document.querySelector(".logo-canvas_canvas__3WjCv");

      logo.click();
      document.removeEventListener("keypress", keyQuit);
    }
  }

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };

    document.addEventListener("click", handleFocus);

    document.addEventListener("keypress", keyQuit);

    StartModal();
    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  ///ARTIST DATA////
  const { artists } = props;
  const colinArt = artists[0].artwork;
  const neekoArt = artists[1].artwork;

  return (
    <>
      {/** Skybox */}
      {/* <Skybox /> */}
      {/** Pointer lock */}
      <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Lighting */}
      <directionalLight position={[0, 5, -5]} intensity={0.2} castShadow />
      <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 4]} intensity={0.8} castShadow />
      {/** Physic objects */}

      <Physics
        gravity={[0, -9, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        {/* ///////////WORLD //////////////////*/}
        {/** Plane */}
        <Plane color={"black"} />
        {/** Player */}
        <Player />
        {/** Cubes */}
        <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} />
        <Cube position={[0.6, 0, -5]} />
        <Cube position={[-0.3, 0.5, -5]} />
        <Cube position={[0.3, 0.5, -5]} />
        <Cube position={[0, 1, -5]} />
        <Cube position={[-5, 0, -5]} />
        <Cube position={[-5, 0.5, -5]} />
        <Cube position={[-5, 1, -5]} />
        <Cube position={[5, 0, -5]} />
        <Cube position={[5, 0.5, -5]} />
        <Cube position={[5, 1, -5]} />
        <Cube position={[5, 1.5, -5]} />
        <Cube position={[5, 2, -5]} />
        <Cube position={[5, 2.5, -5]} />
        {/** Static cubes */}
        <Cube position={[0, 0, 5]} type={"Static"} />
        <Cube position={[0, 0, 5.5]} type={"Static"} />
        <Cube position={[0, 0.5, 5.5]} type={"Static"} />

        {/* ///////////CMF SCENE //////////////////*/}

        <ArtistCenterPiece
          position={[15, 2, -14]}
          type={"Static"}
          artist={artists[0]}
        />

        <ArtShader
          position={[12, 1.5, -20]}
          rotation={[0, Math.PI / 4, 0]}
          type={"Static"}
          artwork={colinArt.shaders[1]}
          fragment={fragment1}
          vertex={vertex1}
        />
        <ArtShader
          position={[22, 1.5, -14]}
          rotation={[0, -Math.PI / 2, 0]}
          type={"Static"}
          artwork={colinArt.shaders[0]}
          fragment={fragment0}
          vertex={vertex0}
        />

        {/* <ArtVideo
          position={[10, 1.5, -10]}
          rotation={[0, Math.PI / 2, 0]}
          type={"Static"}
          artwork={colinArt.videos[0]}
        /> */}

        <pointLight
          position={[15, 4, -14]}
          intensity={1.0}
          color={"yellow"}
          castShadow
        />

        <Model gltf={"../textures/logo.gltf"} position={[15, 0.5, -12]} />

        <Lamp
          position={[15, 5, -12]}
          fog={false}
          mp3={"../files/mp3s/chillest_sample.mp3"}
          color={"lightgreen"}
        />

        {/* NEEKO SCENE */}

        <ArtVideo
          position={[-15, 1.5, -12]}
          rotation={[0, -Math.PI / 2, 0]}
          type={"Static"}
          artwork={neekoArt.videos[0]}
        />
        <Lamp
          position={[-15, 5, -12]}
          fog={false}
          mp3={"../files/mp3s/chillest_sample.mp3"}
          color={"skyblue"}
        />

        {/* SCENE 3 */}
        <Lamp
          position={[-15, 5, 12]}
          fog={false}
          mp3={"../files/mp3s/chillest_sample.mp3"}
          color={"pink"}
        />

        {/* SCENE 4 */}
        <Lamp
          position={[15, 5, 12]}
          fog={false}
          mp3={"../files/mp3s/chillest_sample.mp3"}
          color={"yellow"}
        />
      </Physics>

      <fogExp2 attach="fog" args={[0x79518c, 0.2]} />
    </>
  );
};
