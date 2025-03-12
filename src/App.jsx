import { Canvas } from "@react-three/fiber";
import { UI } from "./components/UI";
import "./App.css";
import { Experience } from "./components/Experience";


function App() {
  return (
    <>
    <UI />
    <Canvas
      camera={{
        position: [3, 3, 3],
      }}
    >
      <color attach="background" args={["#130f30"]} />
      <Experience/>
    </Canvas>
    </>
  );
}

export default App;