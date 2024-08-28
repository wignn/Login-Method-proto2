// pages/about.js
import Image from "next/image";
import img from "../../../public/1.jpg";
import SocialMediaIcons from "../components/bind-img/SosIcon";
import Pic from '../../../public/about.jpg'
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 mt-14">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-200 bg-opacity-50 shadow-md rounded-lg max-w-4xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">About Me</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="w-32 h-32 mb-4 md:mb-0 md:mr-6">
              <Image
                src={img}
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full border-4 border-gray-300"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-700 mb-4">
                Hello! My name is Othinus, and I am a student.
              </p>
              <p className="text-gray-600">
                I have a passion for programming. In my spare time, I enjoy playing games. Feel free to connect with me through social media.
              </p>
            </div>
          </div>
          <div className="mb-8">
            <Image
              src={Pic}
              alt="About"
              width={1200}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex justify-center">
            <SocialMediaIcons />
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  );
};

export default About;
