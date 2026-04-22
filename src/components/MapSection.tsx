const MapSection = () => {
  return (
    <section id="location" className="py-16 sm:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Find <span className="text-gradient">Us</span>
          </h2>
          <p className="text-muted-foreground">Visit our office or book directly online.</p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border">
          <iframe
            title="Business Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452149588!3d12.954517009498942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
