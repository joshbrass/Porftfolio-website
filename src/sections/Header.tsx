export const Header = () => {
  return <div className="flex justify-center items-center fixed top-3 w-full z-10">
    <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
      <a href="#" className="nav-item">About</a>
      <a href="#Approach" className="nav-item">Approach</a>
      <a href="#projects" className="nav-item">Projects</a>
      <a href="https://drive.google.com/file/d/1mS01RURaMe8c8NwX4opBoVjWCsUMEX2d/view?usp=drive_link" className="nav-item">MY C.V</a>
      <a href="#about" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">Contact</a>
    </nav>
  </div>;
};
