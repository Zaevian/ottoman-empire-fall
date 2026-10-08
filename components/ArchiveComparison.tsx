import Media from "./Media";
export default function ArchiveComparison() {
  return (
    <div className="archive-comparison">
      <div className="section-kicker">
        <span>READING THE EMPIRE’S EXTENT</span>
      </div>
      <div className="section-heading">
        <h3>
          From an imperial reach
          <br />
          <em>to a provincial core.</em>
        </h3>
        <p>
          Two sourced reconstructions, at different scales. Compare geography
          rather than the apparent size of the printed images.
        </p>
      </div>
      <div className="archive-map-pair">
        <div>
          <span className="archive-map-date">1683</span>
          <Media id="extent" />
        </div>
        <div>
          <span className="archive-map-date">1914</span>
          <Media id="provinces" />
        </div>
      </div>
      <p className="map-note">
        The first map generalizes directly governed and dependent territories;
        the second shows administrative divisions. Neither is a precise
        measurement of continuously controlled land. Historical North African
        and Arabian relationships were especially variable.
      </p>
    </div>
  );
}
