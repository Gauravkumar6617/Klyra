import React, { useState } from "react";
import "./Navbar.css";

import { useDispatch, useSelector } from "react-redux";

import logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { useAppSelector } from "../../App/store";
import Badge from "@mui/material/Badge";
import { logout } from "../../Features/Auth/authSlice";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const user = useAppSelector(state => state.auth.user);
  const cart = useSelector((state) => state.cart);
console.log(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
   try {
    disptach(logout());
    toast.success("User logout succesfully")
   } catch (error) {
    toast.error("error during logout" ,error) 
   }
  };
  // const handleNavigation =()=>{
  //   if(){
  //     navigate("UserAccount")
  //   }
  // }
  return (
    <>
      {/* Desktop Menu */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={scrollToTop}>
                  SHOP
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={scrollToTop}>
                  BLOG
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={22} onClick={scrollToTop} />
          {
        user ? (<div> <p>Welcome , {user.name}</p></div>): null
       }
   <div style={{ position: "relative", display: "inline-block" }}>
      {user ? (
        <>
          {/* User Icon */}
          <div onClick={handleToggle} style={{ cursor: "pointer" }}>
            <FaRegUser size={22} />
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: 0,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <Link
                to="/UserAccount"
                style={{ display: "block", padding: "8px 12px", textDecoration: "none", color: "black" }}
                onClick={() => setOpen(false)}
              >
                Account
              </Link>
              <div
                onClick={handleLogout}
                style={{ display: "block", padding: "8px 12px", cursor: "pointer" }}
              >
                Logout
              </div>
            </div>
          )}
        </>
      ) : (
        <Link to="/loginSignUp" onClick={scrollToTop}>
          <FaRegUser size={22} />
        </Link>
      )}
    </div>
          {/* <Link to="/loginSignUp" onClick={scrollToTop}>
           />
          </Link> */}
          <Link to="/cart" onClick={scrollToTop}>
            <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
     {
        user ?(   <FiHeart size={22} onClick={scrollToTop} />): null
       }
          {/* <RiMenu2Line size={22} /> */}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart">
            <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} color="black" />
            </Badge>
          </Link>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Search products" />
                <Link to="/shop">
                  <FiSearch size={22} onClick={toggleMobileMenu} />
                </Link>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                <li>
                  <Link to="/" onClick={toggleMobileMenu}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/shop" onClick={toggleMobileMenu}>
                    SHOP
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={toggleMobileMenu}>
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={toggleMobileMenu}>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={toggleMobileMenu}>
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              <Link to="/loginSignUp" onClick={toggleMobileMenu}>
                <FaRegUser />
                <p>My Account</p>
              </Link>
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>Language</p>
                <select name="language" id="language">
                  <option value="english">United States | English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>Currency</p>
                <select name="currency" id="currency">
                  <option value="USD">$ USD</option>
                  <option value="INR">₹ INR</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
