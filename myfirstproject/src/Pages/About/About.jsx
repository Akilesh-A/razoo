import "../About/About.css";
import "animate.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title animate__animated animate__fadeInUp">
          About Seelaikari
        </h1>

        <div className="about-text animate__animated animate__fadeInLeft">
          <p>
            At <strong>Seelaikari</strong>, we celebrate the essence of
            tradition through meticulously crafted sarees that reflect the
            beauty of Indian heritage. Every piece is designed to honor the
            artistry of skilled weavers, ensuring that elegance meets cultural
            authenticity.
          </p>

          <h2 className="section-heading">Our Story</h2>
          <p>
            Seelaikari was founded with a simple yet profound vision—to
            reintroduce the charm of handwoven sarees to modern women. Inspired
            by generations of weaving expertise, we work closely with artisans
            from various regions to bring you sarees that embody craftsmanship,
            culture, and class.
          </p>

          <h2 className="section-heading">Why Choose Seelaikari?</h2>
          <p>
            In a world of mass production, we stand apart by embracing
            authenticity. Every saree is handcrafted, ensuring exclusivity in
            every weave. Our collections offer something for every occasion,
            whether it’s a grand celebration, a wedding, or an elegant everyday
            drape.
          </p>

          <ul className="about-list">
            <li>🌿 100% authentic, handwoven sarees</li>
            <li>🧵 Supporting traditional artisans and fair trade</li>
            <li>🎨 Unique designs blending classic and contemporary styles</li>
            <li>📦 Worldwide shipping with love and care</li>
          </ul>

          <h2 className="section-heading">Our Craftsmanship</h2>
          <p>
            From the regal <strong>Kanjivaram silks</strong> to the delicate{" "}
            <strong>Chikankari cottons</strong>, each saree is a masterpiece. We
            take pride in sourcing pure fabrics, natural dyes, and traditional
            weaving techniques passed down through generations.
          </p>

          <h2 className="section-heading">Sustainability & Ethical Fashion</h2>
          <p>
            At Seelaikari, we believe in sustainable fashion that honors both
            people and the planet. We partner with handloom clusters, ensuring
            that artisans receive fair wages and that their invaluable craft is
            preserved for the future.
          </p>

          <h2 className="section-heading">Meet Our Founder</h2>
          <p>
            <strong>Akilesh A</strong>, the visionary behind Seelaikari, has
            always been captivated by the grace of sarees. With a deep-rooted
            love for heritage textiles, Akilesh embarked on a journey to create
            a brand that uplifts weavers and makes handloom sarees accessible to
            all.
          </p>
        </div>

        <div className="about-image-container animate__animated animate__fadeInRight">
          <img
            src="https://files.oaiusercontent.com/file-F5eSqDRHn6Xd1mhoqnXvMo?se=2025-02-03T11%3A35%3A19Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db9f43d46-117e-4085-b0cd-c3255dcc3da2.webp&sig=E5f4fVmQDR8toJhSURoehofHMTppV5hz1ciEkM0dNrY%3D"
            alt="Seelaikari Sarees"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
