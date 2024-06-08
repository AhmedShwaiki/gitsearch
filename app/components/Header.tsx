import Image from 'next/image';

function Header() {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="flex items-center">
                <Image
                    src={'/images/logo.webp'}
                    width={80}
                    height={80}
                    alt="GitSearch Logo"
                />
                <h1 className="text-3xl relative inline-block">
                    GitSearch
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
                </h1>
            </div>
        </div>
    );
};

export default Header;
