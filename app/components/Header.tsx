import Image from 'next/image';

function Header() {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="flex items-center">
        <Image
          src={'/images/logo.webp'}
          width={80}
          height={80}
          alt="GitSearch Logo"
          priority
        />
        <h1 className="relative inline-block text-3xl">
          GitSearch
          <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent to-transparent"></span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
