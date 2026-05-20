function MainModule(listingsID = "#listings") {

  const me = {};

  const listingsElement = document.querySelector(listingsID);

  let allListings = [];

  function getListingCode(listing) {

    return `
      <div class="col-md-6 col-lg-4">

        <div class="card h-100 shadow-sm">

          <img
            src="${listing.picture_url || listing.thumbnail_url}"
            class="card-img-top listing-image"
            alt="${listing.name}"
          />

          <div class="card-body d-flex flex-column">

            <h5 class="card-title">
              ${listing.name || "No Name"}
            </h5>

            <p class="text-success fw-bold">
              ${listing.price || "N/A"}
            </p>

            <p class="card-text">
              ${
                listing.description
                  ? listing.description.substring(0, 120)
                  : "No description available"
              }
            </p>

            <div class="mt-auto d-flex align-items-center gap-2">

              <img
                src="${listing.host_picture_url || listing.picture_url}"
                class="host-image"
                alt="Host"
              />

              <span>
                ${listing.host_name || "Unknown Host"}
              </span>

            </div>

          </div>

        </div>

      </div>
    `;
  }

  function redraw(listings) {

    listingsElement.innerHTML =
      listings.map(getListingCode).join("");

  }

  async function loadData() {

    try {

      console.log("Loading data...");

      const response =
        await fetch("./airbnb_sf_listings_500.json");

      const listings =
        await response.json();

      console.log(listings);

      allListings = listings.slice(0, 50);

      redraw(allListings);

    } catch (error) {

      console.error(error);

    }
  }

  function searchListings(searchTerm) {

    const filteredListings = allListings.filter(
      (listing) =>
        listing.name &&
        listing.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    redraw(filteredListings);
  }

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