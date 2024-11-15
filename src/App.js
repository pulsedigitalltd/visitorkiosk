import KioskForm from './components/KioskForm';


const App = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className=" object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
      <source src="/videos/bg4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex justify-center items-center h-full">
        <KioskForm />
      </div>
    </div>
  );
};

export default App;
