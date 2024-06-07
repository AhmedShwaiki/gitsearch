import Image from 'next/image';

const Header = () => {
    return (
        <div className="flex items-center mb-8">
            <Image
                src={'/images/logo.webp'}
                width={79}
                height={79}
                alt="GitSearch Logo"
            />
            <h1 className="text-3xl">GitSearch</h1>
        </div>
    );
};

export default Header;
