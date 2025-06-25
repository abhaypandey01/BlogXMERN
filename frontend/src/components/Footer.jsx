import { footerData } from "../../data";

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-purple-500/3'>
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">

        <div>
          <img src="/favicon.png.jpg" alt="BlogX" className="w-20 sm:w-32 "/>
          <p className="max-w-[410px] mt-6">A modern blog platform to share ideas, tutorials, and stories with a clean interface, rich content, and easy publishing.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerData.map((section, index)=>(
            <div key={index}>
              <h3 className="text-gray-800 text-md font-bold mb-2 md:mb-5">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i)=>(
                  <li key={i} className="hover:underline transition-all duration-300 cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 bg-gray-200 text-gray-500/80 font-semibold text-center text-sm">Copyright 2025 c. BlogX By Abhay - All Right Reserved.</p>
    </div>
  )
}

export default Footer;