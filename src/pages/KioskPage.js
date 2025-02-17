import KioskForm from '../components/KioskForm';
import NavBar from '../components/NavBar';

const AppPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <NavBar />
      <video
        className=" object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
      <source src="/videos/bg10.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex justify-center items-center h-full">
        <KioskForm />
      </div>
    </div>
  );
};

export default AppPage;
