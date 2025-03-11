import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineDiscord, AiOutlineYoutube, AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footersec" className="bg-white border-t border-gray-100 dark:bg-black shadow-sm text-gray-400 py-6 dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-wrap justify-center sm:justify-between items-center text-sm">
        <p className="ml-4">&copy; {currentYear} TAMU Datathon. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 mr-4 sm:mt-0">
          <a href="mailto:connect@tamudatathon.com" aria-label="Email" className="hover:text-gray-300">
            <AiOutlineMail className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/company/tamudatathon/posts/?feedView=all" aria-label="LinkedIn" className="hover:text-gray-300">
            <AiOutlineLinkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/tamudatathon/" aria-label="Instagram" className="hover:text-gray-300">
            <AiOutlineInstagram className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@tamu-datathon/featured" aria-label="Youtube" className="hover:text-gray-300">
            <AiOutlineYoutube className="w-5 h-5" />
          </a>
          <a href="https://discord.com/invite/pHsNmjuWSc" aria-label="Discord" className="hover:text-gray-300">
            <AiOutlineDiscord className="w-5 h-5" />
          </a>
          <a href="https://github.com/tamu-datathon-org" aria-label="GitHub" className="hover:text-gray-300">
            <AiOutlineGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;