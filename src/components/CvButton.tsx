import ArrowDown from '@/assets/icons/arrow-down.svg'; // Import your ArrowDown icon

const CVButton: React.FC = () => {
  return (
    <a
      href="https://drive.google.com/your-google-drive-file-link" // Ensure this URL is correct
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl cursor-pointer"
    >
      <span className="font-semibold">DOWNLOAD MY C.V</span>
      <ArrowDown className="w-4 h-4" />
    </a>
  );
};

export default CVButton;
