function Footer() {
  return (
    <footer className="footer">
      <section>
        <h2 className="footer-heading">About Us</h2>
        <ul className="footer-list">
          <li className="footer-link">Our Story</li>
          <li className="footer-link">Our Team</li>
          <li className="footer-link">Contact Us</li>
        </ul>
      </section>
      <section>
        <h2 className="footer-heading">Categories</h2>
        <ul className="footer-list">
          <li className="footer-link">Front-End</li>
          <li className="footer-link">Back-End</li>
        </ul>
      </section>
      <section>
        <h2 className="footer-heading">Resources</h2>
        <ul className="footer-list">
          <li className="footer-link">FAQs</li>
          <li className="footer-link">Site Map</li>
          <li className="footer-link">Advertise</li>
          <li className="footer-link">Privacy Policy</li>
        </ul>
      </section>
      <section>
        <h2 className="footer-heading">Connect</h2>
        <ul className="footer-list">
          <li className="footer-link">Facebook</li>
          <li className="footer-link">Instagram</li>
          <li className="footer-link">Newsletter</li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
