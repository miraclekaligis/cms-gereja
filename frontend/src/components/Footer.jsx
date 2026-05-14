const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} Gereja Kami. Melayani dengan kasih.</p>
      </div>
    </footer>
  );
};

export default Footer;
