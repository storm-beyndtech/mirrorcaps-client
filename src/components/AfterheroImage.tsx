export default function AfterheroImage() {
  return (
    <div className="relative w-full bg-slate-950">
      {/* Container with controlled height to crop bottom */}
      <div className="relative h-80 overflow-hidden max-w-2xl mx-auto">
        {/* Laptop Image */}
        <img
          src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/home-row5-img1-2%EF%B9%96v=4.webp"
          alt="Laptop opened showing screen"
          className="w-full h-full object-cover object-top"
        />

        {/* Fade overlay - gradient from transparent to slate-950 */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none"></div>

        {/* Additional bottom fade for stronger effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
