import Link from 'next/link';

const Foter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <Link href="https://x.com/omeonujoshua1?t=16zjUP-PUB0X7S4SOzWMTQ&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            X
          </Link>
          <Link href="https://www.linkedin.com/in/joshua-omeonu-311390205" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            LinkedIn
          </Link>
          <Link href="https://www.instagram.com/o.m_joshbrass?igsh=YjF4NjZ4bmJoajZv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            Instagram
          </Link>
          <Link href="https://www.facebook.com/omeonu.joshua?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            Facebook
          </Link>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Joshua Omeonu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Foter;
