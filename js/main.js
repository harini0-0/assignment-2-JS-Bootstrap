function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  let allListings = [];

  function getAmenities(listing) {
    if (!listing.amenities) return "";

    return listing.amenities
      .slice(0, 5)
      .map(
        (amenity) =>
          `<span class="badge bg-secondary me-1">${amenity}</span>`
      )
      .join("");
  }

  async function loadData() {

  try {

    const res = await fetch("./airbnb_sf_listings_500.json");

    const listings = await res.json();

    allListings = listings.slice(0, 50);

    redraw(allListings);

  } catch (error) {

    console.error("Error loading data:", error);

  }

}

  function getListingCode(listing) {
    return `
      <div class="col-md-6 col-lg-4">
        <div class="card listing-card h-100 shadow-sm">

          <img
            src="${listing.picture_url}"
            class="card-img-top listing-image"
            alt="${listing.name}"
          />

          <div class="card-body d-flex flex-column">

            <h5 class="card-title">${listing.name}</h5>

            <p class="text-success fw-bold">
              $${listing.price} / night
            </p>

            <p class="card-text">
              ${listing.description
                ? listing.description.substring(0, 120)
                : "No description available"}
              ...
            </p>

            <div class="mb-2">
              ${getAmenities(listing)}
            </div>

            <div class="host-section mt-auto">
              <img
                src="${listing.host_picture_url}"
                class="host-image"
                alt="${listing.host_name}"
              />

              <span>${listing.host_name}</span>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    try {
      const res = await fetch("./airbnb_sf_listings_500.json");

      const listings = await res.json();

      allListings = listings.slice(0, 50);

      redraw(allListings);
    } catch (error) {
      console.error("Error loading listings:", error);
    }
  }

  function searchListings(searchTerm) {
    const filteredListings = allListings.filter((listing) =>
      listing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    redraw(filteredListings);
  }

  me.redraw = redraw;
  me.loadData = loadData;
  me.searchListings = searchListings;

  return me;
}

const main = MainModule();

main.loadData();

document
  .querySelector("#searchInput")
  .addEventListener("input", (e) => {
    main.searchListings(e.target.value);
  });