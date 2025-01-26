// More Modern icons sets (Boxicons (Bi*), Lucide (Lu*), and Material Design (Md*))
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdCategory, MdDashboard } from "react-icons/md";
import { FiSettings, FiUser, FiSmartphone } from "react-icons/fi";


import { FaUserAlt, FaDatabase, FaBlog, FaSleigh} from "react-icons/fa";
import { BiCart, BiLocationPlus, BiUser, BiDevices, 
  BiCode, BiSupport, BiBarChart, BiChat } from "react-icons/bi";
import LogoutButton from "./LogoutButton";

const admin = 'admin';

function SideNavbar() {
  const quickLinks = {
    title: "QUICK LINKS",
    links: [
      { link: `/${admin}/dashboard`, name: "Dashboard", icon: <MdDashboard />, end: true },
      { link: `/${admin}/options`, name: "All Options", icon: <FiSettings />, end: true},
      { link: `/${admin}/users/profile`, name: "Profile", icon: <FiUser />, end: true},
      { link: `/${admin}/support`, name: "Support & Assitance", icon: <BiSupport />, end: false },
      { link: `/${admin}/analytics`, name: "Analytics", icon: <BiBarChart />, end: false },

    ],
  };
  const catalogLinks = {
    title: "CATALOG",
    links: [
      //{ link: `/${admin}/products`,name: "Products",icon: <LuShoppingBag />,end: false },
      { link: `/${admin}/storages`, name: "Storage", icon: <FaDatabase />, end: false },

      { link: `/${admin}/locations`, name: "Locations", icon: <BiLocationPlus />, end: false},
      { link: `/${admin}/users`, name: "Users", icon: <BiUser />, end: false },
      { link: `/${admin}/devices`, name: "Devices", icon: <BiDevices />, end: false },
      { link: `/${admin}/asset_management`, name: "Asset Management", icon: <FiSmartphone />, end: false },
      { link: `/${admin}/sql-queries`, name: "SQL Queries (Select)", icon: <BiCode />, end: false },
      { link: `/${admin}/chatbot`, name: "SQL Chatbot", icon: <BiChat />, end: false },


    ],
  };

  const links = [quickLinks, catalogLinks];

  return (
    <div className="h-full flex flex-col pr-1 overflow-y-scroll scrollbar scroll-smooth">
      {links.map((link, index) => (
        <div key={index} className="my-4">
          <h3 className="px-4 text-sm font-semibold text-slate-700">
            {link.title}
          </h3>
          <div className="flex flex-col flex-grow gap-1 mt-2">
            {link.links.map((_link, idx) => (
              <NavLink
                end={_link.end}
                key={idx}
                to={_link.link}
                className={(prop) =>
                  `${
                    prop.isActive
                      ? "text-teal-600 border-l-4 border-l-teal-600 rounded-sm bg-slate-50"
                      : "hover:bg-slate-50 hover:text-teal-800"
                  } pl-6 py-2 font-semibold text-slate-700 flex items-center gap-3`
                }
              >
                {_link.icon}
                <span>{_link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <LogoutButton />
    </div>
  );
}

export default SideNavbar;
